import express from "express";
import multer from 'multer';
import path from 'path';
import { fileToText, translate } from './utils';

const app = express();
const port = process.env.PORT || 8080

// file upload to memory
const storage = multer.memoryStorage();
const upload = multer({ storage });

// pug config
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.get('/', (req, res) => res.render('index'));

app.post('/translate', upload.single('file'), async (req, res) => {
  const text = await fileToText({ file: req.file.buffer });
  const translatedText = await translate(text);
  res.render('index', { text, translatedText });
})

app.listen(port, () => console.log(`Listening on port ${port}.`));

