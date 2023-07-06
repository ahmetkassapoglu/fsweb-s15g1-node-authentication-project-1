const { sinirli } = require("../auth/auth-middleware");
const { bul } = require("./users-model");

// `sinirli` middleware'ını `auth-middleware.js` dan require edin. Buna ihtiyacınız olacak!
const router = require("express").Router();

/**
  [GET] /api/users

  Bu uç nokta SINIRLIDIR: sadece kullanıcı girişi yapmış kullanıcılar
  ulaşabilir.

  response:
  status: 200
  [
    {
      "user_id": 1,
      "username": "bob"
    },
    // etc
  ]

  response giriş yapılamadıysa:
  status: 401
  {
    "message": "Geçemezsiniz!"
  }
 */


// Diğer modüllerde kullanılabilmesi için routerı "exports" nesnesine eklemeyi unutmayın.

router.get("/",sinirli,async (req,res,next)=>{
  try {
    const users = await bul()
    res.json(users)
  } catch (error) {
    next(error)
  }
})

module.exports= {
  router
}