const AbstractExtractor = require("./AbstractExtractor");

class RandomUserExtractor extends AbstractExtractor {
  constructor() {
    super();

    this.apiBase = "https://random-data-api.com/api/";
    this.endpoint = "users/random_user";
  }

  extractData(params = {}) {
    return super.extractData({ size: 30 });
  }
}

module.exports = RandomUserExtractor;
