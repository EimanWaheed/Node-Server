const validator = require("validator");
const async = require("async");
/**
 * Class responsible for generating HTML responses.
 */
class Response {
  static getInstance() {
    if (!Response.instance) {
      Response.instance = new Response();
    }
    return Response.instance;
  }

  /**
   * Sets the status code for writing data.
   * @param {number} statusCode
   */
  setStatusCode(statusCode) {
    this.statusCode = statusCode;
  }

  /**
   * Gets the status code.
   * @returns {number} The status code.
   */
  getStatusCode() {
    return this.statusCode;
  }

  /**
   * Returns the URL title
   * @param {string} url
   * @returns
   */
  fetchTitleName = (url) => {
    return url;
  };

  /**
   * Checks if the URL is validated or not.
   * @param {string} url
   * @returns
   */
  isValidAddress = (url) => {
    if (
      validator.isURL(url, {
        require_protocol: false,
        require_host: false,
        require_port: false,
        validate_length: false,
      })
    ) {
      this.setStatusCode(200);
      return true;
    } else {
      this.setStatusCode(404);
      return false;
    }
  };

  /**
   * Responsible for generating HTML response
   * @param {Array} address
   * @returns
   */
  generateResponse = (address) => {
    const titleNames = [];
    if (!address.length) {
      this.setStatusCode(404);
      return `<html><body><h1>No addresses provided</h1></body></html>`;
    }
    async.map(
      address,
      (url) => {
        titleNames.push(
          `<li>${url} - "${
            this.isValidAddress(url)
              ? `${this.fetchTitleName(url)}`
              : "NO RESPONSE"
          }"</li>`
        );
      },
      (err) => {
        if (err) {
          this.setStatusCode(500);
          throw new Error(err);
        }
      }
    );
    const htmlResponse = `
          <html>
          <head></head>
          <body>
          <h1> Following are the titles of given websites: </h1>
          <ul>
            ${titleNames.join("\n")}
          </ul>
          </body>
          </html>
        `;
    this.setStatusCode(200);
    return htmlResponse;
  };
}
module.exports = Response;
