import type { Hipster } from "../types";
import axios from "axios";
import AbstractExtractor from "./AbstractExtractor";
export default class HipsterStuffExtractor extends AbstractExtractor<
  Hipster[]
> {
  constructor() {
    super("https://random-data-api.com/api/", "hipster/random_hipster_stuff");
  }

  public async extract(params: Record<string, unknown> = {}) {
    try {
      const { data } = await axios.get<Hipster[]>(this.url, { params });
      return data;
    } catch (err) {
      console.error(err);
    }
  }
}
