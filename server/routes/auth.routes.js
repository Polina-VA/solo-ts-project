const authRouter = require("express").Router();

const bcrypt = require("bcrypt");
const jwtConfig = require("../config/jwtConfig");
const UserService = require("../services/User.servises");
const generateTokens = require("../utils/generateTokens");

authRouter.post("/registration", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    // проверка на пустые поля

    if (name.trim() === "" || email.trim() === "" || password.trim() === "") {
      return res.status(400).json({ message: "Заполните все поля" });
    }

    const userInDB = await UserService.getUserByEmail(email);

    // проверяем наличе в бд по email
    if (userInDB) {
      return res
        .status(400)
        .json({ message: "Пользоваетль с таким email уже существует" });
    } else {
      const user = await UserService.createUser({ name, email, password });
      if (user) {
        delete user.password;
        res.locals.user = user;

        //console.log(user, "user without password");
        const { accessToken, refreshToken } = generateTokens({ user });

        res
          .status(201)
          .cookie(jwtConfig.refresh.type, refreshToken, {
            httpOnly: true,
            maxAge: jwtConfig.refresh.expiresIn,
          })
          .json({ message: "success", accessToken, user });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

authRouter.post("/authorization", async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(req.body);
    
    // проверка на пустые поля
    if (email.trim() === "" || password.trim() === "") {
      return res.status(400).json({ message: "Заполните все поля" });
    }

    const user = await UserService.getUserByEmail(email);

    if (user) {
      //                                   пароль    хэш пароль из бд
      const compare = await bcrypt.compare(password, user.password);
      if (compare) {
        delete user.password;
        res.locals.user = user;
        //console.log(user, 'user without password');

        const { accessToken, refreshToken } = generateTokens({ user });

        return res
          .status(200)
          .cookie(jwtConfig.refresh.type, refreshToken, {
            httpOnly: true,
            maxAge: jwtConfig.refresh.expiresIn,
          })
          .json({ message: "success", user, accessToken });
      }
    }
    res.status(400).json({ message: "email или пароль неверные" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

authRouter.delete("/logout", (req, res) => {
  res.locals.user = undefined;
  res
    .clearCookie(jwtConfig.refresh.type)
    .json({ message: "success", accessToken: "" });
});

module.exports = authRouter;