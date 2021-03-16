const crypto = require("crypto");
const config = require("./config");

exports.validateEmpty = (req, res, next) => {
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    return res.status(400).json({ error: "body empty" });
  }
  next();
};

exports.hash = (str) => {
  let string = typeof str == "string" && str.length > 0 ? str : false;
  if (string) {
    let hash = crypto
      .createHmac("sha256", config.hashingSecret)
      .update(string)
      .digest("hex");
    return hash;
  } else {
    return false;
  }
};

exports.createRandomString = (strLength) => {
  strLength = typeof strLength == "number" && strLength > 0 ? strLength : false;
  if (strLength) {
    let possibleChars =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-*/+)(*&^%$#@#!";
    let str = "";
    for (i = 1; i <= strLength; i++) {
      let randomCharacter = possibleChars.charAt(
        Math.floor(Math.random() * possibleChars.length)
      );

      str += randomCharacter;
    }
    return str;
  } else {
    return false;
  }
};
