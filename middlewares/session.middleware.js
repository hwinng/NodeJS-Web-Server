var shortid = require("shortid");

var db = require("../db");

module.exports = (req, res, next) => {
  if (!req.signedCookies.sessionId) {
    var sessionId = shortid.generate();
    res.cookie("sessionId", sessionId, {
      signed: true
    });
    db.get("sessions")
      .push({ id: sessionId })
      .write();
  } else {
    //mình thấy r
    // ei log ra kết quả có vẻ mlem được rồi
    // để mình //giải thích đống lùm xum này cho ~~
    //mlem mlem đỉnh quá. Mình nghe đây <3
    // đầu tiên là lý do tại sao cái res.locals nó không chạy được ?
    // cứ mỗi app.router("/path", (req, res, next) => {}) thì res .locals nó sẽ chạy trong cái router đó và mấy cái thằng mình thường thấy middleware, controller, validate nằm trong đó nên vì thế tại sao nó mới dùng res của nhau được
    // bỏ vào session middleware luôn vì session middleware là của chung nên đứng nào cũng cầm được cái data này 
    //mình hiểu middlware là app.route('/path', middleware, controller..) nên là phải đi qua middleware trước mới đi vào cái sau
    // nãy mình đứng ở cart controller nằm ở route cart nên books kô xài đc// yes đúng rồi //yeah
    // app.use(sessionMiddleware); mình có định nghĩ dòng này ngoài server.js này trên cả app.get("/") thì code sẽ chạy vào đây nên chắc chắn là res.local sẽ là của chung 
    // ok , phew h qua books xem sao 
    let sessionDb = db
      .get("sessions")
      .find({ id: req.signedCookies.sessionId })
      .value();
    //console.log('sessionDb', sessionDb)

    let quantity = 0;
    let listCart = [];
    
    if (sessionDb) {
      for (var bookId in sessionDb.cart) {
        //  console.log(bookId);
        quantity += sessionDb.cart[bookId];
        let book = db
          .get("books")
          .find({ id: bookId })
          .value();
        book.num = sessionDb.cart[bookId];
        listCart.push(book);
      }
    }
    res.locals.listCart = listCart;
    res.locals.quantity = quantity;
    //console.log(quantity, listCart);
  }

  next();
};
