/**
 * Runs a task and contains any failure, so one broken feature never takes the
 * rest of the page down with it. Resolves to true on success, false on failure.
 */
export async function safeRun(name, task) {
  try {
    await task();
    return true;
  } catch (error) {
    console.error(`[portfolio] "${name}" failed:`, error);
    return false;
  }
}
