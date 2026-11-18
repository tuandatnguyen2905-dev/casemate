const FIT_TRACKING_HOOK = '/api/hooks/execute/workspace-539150/casemate-fit-tracking-v1';
const PDFJS_FALLBACK_MODULE = 'https://cdn.jsdelivr.net/npm/pdfjs-dist@6.3.289/build/pdf.min.mjs';
const PDFJS_FALLBACK_WORKER = 'https://cdn.jsdelivr.net/npm/pdfjs-dist@6.3.289/build/pdf.worker.min.mjs';

export const CV_MAX_BYTES = 10 * 1024 * 1024;
export const CV_FILE_ACCEPT = '.pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document';

export type CvFileKind = 'pdf' | 'docx' | 'doc' | 'image' | 'other';
export type CvFailStage = 'file_check' | 'text_extract' | 'engine_parse' | 'fallback_upload' | 'fallback_parse' | 'cv_save';

export class CvUploadError extends Error {
  stage: CvFailStage;
  code: string;
  status?: number;

  constructor(message: string, stage: CvFailStage, code: string, status?: number) {
    super(message);
    this.name = 'CvUploadError';
    this.stage = stage;
    this.code = code;
    this.status = status;
  }
}

export function cvFileKind(file: File): CvFileKind {
  const name = file.name.toLowerCase();
  const type = (file.type || '').toLowerCase();
  if (type === 'application/pdf' || name.endsWith('.pdf')) return 'pdf';
  if (type.includes('wordprocessingml') || name.endsWith('.docx')) return 'docx';
  if (type === 'application/msword' || name.endsWith('.doc')) return 'doc';
  if (type.startsWith('image/') || /\.(png|jpe?g|heic|heif|webp)$/.test(name)) return 'image';
  return 'other';
}

/** Returns the rejection code for a file the CV reader cannot accept, or '' when it can be read. */
export function cvFileRejection(file: File): string {
  const kind = cvFileKind(file);
  if (kind !== 'pdf' && kind !== 'docx') return kind === 'image' ? 'image_file' : kind === 'doc' ? 'legacy_doc' : 'unsupported_type';
  if (file.size === 0) return 'empty_file';
  if (file.size > CV_MAX_BYTES) return 'file_too_large';
  return '';
}

export function fileSizeBand(bytes: number): string {
  const mb = bytes / (1024 * 1024);
  if (mb < 0.5) return 'under-0.5mb';
  if (mb < 2) return '0.5-2mb';
  if (mb < 5) return '2-5mb';
  if (mb <= 10) return '5-10mb';
  return 'over-10mb';
}

export function cvDeviceContext(): { device: string; os: string; in_app_browser: string | null } {
  const ua = typeof navigator !== 'undefined' ? navigator.userAgent || '' : '';
  const inApp = /FBAN|FBAV|FB_IAB|FBIOS|FB4A/i.test(ua) ? 'facebook'
    : /Messenger/i.test(ua) ? 'messenger'
      : /Zalo/i.test(ua) ? 'zalo'
        : /Instagram/i.test(ua) ? 'instagram'
          : /musical_ly|TikTok|BytedanceWebview/i.test(ua) ? 'tiktok'
            : /\bLine\//i.test(ua) ? 'line'
              : null;
  const os = /iPhone|iPad|iPod/i.test(ua) ? 'ios' : /Android/i.test(ua) ? 'android' : /Windows/i.test(ua) ? 'windows' : /Macintosh|Mac OS X/i.test(ua) ? 'mac' : 'other';
  const device = /iPad|Tablet/i.test(ua) ? 'tablet' : /Mobi|iPhone|Android/i.test(ua) ? 'mobile' : 'desktop';
  return { device, os, in_app_browser: inApp };
}

