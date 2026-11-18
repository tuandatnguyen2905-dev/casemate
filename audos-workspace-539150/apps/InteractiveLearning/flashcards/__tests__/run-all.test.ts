// Runs every Smart Flashcards suite in sequence. Exit code is non-zero if any test fails.
async function runAll() {
  await (await import('./scheduler.test')).completed;
  await (await import('./persistence.test')).completed;
  await (await import('./decks.test')).completed;
  await (await import('./components.test')).completed;
  await (await import('./sessionFlow.test')).completed;
  await (await import('./interactiveCards.test')).completed;
}

export const completed = runAll();
