const express = require("express");
const cors = require("cors");
const dotEnv = require("dotenv");
const zoomRouter = require("./routes/zoomRouter");
const KJUR = require("jsrsasign");
const app = express();

//registering middlewares
dotEnv.config();
app.use(cors());
app.use(express.json());

//registering routes
app.use("/zoomapi", zoomRouter);

//listening to port
const port = process.env.PORT || 3005;

// function generateSignature(sdkKey, sdkSecret, meetingNumber, role) {
//   const iat = Math.round((new Date().getTime() - 30000) / 1000);
//   const exp = iat + 60 * 60 * 2;
//   const oHeader = { alg: "HS256", typ: "JWT" };

//   const oPayload = {
//     sdkKey: sdkKey,
//     mn: meetingNumber,
//     role: role,
//     iat: iat,
//     exp: exp,
//     appKey: sdkKey,
//     tokenExp: iat + 60 * 60 * 2
//   };

//   const sHeader = JSON.stringify(oHeader);
//   const sPayload = JSON.stringify(oPayload);
//   const sdkJWT = KJUR.jws.JWS.sign("HS256", sHeader, sPayload, sdkSecret);
//   return sdkJWT;
// }

// console.log(
//   generateSignature(
//     process.env.ZOOM_SDK_KEY,
//     process.env.ZOOM_SDK_SECRET,
//     96672939987,
//     0
//   )
// );

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
