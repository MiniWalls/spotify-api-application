const express = require("express");
const router = express.Router();
const authModel = require("../models/authorization_model");

router.get('/login', function(req, res) {
  authModel.getAuthToken(req, res);
});

router.get('/callback', function(req, res) {
  authModel.getAuthCallback(req, res);
});

router.get('/refresh_token', function(req, res) {
  authModel.getRefreshAuthToken(req, res);
});

module.exports = router;