const express = require("express");
const app = express();

const nodemailer = require("nodemailer");

const PORT = process.env.PORT || 5000;

// var crypto = require("crypto"),
//   algorithm = "aes-256-ctr",
//   password = "d6F3Efeq";

// function encrypt(text) {
//   var cipher = crypto.createCipher(algorithm, password);
//   var crypted = cipher.update(text, "utf8", "hex");
//   crypted += cipher.final("hex");
//   return crypted;
// }

// function decrypt(text) {
//   var decipher = crypto.createDecipher(algorithm, password);
//   var dec = decipher.update(text, "hex", "utf8");
//   dec += decipher.final("utf8");
//   return dec;
// }

// var hw = encrypt("hello world");
// // outputs hello world
// console.log();
// console.log(encrypt(hw));

//Middleware
app.use(express.static("public"));
app.use(express.json());

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.post("/", (req, res) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.mail.ru",
    port: 587,
    auth: {
      user: "vanec_zhuk@mail.ru",
      pass: "wgGpzJ63bmAHihhz42TS",
    },
  });

  const mailOptions = {
    from: "vanec_zhuk@mail.ru",
    to: "vanec_zhuk@mail.ru",
    subject: `Message from waytochess`,
    text: `Заполнена анкета на странице: https://zhuk1305.github.io/waytochess/
    
Имя: ${req.body.name}
Телефон: ${req.body.phone}
Я согласен на обработку моих персональных данных: ${
      req.body.check ? "Да" : "Нет"
    }
`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.send("error");
    } else {
      res.send("success");
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
