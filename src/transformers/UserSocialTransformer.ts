import type { ExtractedData, UserSocial } from "../types";
import AbstractTransformer from "./AbstractTransformer";

export default class UserSocialTransformer extends AbstractTransformer<
  ExtractedData,
  UserSocial[]
> {
  private maxConnections: number;

  constructor(key: string, maxConnections: number = 10) {
    super(key);
    this.maxConnections = maxConnections;
  }

  public transform({ users }: ExtractedData): UserSocial[] {
    return users.reduce((acc, user) => {
      const pool = users.filter((u) => user.id != u.id);
      return [
        ...acc,
        {
          id: user.id,
          friends: this.randomListItem(pool),
          enemies: this.randomListItem(pool),
          frenemies: this.randomListItem(pool)
        }
      ];
    }, []);
  }

  private randomListItem(_pool: { id: string }[]) {
    const pool = [..._pool];
    const list = [];
    const max = Math.floor(Math.random() * this.maxConnections);
    let rand = Math.floor(Math.random() * (pool.length - 1));

    while (list.length < max) {
      list.push(pool[rand].id);
      pool.splice(rand, 1);
      rand = Math.floor(Math.random() * (pool.length - 1));
    }

    return JSON.stringify(list);
  }
}
