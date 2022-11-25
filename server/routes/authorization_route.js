const express = require("express");
const router = express.Router();
const authModel = require("../models/authorization_model");

router.get('/login', function(req, res) {
  console.log("LOGIN ROUTE");
  authModel.getAuthToken(req, res);
});

router.get('/callback', function(req, res) {
  console.log("CALLLBACK ROUTE");
  authModel.getAuthCallback(req, res);
});

router.get('/refresh_token', function(req, res) {
  console.log("REFRESH ROUTE");
  authModel.getRefreshAuthToken(req, res);
});

module.exports = router;