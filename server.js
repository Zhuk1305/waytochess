const express = require("express");
const app = express();

const nodemailer = require("nodemailer");

const PORT = process.env.PORT || 5000;

//Middleware
app.use(express.static("public"));
app.use(express.json());

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.post("/", (req, res) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    auth: {
      user: "waytochess.com@gmail.com",
      pass: "bndhelvdspcmlpwn",
    },
  });
  const mailOptions = {
    from: "waytochess.com@gmail.com",
    to: "waytochess.com@gmail.com",
    subject: `Message from waytochess`,
    text: `Заполнена анкета на странице: ${
      req.protocol + "://" + req.get("host") + req.originalUrl
    }
    
Имя: ${req.body.name}
Телефон: ${req.body.phone}
Я согласен на обработку моих персональных данных: ${
      req.body.checkPersonal ? "Да" : "Нет"
    }
Способы связи: ${req.body.checkSocial.join(",")}
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
