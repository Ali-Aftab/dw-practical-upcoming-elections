var express = require("express");
var router = express.Router();
var us_states = require("../us_state.js");
const request = require("request");

/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("index", { title: "Find My Election", states: us_states });
});

/* POST search */
router.post("/search", function(req, res, next) {
  const city = req.body.city.toLowerCase().replace(/ /g, "_");
  const state = req.body.state.toLowerCase();
  const url = `https://api.turbovote.org/elections/upcoming?district-divisions=ocd-division/country:us/state:${state},ocd-division/country:us/state:${state}/place:${city}`;
  request(
    {
      url,
      headers: {
        Accept: "application/json"
      },
      method: "GET"
    },
    function(err, response, body) {
      if (err) {
        console.log(err);
        res.redirect("/");
      } else {
        const result = JSON.parse(body);
        const htmlFormat = jsonToHtml(result);
        res.send(htmlFormat);
      }
    }
  );
});

// turn json to html
function jsonToHtml(result) {
  let election = "";
  for (let i = 0; i < result.length; i++) {
    let districtObj = result[i];
    for (let key in districtObj) {
      if (typeof districtObj[key] === "object") {
        const formated = isObject(districtObj[key], election);
        console.log(formated);
        election = election + formated;
      } else {
        election =
          election +
          `
      <h3>${key}</h3>
      <br />
      <p>${districtObj[key]}</p>
      <br />
      `;
      }
    }
  }
  return election;
}
function isObject(info, str) {
  for (let key in info) {
    if (typeof info[key] == "object") {
      str = str + isObject(info[key], str);
    } else {
      str =
        str +
        `
      <h3>${key}</h3>
      <br />
      <p>${info[key]}</p>
      <br />
      `;
    }
  }
  return str;
}
module.exports = router;
