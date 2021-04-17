

const express = require('express');
const basicAuth = require('express-basic-auth');
const cors = require('cors');
const CryptoJS = require('crypto-js');

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';
const secret = '0411';
// App
const app = express();
// eslint-disable-next-line new-cap
const router = express.Router();

app.use(cors());
app.use(basicAuth({
  users: {john: secret},
  challenge: true, // <--- needed to actually show the login dialog!
}));

router.get('/', (req, res) => {
  res.send('authorized');
});

router.get('/submit', (req, res) => {
  const reqObj = req.query;
  const spendDesc = reqObj.spendDesc;
  const spendAmt = reqObj.spendAmt;
  const checkSum = reqObj.checkSum;
  const message = spendDesc + spendAmt;
  // eslint-disable-next-line new-cap
  const calCheckSum = CryptoJS.HmacSHA256(message, secret);
  console.log('CheckSum:'+checkSum);
  console.log('calCheckSum:'+calCheckSum);
  if (checkSum==calCheckSum) {
    res.send('You have submit the spending successfully');
  } else {
    res.send('Submission Failure');
  }
});

app.use(router);
app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);

/*
Answer
async function makeRequest(auth) {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", auth);

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    var resp = await fetch("http://localhost:8080/", requestOptions);
    return resp.text();
}

//for(i=0;i<10000;i++) { await makeRequest("Basic MTox") };
*/

