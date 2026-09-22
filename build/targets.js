// Per-browser build constants, replacing chrome.env / edge.env + dotenv.
// Values are public (webstore update URLs, display names) - not secrets.
const TARGETS = {
  chrome: {
    UPDATE_URL: "https://clients2.google.com/service/update2/crx",
    BROWSER_NAME: "Chrome",
  },
  edge: {
    UPDATE_URL: "https://edge.microsoft.com/extensionwebstorebase/v1/crx",
    BROWSER_NAME: "Edge",
  },
};

/**
 * Resolve the build constants for a given mode (e.g. "chrome", "edge").
 * An existing process.env value always wins over the target's default,
 * so CI or a developer can override a value without editing source.
 *
 * @param {string} mode
 * @returns {{ UPDATE_URL: string, BROWSER_NAME: string }}
 */
function resolveTarget(mode) {
  const target = TARGETS[mode];
  if (!target) {
    const known = Object.keys(TARGETS).join(", ");
    throw new Error(
      `Unknown build mode "${mode}". Expected --env mode to be one of: ${known}.`,
    );
  }

  return Object.fromEntries(
    Object.entries(target).map(([key, defaultValue]) => [
      key,
      process.env[key] ?? defaultValue,
    ]),
  );
}

module.exports = { TARGETS, resolveTarget };
