import axios from "axios";

export default class AbstractExtractor {
  apiBase = "";

  endpoint = "";

  /**
   * @param {} params Optional GET params to send to the extract source.
   */
  extractData(params = {}) {
    return axios.get(this.apiBase + this.endpoint, {
      params
    });
  }
}

module.exports = AbstractExtractor;
