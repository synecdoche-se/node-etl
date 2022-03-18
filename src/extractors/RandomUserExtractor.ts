import AbstractExtractor from "./AbstractExtractor";
export default class RandomUserExtractor extends AbstractExtractor {
  constructor() {
    super();

    this.apiBase = "https://random-data-api.com/api/";
    this.endpoint = "users/random_user";
  }

  extractData(params = {}) {
    return super.extractData({ size: 30 });
  }
}
