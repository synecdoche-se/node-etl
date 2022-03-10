const RandomUserExtractor = require('./src/extractors/RandomUserExtractor');
const HipsterStuffExtractor = require('./src/extractors/HipsterStuffExtractor');
const HipsterUserTransformer = require('./src/transformers/HipsterUserTransformer');

const extractData = async () => {
  // Run extractors.
  const extractors = [
    new RandomUserExtractor(),
    new HipsterStuffExtractor(),
  ];

  return Promise.allSettled(
    extractors.map(
      (e) => e.extractData(),
    ),
  );
};

const transformData = (data) => {
  const transformers = [
    new HipsterUserTransformer(),
  ];

  const transformedData = {};

  transformers.forEach((transformer) => {
    transformedData[transformer.key] = transformer.transformData(data);
  });

  return transformedData;
};

const startPipeline = async () => {
  // Extract.
  const [userResp, hipsterResp] = await extractData();

  const extractedData = {
    users: userResp.value.data,
    hipsters: hipsterResp.value.data,
  };

  // Transform.
  const transformedData = transformData(extractedData);

  console.log(transformedData);
};

startPipeline();

/**
 * Sources:
 * API: https://random-data-api.com/
 */
