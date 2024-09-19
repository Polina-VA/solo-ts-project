const { User } = require("../db/models");
const bcrypt = require("bcrypt");

class UserService {
  static getAllUsers = async () =>
    (await User.findAll()).map((user) => User.get());

  static getUserByEmail = async (email) => {
    const user = await User.findOne({ where: { email } });
    return user ? user.get() : null;
  };

  static createUser = async ({ name, email, password}) => {
    let user;
    // проверяем, есть ли такая вселенная в нашей базе
    user = await User.findOne({ where: { email } });
    // условие, благодаря которому мы можем грамотно инофрмировать ползователя
    if (!user) {
      user = await User.create({
        name,
        email,
        password: await bcrypt.hash(password, 10)
      });
      return user.get();
    }
    return "Пользователь с таким email уже существует";
  };

}

module.exports = UserService;