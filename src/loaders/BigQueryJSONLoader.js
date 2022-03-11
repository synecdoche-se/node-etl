const {BigQuery} = require('@google-cloud/bigquery');
const {Storage} = require('@google-cloud/storage');
const AbstractLoader = require('./AbstractLoader');
const config = require('../../config/google.json');

class BigQueryJSONLoader extends AbstractLoader {
    constructor() {
        super();

        this.dataset = 'test';
        this.schema = '';

        const creds = {
            projectId: config.project_id,
            credentials: {
                client_email: config.client_email,
                private_key: config.private_key,
            },
        };

        this.bigquery = new BigQuery(creds);
        this.storage = new Storage(creds);
        this.bucketName = 'nodetl';
        this.filename = 'bigquery-sample.json';
    }

    async uploadJsonToStorage(table, json) {
        const bucket = this.storage.bucket('nodetl')
        const fileName = bucket.file(`bq-load-${table}.json`)

        return fileName.save(json);
    }

    async datasetExists() {
        const dataset = this.bigquery.dataset(this.dataset);
        try {
            const data = await dataset.get();
            const apiResponse = data[1];
        } catch (e) {
            if (e.code === 404) {
                console.log(`${e.message} table didn't exist: ${tableId}`);
            }
        }
    }

    async tableExists( table ) {
        const dataset = this.bigquery.dataset(this.dataset);
        const bqtable = dataset.table(table);
        try {
            const data = await bqtable.get();
            const apiResponse = data[1];
        } catch (e) {
            if (e.code === 404) {
                console.log(`${e.message} table didn't exist: ${this.table}`);
            }
        }
    }

    /**
     * Load the JSON data to BigQuery.
     * @param table
     * @returns {awaited Promise<R>|Promise<R|any>|Promise<any>|*}
     * @throws Error
     */
    async load(data) {
        if (!config) {
            throw new Error('You need a google.json config file to use the BigQuery loader.');
        }

        if (!this.datasetExists()) {
            throw new Error('Datset does not exist, please create it in BigQuery!');
        }

        const metadata = {
            sourceFormat: 'NEWLINE_DELIMITED_JSON',
            autodetect: true,
            location: 'europe-west6',
        };

        let entries = [];
        let jsonData = '';

        for (const table in data) {
            let entryJson = '';
            if ( !this.tableExists( table )) {
                throw new Error('Table does not exist, please create it in BigQuery!');
            }

            data[table].forEach ( entry => {
                entryJson += JSON.stringify( entry ) + "\n";
            });

            this.uploadJsonToStorage(table, entryJson)
                .then(resp => {
                    this.bigquery
                        .dataset(this.dataset)
                        .table(table)
                        .load(this.storage.bucket(this.bucketName).file(`bq-load-${table}.json`), metadata);

                    console.log( `Successfully loaded ${table} table data` );
                })
                .catch(err => console.log(err));
        }
    }
}

module.exports = BigQueryJSONLoader;