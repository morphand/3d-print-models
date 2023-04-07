/**
 * Sends requests to the specified endpoint.
 */
class RequestSender {
  /**
   * @param {String} baseURL The base URL to send the requests to. Defaults to http://localhost:5000/api.
   * @param {String} token JSON web token to use with the requests.
   */
  constructor(
    baseURL = "http://localhost:5000/api",
    token = localStorage.getItem("auth")
  ) {
    this.baseURL = baseURL;
    this.token = token;
    this.headers = { Authentication: `Bearer: ${this.token}` };
  }

  /**
   * Sends a GET request to the provided endpoint.
   * @param {String} endpoint The endpoint to send the request to.
   * @param {{returnRawResponse: false}} options
   * @returns {Response|object} Converts the response to object using the json() function and returns it if options.returnRawResponse is false. If options.returnRawResponse is true, returns the response from the fetch function.
   */
  async get(
    endpoint,
    options = { returnRawResponse: false },
    headers = this.headers
  ) {
    const requestParams = this.token
      ? { method: "GET", headers }
      : { method: "GET" };
    try {
      const res = await fetch(`${this.baseURL}${endpoint}`, requestParams);
      return options.returnRawResponse ? res : await res.json();
    } catch (e) {
      throw e;
    }
  }

  /**
   * Sends a POST request to the provided endpoint.
   * @param {String} endpoint The endpoint to send the request to.
   * @param {{data: null, returnRawResult: false}} options Options related to the request. options.data sets the value to send in the request body. options.returnRawResponse returns the response without calling .json() on the result.
   * @returns {Response|object} Converts the response to object using the json() function and returns it if options.returnRawResponse is false. If options.returnRawResponse is true, returns the response from the fetch function.
   */
  async post(
    endpoint,
    options = { data: null, returnRawResponse: false },
    headers = this.headers
  ) {
    const requestParams = this.token
      ? { method: "POST", headers }
      : { method: "POST" };
    if (options.data) {
      requestParams.body = options.data;
    }
    try {
      const res = await fetch(`${this.baseURL}${endpoint}`, requestParams);
      return options.returnRawResponse ? res : await res.json();
    } catch (e) {
      throw e;
    }
  }

  /**
   * Sends a PUT request to the provided endpoint.
   * @param {String} endpoint The endpoint to send the request to.
   * @param {{data: null, returnRawResult: false}} options Options related to the request. options.data sets the value to send in the request body. options.returnRawResponse returns the response without calling .json() on the result.
   * @returns {Response|object} Converts the response to object using the json() function and returns it if options.returnRawResponse is false. If options.returnRawResponse is true, returns the response from the fetch function.
   */
  async put(
    endpoint,
    options = { data: null, returnRawResponse: false },
    headers = this.headers
  ) {
    const requestParams = this.token
      ? { method: "PUT", headers }
      : { method: "PUT" };
    if (options.data) {
      requestParams.body = options.data;
    }
    try {
      const res = await fetch(`${this.baseURL}${endpoint}`, requestParams);
      return options.returnRawResponse ? res : await res.json();
    } catch (e) {
      throw e;
    }
  }

  /**
   * Sends a DELETE request to the provided endpoint.
   * @param {String} endpoint The endpoint to send the request to.
   * @param {{data: null, returnRawResult: false}} options Options related to the request. options.data sets the value to send in the request body. options.returnRawResponse returns the response without calling .json() on the result.
   * @returns {Response|object} Converts the response to object using the json() function and returns it if options.returnRawResponse is false. If options.returnRawResponse is true, returns the response from the fetch function.
   */
  async delete(
    endpoint,
    options = { data: null, returnRawResponse: false },
    headers = this.headers
  ) {
    const requestParams = this.token
      ? { method: "DELETE", headers }
      : { method: "DELETE" };
    if (options.data) {
      requestParams.body = options.data;
    }
    try {
      const res = await fetch(`${this.baseURL}${endpoint}`, requestParams);
      return options.returnRawResponse ? res : await res.json();
    } catch (e) {
      throw e;
    }
  }
}

export default RequestSender;
