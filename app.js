const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');
var nodemailer = require('nodemailer');
const { stack } = require('./routes/index.js');
const app = express();


// Passport Config
require('./config/passport')(passport);

// DB Config
const db = require('./config/keys').mongoURI;

// Connect to MongoDB
mongoose
  .connect(
    'mongodb+srv://admin1:admin123456@cluster0.pxogxvv.mongodb.net/test?retryWrites=true&w=majority'
  )
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// EJS
app.use(expressLayouts);
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');

// Express body parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json({
  type: "*/*"
}));
// Express session
app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());

// Global variables
app.use(function(req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

app.post('/anomaly',(req, res) =>{
  const History=require('../Code/models/History');
  console.log(req.body);
  const val=req.body;
  console.log(val.anomaly);
  let b=Math.floor(100000 + Math.random() * 900000);
  let a=val.anomaly;
  const hist=new History({value:a,deviceid:b});
  hist.save();

  if(a==1){
    console.log('inside if');
    main(b);
  }
 })

 async function main(id) {

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user: 'ska.agrawal5@gmail.com',
      pass: 'Ghostrider2',
      clientId: '182088373959-jpe40qf5pq6o5aeffil2h163gmd300mq.apps.googleusercontent.com',
      clientSecret: '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',
      refreshToken: '1//041y7RT8TUuutCgYIARAAGAQSNwF-L9IrpNQuFcVZu2LzkBz0mPolL1O-wST_SuPQsF4bqvP6GqrrhacMKLdKh_QIGMVGOWODwd4'
    }
  });
  const mailConfigurations = {
    from: 'ska.agrawal5@gmail.com',
    to: 'skaspam0@gmail.com',
    subject: 'ANOMALY ALERT!',
    text: `Dear user,
An anomaly has been detected in the database!
Please find the details mentioned below:

Device Id: ${id}
Anomaly: Detected
    `
  };
    
  transporter.sendMail(mailConfigurations, function(error, info){
      if (error) throw Error(error);
        console.log('Email Sent Successfully');
      console.log(info);
  });
}

main().catch(console.error);
// Routes
app.use('/', require('./routes/index.js'));
app.use('/users', require('./routes/users.js'));
app.use('/index', require('./routes/index.js'));
const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));
