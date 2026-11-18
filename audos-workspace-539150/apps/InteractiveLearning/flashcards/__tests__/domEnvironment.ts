// Installs a jsdom window as globals for the component tests. jsdom is loaded through a computed
// specifier so this test-only helper never becomes a bundler dependency of the space.

const GLOBALS = [
  'window', 'document', 'navigator', 'HTMLElement', 'HTMLButtonElement', 'Element', 'Node', 'Text',
  'Event', 'KeyboardEvent', 'MouseEvent', 'FocusEvent', 'InputEvent', 'getComputedStyle',
  'requestAnimationFrame', 'cancelAnimationFrame', 'localStorage', 'MutationObserver',
];

export async function installDom(): Promise<void> {
  if (typeof (globalThis as { document?: unknown }).document !== 'undefined') return;
  const specifier = ['js', 'dom'].join('');
  let JSDOM: any;
  try {
    ({ JSDOM } = await import(/* @vite-ignore */ specifier));
  } catch {
    throw new Error('Component tests need jsdom (e.g. `npx -p jsdom@25 -p tsx@4 ...`, see README › Tests).');
  }
  const dom = new JSDOM('<!doctype html><html><body></body></html>', { url: 'http://localhost/', pretendToBeVisual: true });
  const win = dom.window;
  GLOBALS.forEach((key) => {
    const value = key === 'window' ? win : win[key];
    if (value === undefined) return;
    Object.defineProperty(globalThis, key, { value: typeof value === 'function' && /^[a-z]/.test(key) ? value.bind(win) : value, configurable: true, writable: true });
  });
  (globalThis as Record<string, unknown>).IS_REACT_ACT_ENVIRONMENT = false;
}
