var express = require("express");
var router = express.Router();
var us_states = require("../us_state.js");
const request = require("request");
const fs = require("fs");

/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("index", { title: "Find My Election", states: us_states });
});

router.post("/search", function(req, res, next) {
  // res.send("<h1>Test</h1>");
  const city = req.body.city.toLowerCase().replace(/ /g, "_");
  const state = req.body.state.toLowerCase();
  const url = `https://api.turbovote.org/elections/upcoming?district-divisions=ocd-division/country:us/state:${state},ocd-division/country:us/state:${state}/place:${city}}`;
  console.log(url);
  //typing up the url will provide an edn file but my code doesnt seem to obtain that nor the json version of it, tried many different ways
  //the json i should have received should have looked like this https://repl.it/repls/PaleCyberSystemsoftware

  request.get(
    {
      url,
      header: {
        Accept: "application/json"
      }
    },
    function(err, response, body) {
      if (err) {
        console.log(err);
        res.redirect("/");
      } else {
        const result = body;
        //if I had more time I would have done a for loop and place the text in its proper <tag>
        res.send("<h1>Test</h1>");
      }
    }
  );
});

module.exports = router;
