const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");


const generateAccessToken = (id, roles) => {
  const payload = {
      id,
      roles
  }
  return jwt.sign(payload, process.env.SECRET_KEY, {expiresIn: "24h"} )
}

class userController {
  async registration(req, res) {
    try {
      const {
        region,
        name,
        surname,
        patronomyc,
        phone,
        email,
        login,
        password,
      } = req.body;

      const hashedPassword = bcrypt.hashSync(password, 10);

      const user = new User({
        region,
        name,
        surname,
        patronomyc,
        phone,
        email,
        login,
        password: hashedPassword,
      });
      await user.save()
      res.status(200).json(user);
    } catch (error) {
      console.log(error);
      res.status(400).json({message: 'Login error'})
    }
  }

  async login(req, res) {
    try {
      const {name, password} = req.body
            const user = await User.findOne({name})
            if (!user) {
                return res.status(400).json({message: `Пользователь ${name} не найден`})
            }
            const validPassword = bcrypt.compareSync(password, user.password)
            if (!validPassword) {
                return res.status(400).json({message: `Введен неверный пароль`})
            }
            const token = generateAccessToken(user._id, user.name)
            return res.json({token})
    } catch (error) {
      console.log(error);
      res.status(400).json({message: 'Login error'})
    }
  }

  async check(req, res) {
    try {
      const cookie = req.cookies["jwt"];

      const claims = jwt.verify(cookie, process.env.SECRET_KEY);

      if (!claims) {
        return res.status(401).send({ message: "Неавторизован" });
      }

      const user = await User.findOne({ _id: claims._id });

      const { password, ...data } = await user.toJSON();

      res.send(data);
    } catch (error) {
      return res.status(401).send({ message: "Неавторизован" });
    }
  }

  async getUsers(req, res) {
    try {
        const users = await User.find()
        res.json(users)
    } catch (e) {
        console.log(e)
    }
}

  // async logout(req, res) {
  //   res.cookie("jwt", "", { maxAge: 0 });
  //   res.send({
  //     message: "sucesss",
  //   });
  // }
}

module.exports = new userController();

//cool1233

//Сергей
