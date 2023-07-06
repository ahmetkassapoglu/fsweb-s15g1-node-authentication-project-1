const db = require("../../data/db-config")
/**
  tüm kullanıcıları içeren bir DİZİ ye çözümlenir, tüm kullanıcılar { user_id, username } içerir
 */
function bul() {
return db("users").select("user_id", "username");
}

/**
  verilen filtreye sahip tüm kullanıcıları içeren bir DİZİ ye çözümlenir
 */
function goreBul(filtre) {
return db("users").where(filtre)
}

/**
  verilen user_id li kullanıcıya çözümlenir, kullanıcı { user_id, username } içerir
 */
function idyeGoreBul(user_id) {
return db("users"). select("user_id","username").where({"user_id": user_id})
}

/**
  yeni eklenen kullanıcıya çözümlenir { user_id, username }
 */
  const ekle =  async (user) => {
    const [x] = await db("users").insert(user)
    return idyeGoreBul(x)
  }

// Diğer modüllerde kullanılabilmesi için fonksiyonları "exports" nesnesine eklemeyi unutmayın.

module.exports = {
  ekle,
  idyeGoreBul,
  goreBul,
  bul
}