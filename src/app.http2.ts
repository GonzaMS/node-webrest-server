import fs from "fs";
import http2 from "http2";

const server = http2.createSecureServer(
  {
    key: fs.readFileSync("./keys/server.key"),
    cert: fs.readFileSync("./keys/server.crt"),
  },
  (req, res) => {
    console.log(req.url);
  }
);

server.listen(3000, () => {
  console.log("Server running on port 3000");
});