export function withTimeout<T>(promise: Promise<T>, ms: number, stage: CvFailStage, code = 'timeout'): Promise<T> {
  let timer: ReturnType<typeof setTimeout> | null = null;
  const timeout = new Promise<never>((_, reject) => {
    timer = setTimeout(() => reject(new CvUploadError('The CV reader took too long to respond.', stage, code)), ms);
  });
  return Promise.race([promise, timeout]).finally(() => { if (timer) clearTimeout(timer); });
}

let pdfJsPromise: Promise<any> | null = null;

async function importPdfJsFallback(): Promise<any> {
  const pdfjs = await import(/* @vite-ignore */ PDFJS_FALLBACK_MODULE);
  pdfjs.GlobalWorkerOptions.workerSrc = PDFJS_FALLBACK_WORKER;
  return pdfjs;
}

export function loadPdfJs(): Promise<any> {
  if (!pdfJsPromise) {
    pdfJsPromise = withTimeout(
      import('https://esm.sh/pdfjs-dist@6.3.289/build/pdf.mjs').then((pdfjs) => {
        pdfjs.GlobalWorkerOptions.workerSrc = 'https://esm.sh/pdfjs-dist@6.3.289/build/pdf.worker.min.mjs';
        return pdfjs;
      }),
      15000,
      'text_extract',
      'pdf_reader_load_timeout',
    )
      .catch(() => withTimeout(importPdfJsFallback(), 15000, 'text_extract', 'pdf_reader_load_timeout'))
      .catch((error) => {
        pdfJsPromise = null;
        throw error instanceof CvUploadError ? error : new CvUploadError('The PDF reader could not be loaded.', 'text_extract', 'pdf_reader_unavailable');
      });
  }
  return pdfJsPromise;
}

async function extractPdfText(file: File): Promise<{ text: string; pages: number }> {
  const [{ getDocument }, buffer] = await Promise.all([loadPdfJs(), file.arrayBuffer()]);
  const loadingTask = getDocument({ data: new Uint8Array(buffer) });
  try {
    let pdf: any;
    try {
      pdf = await loadingTask.promise;
    } catch (error: any) {
      if (error?.name === 'PasswordException') throw new CvUploadError('This PDF is password-protected.', 'text_extract', 'password_protected');
      throw new CvUploadError('This PDF could not be opened.', 'text_extract', 'pdf_unreadable');
    }
    const pages: string[] = [];
    for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber += 1) {
      const page = await pdf.getPage(pageNumber);
      const content = await page.getTextContent();
      const line = content.items.map((item: any) => String(item.str || '').replace(/\u0000/g, '')).join(' ').replace(/\s+/g, ' ').trim();
      if (line) pages.push(line);
    }
    return { text: pages.join('\n').normalize('NFC').trim(), pages: pdf.numPages };
  } finally {
    await loadingTask.destroy();
  }
}

async function extractDocxText(file: File): Promise<{ text: string; pages: null }> {
  try {
    const mammoth: any = await withTimeout(import('https://esm.sh/mammoth@1.12.1?bundle'), 20000, 'text_extract', 'docx_reader_load_timeout');
    const extracted = await mammoth.extractRawText({ arrayBuffer: await file.arrayBuffer() });
    return { text: String(extracted.value || '').normalize('NFC').trim(), pages: null };
  } catch (error) {
    if (error instanceof CvUploadError) throw error;
    throw new CvUploadError('This Word file could not be opened.', 'text_extract', 'docx_unreadable');
  }
}

/** Reads the text layer of a PDF or DOCX in the browser. */
export function extractCvFileText(file: File): Promise<{ text: string; pages: number | null }> {
  const kind = cvFileKind(file);
  const task = kind === 'docx' ? extractDocxText(file) : extractPdfText(file);
  return withTimeout(task, 30000, 'text_extract', 'text_extract_timeout');
}

export function toCvUploadError(error: unknown, stage: CvFailStage, fallbackCode?: string): CvUploadError {
  if (error instanceof CvUploadError) return error;
  const message = String((error as { message?: unknown } | null)?.message || 'The CV could not be read.');
  const code = cvErrorCode(error);
  return new CvUploadError(message, stage, code === 'unknown_error' && fallbackCode ? fallbackCode : code, cvErrorStatus(error) ?? undefined);
}

