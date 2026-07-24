// Optional Node.js backend for Logibot — serves the frontend and exposes /api/chat.
// Run:  node server.js   (then open http://localhost:3000)
const http = require("http");
const fs = require("fs");
const path = require("path");
const { generateReply } = require("./chatbot-engine.js");

const PORT = process.env.PORT || 3000;
const MIME = { ".html": "text/html", ".css": "text/css", ".js": "application/javascript", ".json": "application/json" };

const server = http.createServer((req, res) => {
  // API: POST /api/chat  { message, name }
  if (req.method === "POST" && req.url === "/api/chat") {
    let body = "";
    req.on("data", (c) => (body += c));
    req.on("end", () => {
      try {
        const { message, name } = JSON.parse(body || "{}");
        const result = generateReply(String(message || ""), String(name || ""));
        res.writeHead(200, { "content-type": "application/json" });
        res.end(JSON.stringify(result));
      } catch (e) {
        res.writeHead(400, { "content-type": "application/json" });
        res.end(JSON.stringify({ error: "Bad request" }));
      }
    });
    return;
  }

  // Static files
  let filePath = req.url === "/" ? "/index.html" : req.url;
  filePath = path.join(__dirname, filePath);
  if (!filePath.startsWith(__dirname)) { res.writeHead(403); return res.end(); }

  fs.readFile(filePath, (err, data) => {
    if (err) { res.writeHead(404); return res.end("Not found"); }
    const ext = path.extname(filePath).toLowerCase();
    res.writeHead(200, { "content-type": MIME[ext] || "text/plain" });
    res.end(data);
  });
});

server.listen(PORT, () => console.log(`🤖 Logibot running at http://localhost:${PORT}`));
