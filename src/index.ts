import type { HipstersAndUsers, TransformedData } from "./types";
import HipsterStuffExtractor from "./extractors/HipsterStuffExtractor";
import RandomUserExtractor from "./extractors/RandomUserExtractor";
import BigQueryJSONLoader from "./loaders/BigQueryJSONLoader";
import HipsterUserTransformer from "./transformers/HipsterUserTransformer";
import UserSocialTransformer from "./transformers/UserSocialTransformer";

const extract = () => {
  return Promise.all([
    new RandomUserExtractor().extract(),
    new HipsterStuffExtractor().extract()
  ]);
};

const transform = (data: HipstersAndUsers): TransformedData => {
  return {
    hipsterUser: new HipsterUserTransformer("hipsterUser").transform(data),
    userSocial: new UserSocialTransformer("userSocial").transform(data)
  };
};

const load = (data: TransformedData) => {
  return Promise.all([new BigQueryJSONLoader().load(data)]);
};

const start = async () => {
  try {
    // Extract
    const [users, hipsters] = await extract();
    // Transform
    const transformed = transform({ users, hipsters });
    // Load
    await load(transformed);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

start();
