const textToImage = require('./utils/textToImage');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 8080;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api/hello', (req, res) => {
  res.send({ express: 'Hello From Express' });
});

app.post('/api/image', (req, res) => {
    const text = req.body.text;
    console.log("pp:: ", text);
    textToImage.generate(text, {
      maxWidth: 800
    }).then(function (dataUri) {
      res.json({ data: dataUri });
    });
});

app.post('/api/world', (req, res) => {
  console.log(req.body);
  res.send(
    `I received your POST request. This is what you sent me: ${req.body.post}`,
  );
});

if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, 'src/build')));
  // Handle React routing, return all requests to React app
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'src/build', 'index.html'));
  });
}

app.listen(port, () => console.log(`Listening on port ${port}`));