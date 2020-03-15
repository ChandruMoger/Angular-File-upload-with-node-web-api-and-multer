const express = require('express');
const bodyParser = require('body-parser');
const path = require("path");
const multer = require('multer');
const cors = require("cors");
var upload = multer({ dest: 'uploads/' })

const app = express(); 

app.use(cors({ origin: "*" }));
app.use(bodyParser.json());

const port = process.env.port || 4000;
app.use(express.static(path.join(__dirname, '/dist')));
// app.get('/', (req, res, next) => {
//  return res.send("Successfully running");
// });
app.post('/file', upload.single('file'), (req, res, next) => {
    const file = req.file;
    console.log(file.filename);
    if (!file) {
      const error = new Error('No File')
      error.httpStatusCode = 400
      return next(error)
    }
      res.send(file);
  })

//   app.post('/multipleFiles', upload.array('files'), (req, res, next) => {
//     const files = req.files;
//     console.log(files);
//     if (!files) {
//       const error = new Error('No File')
//       error.httpStatusCode = 400
//       return next(error)
//     }
//       res.send({sttus:  'ok'});
//   })
app.get('*', (req, res, next) => {
    res.sendFile(path.join(__dirname  + '/dist/index.html'));
   });

app.listen(port, () => {
    console.log(`Server is up and running on port ${port}`);
})
