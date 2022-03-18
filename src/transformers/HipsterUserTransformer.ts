const AbstractTransformer = require("./AbstractTransformer");

/**
 * Hipsterfy the user data.
 */
class HipsterUserTransformer extends AbstractTransformer {
  constructor() {
    super();
    this.key = "hipsterUser";
  }

  /**
   * @param {{}} data
   * @returns {[{}]}
   */
  transformData(data) {
    const { hipsters, users } = data;
    const hipsterUsers = [];
    let aka = "";

    for (let i = 0; i < users.length; i++) {
      if (!hipsters[i] || !users[i]) {
        continue;
      }
      aka = this.parseAka(hipsters[i].words);
      hipsterUsers.push({
        id: users[i].id,
        firstName: `${users[i].first_name} a.k.a ${aka}`,
        lastName: users[i].last_name,
        email: users[i].email,
        slogan: hipsters[i].sentence
      });
    }

    return hipsterUsers;
  }

  /**
   * @param {[string]} words
   * @returns {string}
   */
  parseAka(words) {
    return words
      .slice(0, 2)
      .join(" ")
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }
}

module.exports = HipsterUserTransformer;
