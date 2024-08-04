const url = require("url");
const queryString = require("querystring");

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
   * @param {callBack} callBack
   */
  initialiseRequest(req, callBack) {
    try {
      const queryObject = url.parse(req.url, true).query;
      this.params = queryObject.address
        ? Array.isArray(queryObject.address)
          ? queryObject.address
          : [queryObject.address]
        : [];
      callBack();
    } catch (error) {
      throw new Error(error);
    }
  }
}
module.exports = Request;
