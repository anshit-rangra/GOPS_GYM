export const extractQrSecret = (decodedText) => {
  if (typeof decodedText !== "string") return null;
  const text = decodedText.trim();
  if (!text) return null;

  // URL payload: https://gym.example/check-in?secret=XXXX
  try {
    const url = new URL(text);
    const secret = url.searchParams.get("secret");
    if (secret) return secret.trim();
  } catch {
    /* not a URL */
  }

  // JSON payload: {"type":"gops-checkin","secret":"XXXX"}
  if (text.startsWith("{")) {
    try {
      const parsed = JSON.parse(text);
      const secret = parsed?.secret ?? parsed?.token;
      if (typeof secret === "string" && secret.trim()) return secret.trim();
    } catch {
      /* not JSON */
    }
  }

  // key=value payload embedded in arbitrary text
  const paramMatch = text.match(/(?:^|[?&;,\s])secret=([^&\s;]+)/i);
  if (paramMatch) return decodeURIComponent(paramMatch[1]).trim();

  // Raw token fallback: the whole scanned payload is the secret.
  return text;
};
