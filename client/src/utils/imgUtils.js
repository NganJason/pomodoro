import axios from "axios";
import seed from "seed-random";

const CLIENT_ID = "wCHnFVRCaC6wmrc6dwVlt89UaCv67yey-UqZPy5atKo";
const UNSPLASH_LANDSCAPE_COLLECTION_ID = "jhxo2Yp9MQ0";
const MAX_PAGE = 3;
const ITEMS_PER_PAGE = 30;

const getBackgroundImg = async (width, height) => {
  let dt = new Date();
  let randomSeed =
    dt.getDay() + dt.getMonth() + dt.getHours() + dt.getMinutes();
  let generator = new seed(randomSeed);
  let randomNumber = generator();

  let pageSeed = dt.getDay() + dt.getMonth() + dt.getHours() + dt.getMinutes();
  let pageGenerator = new seed(pageSeed);
  let pageRandomNumber = Math.floor(pageGenerator() * MAX_PAGE);

  const unsplashAPI = `https://api.unsplash.com/collections/${UNSPLASH_LANDSCAPE_COLLECTION_ID}/photos?client_id=${CLIENT_ID}&page=${pageRandomNumber}&per_page=${ITEMS_PER_PAGE}`;
  var img = await axios.get(unsplashAPI);

  let randomImgIdx = Math.floor(randomNumber * img.data.length);
  return img.data[randomImgIdx].urls.full;
};

export const imgUtils = {
  getBackgroundImg: getBackgroundImg,
};
