const fs = require("fs");
const http = require("http");
const path = require("path");

const port = Number(process.env.PORT || 4173);
const host = process.env.HOST || "127.0.0.1";
const root = path.join(process.cwd(), "out");
const logFile = path.join(process.cwd(), ".next", "static-preview.log");

const mimeTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".txt": "text/plain; charset=utf-8",
  ".woff": "font/woff",
  ".woff2": "font/woff2"
};

function log(message) {
  fs.mkdirSync(path.dirname(logFile), { recursive: true });
  fs.appendFileSync(logFile, `${new Date().toISOString()} ${message}\n`, "utf8");
}

function resolveFile(requestUrl) {
  const urlPath = decodeURIComponent(requestUrl.split("?")[0]);
  const cleanPath = urlPath.endsWith("/") ? `${urlPath}index.html` : urlPath;
  let filePath = path.join(root, cleanPath);

  if (!filePath.startsWith(root)) return null;
  if (!fs.existsSync(filePath) && fs.existsSync(path.join(root, cleanPath, "index.html"))) {
    filePath = path.join(root, cleanPath, "index.html");
  }
  return fs.existsSync(filePath) ? filePath : null;
}

const server = http.createServer((req, res) => {
  const filePath = resolveFile(req.url || "/");
  if (!filePath) {
    res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("Not found");
    return;
  }

  res.writeHead(200, { "Content-Type": mimeTypes[path.extname(filePath)] || "application/octet-stream" });
  fs.createReadStream(filePath).pipe(res);
});

server.listen(port, host, () => {
  log(`Serving ${root} at http://${host}:${port}/`);
});

process.on("uncaughtException", (error) => {
  log(`uncaughtException ${error.stack || error.message}`);
});
