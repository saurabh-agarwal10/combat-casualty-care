const express = require('express');
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');
const History=require('../models/History');
// Welcome Page
router.get('/', forwardAuthenticated, (req, res) => res.render('welcome'));

// Dashboard
router.get('/homepage', ensureAuthenticated, (req, res) =>
  res.render('homepage', {
    user: req.user
  })
);
router.get('/anomaly', ensureAuthenticated, (req, res) =>
  res.render('anomaly', {
    user: req.user
  })
);
router.get('/announcement', ensureAuthenticated, (req, res) =>
  History.find((err,docs)=>{ 
    if (!err) {
      res.render('announcement', {
        user:req.user,
        data: docs
      });
    } 
    else {
      console.log('Failed to retrieve the History List: ' + err);
    }
  })
);
router.get('/personaldata', ensureAuthenticated, (req, res) =>
  res.render('personaldata', {
    user: req.user
  })
);
module.exports = router;
