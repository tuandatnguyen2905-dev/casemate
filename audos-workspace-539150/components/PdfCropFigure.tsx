import { useEffect, useRef, useState } from 'react';

// Draws one cropped region of a PDF page onto a canvas with pdf.js. Used for
// the charts, tables and abstract figures of the Aptitude Test Simulation.

export interface PdfCropSource {
  url: string;
  page: number;
  /** Crop box in PDF points: [x0, y0, x1, y1], measured from the top-left of the page. */
  box: [number, number, number, number];
}

const PDFJS_VERSION = '4.0.379';
const PDFJS_BASE = `https://cdn.jsdelivr.net/npm/pdfjs-dist@${PDFJS_VERSION}/build/`;
let pdfJsPromise: Promise<any> | null = null;
const documentCache = new Map<string, Promise<any>>();

function loadPdfJs(): Promise<any> {
  if (!pdfJsPromise) {
    const libraryUrl = `${PDFJS_BASE}pdf.min.mjs`;
    pdfJsPromise = import(/* @vite-ignore */ libraryUrl).then((library: any) => {
      library.GlobalWorkerOptions.workerSrc = `${PDFJS_BASE}pdf.worker.min.mjs`;
      return library;
    });
    pdfJsPromise.catch(() => {
      pdfJsPromise = null;
    });
  }
  return pdfJsPromise;
}

function loadDocument(url: string): Promise<any> {
  let pending = documentCache.get(url);
  if (!pending) {
    pending = loadPdfJs().then((library) => library.getDocument({ url }).promise);
    documentCache.set(url, pending);
    pending.catch(() => {
      documentCache.delete(url);
    });
  }
  return pending;
}

export default function PdfCropFigure({ source, maxWidth = 640, alt }: { source: PdfCropSource; maxWidth?: number; alt?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading');
  const [x0, y0, x1, y1] = source.box;

  useEffect(() => {
    let cancelled = false;
    setStatus('loading');
    (async () => {
      const pdf = await loadDocument(source.url);
      const page = await pdf.getPage(source.page);
      const canvas = canvasRef.current;
      if (cancelled || !canvas) return;
      const ratio = typeof window !== 'undefined' ? Math.max(1, Math.min(2, window.devicePixelRatio || 1)) : 1;
      const scale = (maxWidth / (x1 - x0)) * ratio * 1.25;
      canvas.width = Math.round((x1 - x0) * scale);
      canvas.height = Math.round((y1 - y0) * scale);
      await page.render({
        canvasContext: canvas.getContext('2d'),
        viewport: page.getViewport({ scale }),
        transform: [1, 0, 0, 1, -x0 * scale, -y0 * scale],
      }).promise;
      if (!cancelled) setStatus('ready');
    })().catch(() => {
      if (!cancelled) setStatus('error');
    });
    return () => {
      cancelled = true;
    };
  }, [source.url, source.page, x0, y0, x1, y1, maxWidth]);

  return (
    <div
      className="relative mx-auto w-full overflow-hidden rounded-xl border border-[var(--space-border-default)] bg-white"
      style={{ maxWidth }}
    >
      <canvas
        ref={canvasRef}
        role="img"
        aria-label={alt || `Exhibit from the original test file, page ${source.page}`}
        className={status === 'ready' ? 'block h-auto w-full' : 'block w-full opacity-0'}
        style={{ aspectRatio: `${x1 - x0} / ${y1 - y0}` }}
      />
      {status !== 'ready' ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-4 text-center text-xs text-[var(--space-text-secondary)]">
          {status === 'loading' ? (
            <span>Loading the exhibit…</span>
          ) : (
            <>
              <span>The exhibit could not be loaded. Check your connection and try again.</span>
              <a
                className="font-semibold text-[var(--space-text-brand)] underline"
                href={`${source.url}#page=${source.page}`}
                target="_blank"
                rel="noreferrer"
              >
                Open this page of the original file
              </a>
            </>
          )}
        </div>
      ) : null}
    </div>
  );
}
