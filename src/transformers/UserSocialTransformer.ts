const AbstractTransformer = require("./AbstractTransformer");

class UserSocialTransformer extends AbstractTransformer {
  constructor() {
    super();
    this.key = "userSocial";
    this.maxConnections = 10;
  }

  /**
   * Simulate social network connections between users.
   * @param {{}} data
   */
  transformData(data) {
    const { users } = data;
    const socialUsers = [];

    users.forEach((user) => {
      const pool = users.filter((_user) => user.id != _user.id);

      socialUsers.push({
        id: user.id,
        friends: this.randomListItem(pool),
        enemies: this.randomListItem(pool),
        frenemies: this.randomListItem(pool)
      });
    });

    return socialUsers;
  }

  /**
   * @param {*[]} pool
   * @returns {*[]}
   */
  randomListItem(pool) {
    const cxList = [];
    const _pool = [...pool];
    const randMaxLength = Math.floor(Math.random() * this.maxConnections);
    let rand = Math.floor(Math.random() * (_pool.length - 1));

    while (cxList.length < randMaxLength) {
      cxList.push(_pool[rand].id);
      _pool.splice(rand, 1);
      rand = Math.floor(Math.random() * (_pool.length - 1));
    }

    return JSON.stringify(cxList);
  }
}

module.exports = UserSocialTransformer;
