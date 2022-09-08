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
    text: `Заполнена анкета на странице: ${
      req.protocol + "://" + req.get("host") + req.originalUrl
    }
    
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
