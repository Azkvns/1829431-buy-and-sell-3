'use strict';

const chalk = require(`chalk`);
const fs = require(`fs`).promises;
const {getRandomInt, shuffle, readContent} = require(`../utils`);
const {FILE_CATEGORIES_PATH, FILE_SENTENCES_PATH, FILE_TITLES_PATH, PictureRestrict, OfferType, SumRestrict, DEFAULT_COUNT, FILE_NAME} = require(`./constants`);

const buildFileName = (fileName, number, ext) => {
  const fileNumber = `${number < 10 ? `0` : ``}` + number;
  return fileName + fileNumber + `.` + ext;
};

const generateOffers = (count, titles, sentences, categories) => {
  return Array(count).fill({}).map(() => {
    return {
      category: [categories[getRandomInt(0, categories.length - 1)]],
      description: shuffle(sentences).slice(1, 5).join(` `),
      picture: buildFileName(`item`, getRandomInt(PictureRestrict.MIN, PictureRestrict.MAX), `jpg`),
      title: titles[getRandomInt(0, titles.length - 1)],
      type: OfferType[Object.keys(OfferType)[Math.floor(Math.random() * Object.keys(OfferType).length)]],
      sum: getRandomInt(SumRestrict.MIN, SumRestrict.MAX),
    };
  });
};

module.exports = {
  name: `--generate`,
  args: [`<count>`],
  description: `формирует файл mocks.json`,
  async run(args) {
    const [count] = args;
    const countOffer = Number.parseInt(count, 10) || DEFAULT_COUNT;

    if (countOffer > 1000) {
      throw new Error(`Не больше 1000 объявлений`);
    }

    const sentences = await readContent(FILE_SENTENCES_PATH);
    const categories = await readContent(FILE_CATEGORIES_PATH);
    const titles = await readContent(FILE_TITLES_PATH);

    const content = JSON.stringify(generateOffers(countOffer, titles, sentences, categories));

    try {
      await fs.writeFile(FILE_NAME, content);
      console.log(chalk.green(`Успешная операция. Файл создан.`));
    } catch (err) {
      throw new Error(`Не получилось записать данные в файл`);
    }
  }
};
