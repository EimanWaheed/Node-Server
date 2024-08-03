const url = require("url");
const RSVP = require("rsvp");

/**
 * Class responsible for setting the request.
 */

class Request {
  /**
   * Get the singleton instance of the Request class.
   * @returns {Object} The Request instance.
   */
  static getInstance() {
    if (!Request.instance) {
      Request.instance = new Request();
    }
    return Request.instance;
  }

  /**
   * Get the params array.
   * @returns {Object} The params object.
   */
  getParams() {
    return this.params;
  }

  /**
   * Initialises and sets the request. It receives the request as an argument, parses the URL
   * and assing the parameters to the class properties and executes the callback function.
   * @param {string} req
   */
  initialiseRequest(req) {
    return new RSVP.Promise((resolve, reject) => {
      try {
        const queryObject = url.parse(req.url, true).query;
        this.params = queryObject.address
          ? Array.isArray(queryObject.address)
            ? queryObject.address
            : [queryObject.address]
          : [];
        resolve();
      } catch (error) {
        throw new Error(error);
      }
    });
  }
}
module.exports = Request;
