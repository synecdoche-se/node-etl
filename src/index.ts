import HipsterStuffExtractor from "./extractors/HipsterStuffExtractor";
import RandomUserExtractor from "./extractors/RandomUserExtractor";
import BigQueryJSONLoader from "./loaders/BigQueryJSONLoader";
import HipsterUserTransformer from "./transformers/HipsterUserTransformer";
import UserSocialTransformer from "./transformers/UserSocialTransformer";

const extractData = async () => {
  const extractors = [new RandomUserExtractor(), new HipsterStuffExtractor()];

  return Promise.allSettled(extractors.map((e) => e.extractData()));
};

const transformData = (data) => {
  const transformers = [
    new HipsterUserTransformer(),
    new UserSocialTransformer()
  ];

  const transformedData = {};

  transformers.forEach((transformer) => {
    transformedData[transformer.key] = transformer.transformData(data);
  });

  return transformedData;
};

const loadData = async (data) => {
  const loaders = [new BigQueryJSONLoader()];

  return Promise.allSettled(
    loaders.map((l) => {
      try {
        l.load(data);
      } catch (e) {
        return null;
      }
    })
  );
};

const startPipeline = async () => {
  // Extract.
  const [userResp, hipsterResp] = await extractData();

  const extractedData = {
    users: userResp.value.data,
    hipsters: hipsterResp.value.data
  };

  // Transform.
  const transformedData = transformData(extractedData);

  // Load.
  const loaders = await loadData(transformedData);
};

startPipeline();

/**
 * Sources:
 * API: https://random-data-api.com/
 */