export function cvErrorCode(error: unknown): string {
  const value = error as { code?: unknown; name?: unknown; message?: unknown } | null;
  if (value && typeof value.code === 'string' && value.code) return value.code;
  if (value && value.name === 'AbortError') return 'timeout';
  const message = String(value?.message || '');
  if (/failed to fetch|networkerror|load failed|network request failed/i.test(message)) return 'network_error';
  return 'unknown_error';
}

export function cvErrorStatus(error: unknown): number | null {
  const status = Number((error as { status?: unknown } | null)?.status);
  return Number.isFinite(status) && status > 0 ? status : null;
}

export function cvErrorStage(error: unknown, fallback: CvFailStage): CvFailStage {
  return error instanceof CvUploadError ? error.stage : fallback;
}

export function cvFailureMessage(code: string): string {
  switch (code) {
    case 'unsupported_type':
      return 'This file type is not supported. Please upload your CV as a PDF or Word (.docx) file.';
    case 'image_file':
      return 'Photos and screenshots of a CV cannot be read. Please upload the original PDF or Word (.docx) file, or fill in your details manually.';
    case 'legacy_doc':
      return 'Old Word files (.doc) are not supported. Save your CV as .docx or PDF and upload it again.';
    case 'empty_file':
      return 'This file is empty. Please choose your CV file again.';
    case 'file_too_large':
      return 'This file is over 10 MB. Please export a smaller PDF (for example, with compressed images) and try again.';
    case 'text_too_short':
      return 'We could not find any text in this file. It looks like a scanned or image-only CV. Export it again as a text PDF (from Word, Google Docs or Canva "PDF Standard"), or fill in your details manually.';
    case 'password_protected':
      return 'This PDF is password-protected. Remove the password and upload it again.';
    case 'pdf_unreadable':
    case 'docx_unreadable':
      return 'This file could not be opened. It may be damaged. Export your CV again and upload the new file, or fill in your details manually.';
    case 'ai_unavailable':
      return "Mate's CV reader is temporarily unavailable. Please fill in your details manually (about 3 minutes) or try again later.";
    case 'ai_truncated':
      return 'Your CV is too long for Mate to read in one go. Try a 1–2 page version, or fill in your details manually.';
    case 'timeout':
    case 'text_extract_timeout':
    case 'pdf_reader_load_timeout':
    case 'docx_reader_load_timeout':
    case 'network_error':
      return 'Reading your CV took too long. Check your connection and try again. On a phone, open Casemate in Chrome or Safari rather than inside Facebook or Zalo.';
    default:
      return 'We could not read this CV accurately. Please try again, upload another file (PDF or Word), or fill in your details manually.';
  }
}

function createEventId(): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') return crypto.randomUUID();
  return `cv-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 12)}`;
}

/** Best-effort write to feature_events through the server-validated Fit tracking function. Never throws. */
export async function postFitCvEvent(sessionId: string | null | undefined, eventName: string, properties: Record<string, string | number | boolean | null | undefined>, eventRole: 'step' | 'diagnostic' = 'diagnostic'): Promise<void> {
  if (!sessionId) return;
  const clean: Record<string, string | number | boolean | null> = {};
  Object.keys(properties).forEach((key) => {
    const value = properties[key];
    if (value === undefined) return;
    clean[key] = typeof value === 'string' ? value.slice(0, 160) : value;
  });
  try {
    await fetch(FIT_TRACKING_HOOK, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json', 'X-Session-Id': sessionId },
      body: JSON.stringify({
        event: {
          event_key: createEventId(),
          event_name: eventName,
          event_role: eventRole,
          completion_key: null,
          occurred_at: new Date().toISOString(),
          properties_json: clean,
        },
      }),
    });
  } catch (error) {
    console.warn('[CV upload] tracking write failed:', eventName, error);
  }
}
