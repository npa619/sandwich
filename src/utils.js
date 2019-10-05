import request from "axios";
import { createWorker } from "tesseract.js";

export const fileToText = async ({ file, lang }) => {
  const worker = createWorker({
    logger: ({ progress, status }) => console.log(status, progress)
  });
  await worker.load();
  await worker.loadLanguage(lang);
  await worker.initialize(lang);
  const { data: { text } } = await worker.recognize(file);
  await worker.terminate();
  return text;
};

const IDIOMS = {
  eng: 'en',
  spa: 'es',
};

export const translate = async ({ text, from, to}) => {
  const key = process.env.YANDEX_KEY;
  const url = "https://translate.yandex.net/api/v1.5/tr.json/translate";

  return request({
    url,
    method: "post",
    params: {
      key,
      lang: `${IDIOMS[from]}-${IDIOMS[to]}`,
      text,
    }
  }).then(({ data: { text } }) => text);
};
