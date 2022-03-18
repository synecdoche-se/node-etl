import type { ExtractedData, HipstersAndUsers, HipsterUser } from "../types";
import AbstractTransformer from "./AbstractTransformer";

export default class HipsterUserTransformer extends AbstractTransformer<
  HipstersAndUsers,
  HipsterUser[]
> {
  constructor(key: string) {
    super(key);
  }

  public transform({ hipsters, users }: ExtractedData): HipsterUser[] {
    return users.reduce((acc, user, i) => {
      if (!hipsters[i]) return acc;

      const aka = this.parseAka(hipsters[i].words);
      return [
        ...acc,
        {
          id: user.id,
          firstName: `${user.first_name} a.k.a ${aka}`,
          lastName: user.last_name,
          email: user.email,
          slogan: hipsters[i].sentence
        }
      ];
    }, []);
  }

  private parseAka(words: string[]): string {
    return words
      .slice(0, 2)
      .join(" ")
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }
}
