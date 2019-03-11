var express = require("express");
var router = express.Router();
var us_states = require("../us_state.js");
const request = require("request");

/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("index", { title: "Find My Election", states: us_states });
});

router.post("/search", function(req, res, next) {
  // res.send("<h1>Test</h1>");
  const city = req.body.city.toLowerCase().replace(/ /g, "_");
  const state = req.body.state.toLowerCase();
  const url = `https://api.turbovote.org/elections/upcoming?district-divisions=ocd-division/country:us/state:${state},ocd-division/country:us/state:${state}/place:${city}}`;
});

module.exports = router;
