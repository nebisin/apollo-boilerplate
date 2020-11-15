const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

const { getUserId, generateToken } = require("../utils/authToken");
const { setTokenCookie, removeTokenCookie } = require("../utils/authCookie");

const User = mongoose.model("User");

const Mutation = {
  createUser: async (parent, args, ctx, info) => {
    const { data } = args;

    if (data.password.length < 8) {
      throw new Error("Şifreniz en az 8 karakterden oluşmalı.");
    } else if (!validator.isEmail(data.email)) {
      throw new Error("Geçersiz bir e-posta adresi girdiniz!");
    } else if (data.name.length < 3) {
      throw new Error("Kullanıcı adınız en az üç karakter içermeli!");
    }

    const isExist = await User.findOne({
      $or: [{ name: data.name }, { email: data.email }],
    });

    if (isExist) {
      throw new Error("Seçtiğiniz kullanıcı adı veya e-posta kullanılıyor.");
    }

    const user = new User({ ...data });

    await user.save();

    const token = generateToken(user.id);

    setTokenCookie(ctx.res, token);

    return {
      user,
      token,
    };
  },
  login: async (parent, args, ctx, info) => {
    const { email, password } = args;

    const user = await User.findOne({ email });

    if (!user) {
      throw new Error("Girdiğiniz e-posta adresi veya şifre hatalı.");
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new Error("Girdiğiniz e-posta adresi veya şifre hatalı.");
    }

    const token = generateToken(user.id);

    setTokenCookie(ctx.res, token);

    return {
      user,
      token,
    };
  },
  logout: async (parent, args, ctx, info) => {
    const userId = getUserId(ctx);

    removeTokenCookie(ctx.res);

    const user = User.findById(userId);

    return user;
  },
  deleteUser: async (parent, args, ctx, info) => {
    const userId = getUserId(ctx);

    const userIndex = await User.findByIdAndDelete(userId);

    if (!userIndex) {
      throw new Error("Böyle bir kullanıcı bulunmuyor.");
    }

    return userIndex;
  },
  updateUser: async (parent, args, ctx, info) => {
    const userId = getUserId(ctx);

    const { data } = args;
    const user = await User.findById(userId);

    if (!user) {
      throw new Error("Böyle bir kullanıcı bulunmuyor.");
    }

    if (typeof data.email === "string") {
      if (!validator.isEmail(data.email)) {
        throw new Error("Geçersiz bir e-posta adresi girdiniz!");
      }

      const emailTaken = await User.findOne({ email: data.email });

      if (emailTaken) {
        throw new Error("Bu e-posta adresi kullanılıyor.");
      }

      user.email = data.email;
    }

    if (typeof data.name === "string") {
      if (data.name.length < 3) {
        throw new Error("Kullanıcı adınız en az üç karakter içermeli!");
      }
      user.name = data.name;
    }

    if (typeof data.password === "string") {
      if (data.password.length < 8) {
        throw new Error("Şifreniz en az 8 karakterden oluşmalı.");
      }
      user.password = data.password;
    }

    await user.save();

    return user;
  },
};

module.exports = Mutation;
