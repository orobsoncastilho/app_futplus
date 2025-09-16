// api/proxy.js
import fetch from "node-fetch";

export default async function handler(req, res) {
  const targetUrl = "https://apk.futemais.net/app2/";

  try {
    const response = await fetch(targetUrl, {
      headers: {
        "User-Agent": req.headers["user-agent"] || "Mozilla/5.0"
      }
    });

    let body = await response.text();

    // Remove scripts que tentam abrir popups
    body = body.replace(/window\.open/gi, "// blocked window.open");

    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.setHeader("Cache-Control", "no-store");
    res.send(body);
  } catch (err) {
    res.status(500).send("Erro ao carregar site: " + err.message);
  }
}
