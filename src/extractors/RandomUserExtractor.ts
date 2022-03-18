import type { User } from "../types";
import axios from "axios";
import AbstractExtractor from "./AbstractExtractor";
export default class RandomUserExtractor extends AbstractExtractor<User[]> {
  constructor() {
    super("https://random-data-api.com/api/", "users/random_user");
  }

  public async extract(params: Record<string, unknown> = { size: 30 }) {
    try {
      const { data } = await axios.get<User[]>(this.url, { params });
      return data;
    } catch (err) {
      console.error(err);
    }
  }
}
