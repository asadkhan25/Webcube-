// Simple HTTP Server
import http from 'http';

const server = http.createServer((req, res) => {
    res.writeHead(200, {"Content-Type": "text/plain"});
    res.write("Hello Asad \n");
    res.end("i am using ES modules");
});

server.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});