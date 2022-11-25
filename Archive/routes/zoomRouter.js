const express = require("express");
const router = express.Router();
const requestPromise = require("request-promise");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const KJUR = require("jsrsasign");

const payload = {
  iss: process.env.API_KEY, //your API KEY
  exp: new Date().getTime() + 5000
};
const token = jwt.sign(payload, process.env.API_SECRET); //your API SECRET HERE

router.get("/createMeeting", (req, res) => {
  email = "souissi.meriem@predict-a.com"; // your zoom developer email account
  var options = {
    method: "POST",
    uri: "https://api.zoom.us/v2/users/" + email + "/meetings",
    body: {
      topic: "Zoom Meeting Using Node JS", //meeting title
      type: 2,
      start_time: "2022-11-18T10:10:10Z",
      settings: {
        host_video: "true",
        participant_video: "true",
        auto_recording: "cloud"
        // join_before_host: "true",
        // jbh_time: 0
      }
    },
    auth: {
      bearer: token
    },
    headers: {
      "User-Agent": "Zoom-api-Jwt-Request",
      "content-type": "application/json"
    },
    json: true //Parse the JSON string in the response
  };

  requestPromise(options)
    .then(function (response) {
      console.log("response is: ", response);
      res.send(JSON.stringify(response));
    })
    .catch(function (err) {
      // API call failed...
      console.log("API call failed, reason ", err);
    });
});

function generateSignature(sdkKey, sdkSecret, meetingNumber, role) {
  // const iat = Math.round((new Date().getTime() - 30000) / 1000);
  const iat = Math.round(new Date().getTime() / 1000) - 30;
  const exp = iat + 60 * 60 * 2;
  const oHeader = { alg: "HS256", typ: "JWT" };

  const oPayload = {
    sdkKey: sdkKey,
    mn: meetingNumber,
    role: role,
    iat: iat,
    exp: exp,
    appKey: sdkKey
    // tokenExp: iat + 60 * 60 * 2
  };

  const sHeader = JSON.stringify(oHeader);
  const sPayload = JSON.stringify(oPayload);
  const sdkJWT = KJUR.jws.JWS.sign("HS256", sHeader, sPayload, sdkSecret);
  return sdkJWT;
}

router.post("/createSignature", (req, res) => {
  const signature = generateSignature(
    process.env.ZOOM_SDK_KEY,
    process.env.ZOOM_SDK_SECRET,
    req.body.meetingNumber,
    req.body.role
  );
  res.json({
    signature: signature
  });
});
module.exports = router;
