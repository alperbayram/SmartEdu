const nodemailer = require('nodemailer');

exports.getIndexPage = (req, res) => {
  //res.status(200).render('index');
  console.log(req.session.userID);
  res.status(200).render('index', {
    page_name: 'index',
  });
};

exports.getAboutPage = (req, res) => {
  res.status(200).render('about', {
    page_name: 'about',
  });
};

exports.getRegisterPage = (req, res) => {
  res.status(200).render('register', {
    page_name: 'register',
  });
};

exports.getLoginPage = (req, res) => {
  res.status(200).render('login', {
    page_name: 'login',
  });
};

exports.getContactPage = (req, res) => {
  res.status(200).render('contact', {
    page_name: 'contact',
  });
};

exports.sendEmail = async (req, res) => {
  try {
    const outputMessage = `
  <h1>Mail Details</h1>
  <ul>
    <li>Name: ${req.body.name}</li>
    <li>Email: ${req.body.email}</li>
  </ul>
  <h1>Message </h1>
  <p>${req.body.message}</p>
  `;

    let transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: 'elisabeth.keebler48@ethereal.email', // generated ethereal user
        pass: '2ff4bjEQ8YN7Fq97d33', // generated ethereal password
      },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: '"Fred Foo 👻" <elisabeth.keebler48@ethereal.email>', // sender address
      to: 'elisabeth.keebler48@ethereal.email', // list of receivers
      subject: 'smart edu contact form new message ✔', // Subject line
      html: outputMessage, // html body
    });

    console.log('Message sent: %s', info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...

    req.flash('success', 'We Received your message successfully');

    res.status(200).redirect('contact');
  } catch (error) {
    //req.flash('error', `something happened! ${error}`);
    req.flash('error', "Something happend!")
    res.status(200).redirect('contact');

  }
};
