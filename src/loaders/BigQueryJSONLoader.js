const { BigQuery } = require('@google-cloud/bigquery');
const AbstractLoader = require('./AbstractLoader');
const config = '../../config/google.json';

class BigQueryJSONLoader extends AbstractLoader {
    load( data ) {
        const job = await bigquery
            .dataset(datasetId)
            .table(tableId)
            .insert(jsonData)
            .then((data) => {
                const apiResponse = data;
                console.log(`apiResponse:: ${apiResponse}`);
            })
            .catch((err) => { console.log(`err: ${err}`); });
    }
}
