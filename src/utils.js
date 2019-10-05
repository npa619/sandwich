import request from "axios";
import { createWorker } from "tesseract.js";

export const fileToText = async ({ file, lang = "eng" }) => {
  const worker = createWorker({
    logger: ({progress, status}) => console.log(status, progress)
  });
  await worker.load();
  await worker.loadLanguage(lang);
  await worker.initialize(lang);
  const { data: { text } } = await worker.recognize(file);
  await worker.terminate();
  return text;
};

export const translate = text => {
  const key = process.env.YANDEX_KEY;
  const baseUrl = "https://translate.yandex.net/api/v1.5/tr.json/translate";

  return request({
    method: "post",
    url: baseUrl,
    params: {
      key,
      lang: "en-es",
      text
    }
  }).then(({ data: { text } }) => text);
};
