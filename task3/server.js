require("dotenv").config();
const http = require("http");
const request = require("./request");
const response = require("./response");

const port = process.env.PORT || 3000;

const serverConnection = http.createServer(function (req, res) {
  const requestInstance = request.getInstance();
  const responseInstance = response.getInstance();
  requestInstance
    .initialiseRequest(req)
    .then(() => {
      const params = requestInstance.getParams();
      responseInstance
        .generateResponse(params)
        .then((htmlResponse) => {
          res.writeHead(responseInstance.getStatusCode(), {
            "Content-Type": "text/html",
          });
          res.end(htmlResponse);
        })
        .catch((error) => {
          res.writeHead(500, { "Content-Type": "text/html" });
          res.end("<html><body><h1>Internal Server Error</h1></body></html>");
        });
    })
    .catch((error) => {
      res.writeHead(500, { "Content-Type": "text/html" });
      res.end("<html><body><h1>Internal Server Error</h1></body></html>");
    });
});
serverConnection.listen(port);
