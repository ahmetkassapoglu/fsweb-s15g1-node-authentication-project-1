// `checkUsernameFree`, `checkUsernameExists` ve `checkPasswordLength` gereklidir (require)


const bcrypt = require("bcryptjs")
// `auth-middleware.js` deki middleware fonksiyonları. Bunlara burda ihtiyacınız var!
const router = require("express").Router();
const user = require("../users/users-model")
const { usernameBostami, sifreGecerlimi, usernameVarmi } = require("./auth-middleware");
router.post("/register", usernameBostami, sifreGecerlimi, async (req, res, next) => {
  const { username } = req.body
  try {
    await user.ekle({ username: username, password: password })
    res.status(201).json(user)
  } catch (error) {
    next(error)
  }

})


/**
  1 [POST] /api/auth/register { "username": "sue", "password": "1234" }

  response:
  status: 201
  {
    "user_id": 2,
    "username": "sue"
  }

  response username alınmış:
  status: 422
  {
    "message": "Username kullaniliyor"
  }

  response şifre 3 ya da daha az karakterli:
  status: 422
  {
    "message": "Şifre 3 karakterden fazla olmalı"
  }
 */

router.post("login", usernameVarmi, (req, res, next) => {
  const { password } = req.body
  try {
    if (req.user && bcrypt.compareSync(password, req.user.password)) {
      req.session.user = req.user;
      res.status(200).json({ message: `hosgeldin ${req.user.username}` })
    }
    else {
      res.status(404).json({ message: "Geçersiz Kriter!" })
    }
  } catch (error) {
    next(error)
  }
})
/**
  2 [POST] /api/auth/login { "username": "sue", "password": "1234" }

  response:
  status: 200
  {
    "message": "Hoşgeldin sue!"
  }

  response geçersiz kriter:
  status: 401
  {
    "message": "Geçersiz kriter!"
  }
 */


/**
  3 [GET] /api/auth/logout

  response giriş yapmış kullanıcılar için:
  status: 200
  {
    "message": "Çıkış yapildi"
  }

  response giriş yapmamış kullanıcılar için:
  status: 200
  {
    "message": "Oturum bulunamadı!"
  }
 */

router.get("logout", (req, res, next)){
  if (req.session && req.session.user) {
    req.session.destroy(error => {
      if (error) {
        next({ message: "Kullanıcı Bulunamadı!" })
      }
      else {
        res.set("Set-Cookie", "cikolotacips")
        res.json({ message: "Cikis Yapildi" })
      }
    })
  }
}

// Diğer modüllerde kullanılabilmesi için routerı "exports" nesnesine eklemeyi unutmayın.
