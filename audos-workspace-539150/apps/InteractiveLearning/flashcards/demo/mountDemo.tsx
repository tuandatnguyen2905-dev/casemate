// Mounts the demo into any element, for running the feature outside the Casemate shell
// (see README.md › Running the demo).

import React from 'react';
import { createRoot } from 'react-dom/client';
import FlashcardsDemo from '../FlashcardsDemo';

export function mountFlashcardsDemo(element: Element) {
  const root = createRoot(element);
  root.render(<FlashcardsDemo />);
  return () => root.unmount();
}

const target = typeof document !== 'undefined' ? document.getElementById('flashcards-demo-root') : null;
if (target) mountFlashcardsDemo(target);
