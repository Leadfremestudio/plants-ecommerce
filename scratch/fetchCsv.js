const https = require('https');

https.get('https://docs.google.com/spreadsheets/d/e/2PACX-1vRwXL6EE44yx7EzxFyLAd7r86aZeRfSzZ9EJG3-wmsNuT0nKdldwNPDCiweonSdEejCI7mWXZjgNOvV/pub?output=csv&t=' + Date.now(), (res) => {
  let data = '';
  res.on('data', (c) => data += c);
  res.on('end', () => console.log(data));
});
