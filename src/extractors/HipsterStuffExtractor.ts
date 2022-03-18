const AbstractExtractor = require("./AbstractExtractor");

class HipsterStuffExtractor extends AbstractExtractor {
  constructor() {
    super();

    this.apiBase = "https://random-data-api.com/api/";
    this.endpoint = "hipster/random_hipster_stuff";
  }

  extractData(params = {}) {
    return super.extractData({ size: 30 });
  }
}

module.exports = HipsterStuffExtractor;
