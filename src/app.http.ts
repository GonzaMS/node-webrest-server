import http from "http";

const server = http.createServer((req, res) => {
  console.log(req.url);

  res.write("{Jhon Doe}");
  res.end();
});

server.listen(3000, () => {
  console.log("Server running on port 3000");
});
