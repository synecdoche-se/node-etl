import axios from "axios";
import AbstractExtractor from "./AbstractExtractor";
export default class RandomUserExtractor extends AbstractExtractor {
  constructor() {
    super("https://random-data-api.com/api/", "users/random_user");
  }

  public async extractData(
    params: Record<string, unknown> = { size: 30 }
  ): Promise<any> {
    try {
      const { data } = await axios.get<any>(this.url, { params });
      return data;
    } catch (err) {
      console.error(err);
    }
  }
}
