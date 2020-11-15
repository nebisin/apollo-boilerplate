const { getUserId } = require("../utils/authToken");

const User = {
  email(parent, args, ctx, info) {
    const userId = getUserId(ctx, false);

    if (parent.id === userId) {
      return parent.email;
    } else {
      return null;
    }
  },
};

module.exports = User;
