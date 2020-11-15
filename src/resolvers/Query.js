const mongoose = require("mongoose");
const User = mongoose.model("User");
const { getUserId } = require("../utils/authToken");

const Query = {
  users: async (parent, args, ctx, info) => {
    if (!args.query) {
      return await User.find()
        .sort(args.sort)
        .limit(args.limit)
        .skip(args.skip);
    }

    const query1 = new RegExp(args.query.toLocaleUpperCase("tr-TR"), "ig");

    const query2 = new RegExp(args.query.toLocaleLowerCase("tr-TR"), "ig");

    return await User.find({
      $or: [{ name: query1 }, { name: query2 }],
    })
      .sort(args.sort)
      .limit(args.limit)
      .skip(args.skip);
  },
  me: async (parent, args, ctx, info) => {
    const userId = getUserId(ctx);

    const user = await User.findById(userId);

    if (!user) {
      throw new Error("Böyle bir kullanıcı bulunamadı.");
    }
    return user;
  },
};

module.exports = Query;
