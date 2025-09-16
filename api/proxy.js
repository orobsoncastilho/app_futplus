export default async function handler(req, res) {
  const targetUrl = "https://apk.futemais.net/app2/";

  try {
    const response = await fetch(targetUrl, {
      headers: {
        "User-Agent": req.headers["user-agent"] || "Mozilla/5.0"
      }
    });

    let body = await response.text();

    // Bloqueia popups
    body = body.replace(/window\.open/gi, "// window.open bloqueado");

    // Cabeçalhos para permitir iframe
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.setHeader("Cache-Control", "no-store");
    res.setHeader("X-Frame-Options", "ALLOWALL");
    res.setHeader("Content-Security-Policy", "frame-ancestors *");

    res.send(body);
  } catch (err) {
    res.status(500).send("Erro ao carregar site: " + err.message);
  }
}
