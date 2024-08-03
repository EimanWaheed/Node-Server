const http = require("http");
const request = require("./request");
const response = require("./response");

/**
 * Creates local HTTP server which is responsible for handling incoming request which is a single entry point.
 * The server is listening on the port number specified. As the request is received, it is directed to be set
 * by the request initialiser method.
 * @param {string} req
 * @param {string} res
 */
const serverConnection = http.createServer(function (req, res) {
  const requestInstance = request.getInstance();
  const responseInstance = response.getInstance();
  try {
    requestInstance.initialiseRequest(req, () => {
      const params = requestInstance.getParams();
      const htmlResponse = responseInstance.generateResponse(params);
      res.writeHead(responseInstance.getStatusCode(), {
        "Content-Type": "text/html",
      });
      res.end(htmlResponse);
    });
  } catch (error) {
    res.writeHead(500, { "Content-Type": "text/html" });
    res.end("<html><body><h1>Internal Server Error</h1></body></html>");
  }
});
serverConnection.listen(3000);
