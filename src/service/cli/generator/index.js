'use strict';

const chalk = require(`chalk`);
const fs = require(`fs`).promises;
const {getRandomInt, shuffle} = require(`../utils`);
const {CATEGORIES, SENTENCES, PictureRestrict, TITLES, OfferType, SumRestrict, DEFAULT_COUNT, FILE_NAME} = require(`./constants`);

const buildFileName = (fileName, number, ext) => {
  const fileNumber = `${number < 10 ? `0` : ``}` + number;
  return fileName + fileNumber + `.` + ext;
};

const generateOffers = (count) => {
  return Array(count).fill({}).map(() => {
    return {
      category: [CATEGORIES[getRandomInt(0, CATEGORIES.length - 1)]],
      description: shuffle(SENTENCES).slice(1, 5).join(` `),
      picture: buildFileName(`item`, getRandomInt(PictureRestrict.MIN, PictureRestrict.MAX), `jpg`),
      title: TITLES[getRandomInt(0, TITLES.length - 1)],
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

    const content = JSON.stringify(generateOffers(countOffer));

    try {
      await fs.writeFile(FILE_NAME, content);
      console.log(chalk.green(`Успешная операция. Файл создан.`));
    } catch (err) {
      throw new Error(`Не получилось записать данные в файл`);
    }
  }
};
