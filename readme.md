# This is the source code for comp7170 Project from 19449909 John Lui
# command to start the Project
1. npm i 
2. node server.js

ps.) Docker file for your reference

# Code for generating 1st CTF
```javascript
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
for(var i=0;i<10000;i++) {
    
    var secret = btoa("john:"+i)
    var result = await makeRequest("Basic "+secret);
    if(result) { alert(i);break;} 
}
```

# Example successful result for Part 2

http://localhost:8080/submit?spendDesc=bus&spendAmt=10&checkSum=b53f744e2c7ddadccafef2c814ea1a5fca3204b3d684f2ec73f591125ab18735