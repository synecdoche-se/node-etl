import axios from "axios";
import AbstractExtractor from "./AbstractExtractor";
export default class HipsterStuffExtractor extends AbstractExtractor {
  constructor() {
    super("https://random-data-api.com/api/", "hipster/random_hipster_stuff");
  }

  public async extractData(params: Record<string, unknown> = {}): Promise<any> {
    try {
      const { data } = await axios.get(this.url, { params });
      return data;
    } catch (err) {
      console.error(err);
    }
  }
}
