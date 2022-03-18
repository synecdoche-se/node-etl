import type { TransformedData } from "../types";
import { BigQuery } from "@google-cloud/bigquery";
import { Storage } from "@google-cloud/storage";
import AbstractBigQueryLoader from "./AbstractBigQueryLoader";
import config from "../../config/google.json";

export default class BigQueryJSONLoader extends AbstractBigQueryLoader {
  public bigQuery: BigQuery;
  public storage: Storage;
  public bucketName: string;
  public filename: string;

  constructor() {
    super("test", "", null);

    const creds = {
      projectId: config.project_id,
      credentials: {
        client_email: config.client_email,
        private_key: config.private_key
      }
    };

    this.bigQuery = new BigQuery(creds);
    this.storage = new Storage(creds);
    this.bucketName = "nodetl";
    this.filename = "bigquery-sample.json";
  }

  async load(transfomedData: TransformedData) {
    if (!config) {
      throw new Error(
        "You need a google.json config file to use the BigQuery loader."
      );
    }

    if (!this.datasetExists()) {
      throw new Error("Datset does not exist, please create it in BigQuery!");
    }

    const promises = [];
    for (const [table, data] of Object.entries(transfomedData)) {
      if (!this.tableExists(table)) {
        throw new Error("Table does not exist, please create it in BigQuery!");
      }
      promises.push(this.upload(table, data));
    }

    await Promise.all(promises);
  }

  public async datasetExists() {
    try {
      const ds = this.bigQuery.dataset(this.dataset);
      await ds.get();
      return true;
    } catch (e) {
      if (e.code === 404) {
        console.log(`data set didn't exist: ${this.dataset}`);
      }
      return false;
    }
  }

  public async tableExists(table: string) {
    try {
      const dataset = this.bigQuery.dataset(this.dataset);
      const bqtable = dataset.table(table);
      await bqtable.get();
      return true;
    } catch (e) {
      if (e.code === 404) {
        console.log(`table didn't exist: ${table}`);
      }
      return false;
    }
  }

  private async upload(table: string, data: any[]) {
    try {
      const entryJson = data.reduce(
        (acc: string, entry: Record<string, unknown>) => {
          return (acc += JSON.stringify(entry) + "\n");
        },
        ""
      );

      await this.uploadToStorage(entryJson);

      const file = this.storage
        .bucket(this.bucketName)
        .file(`bq-load-${table}.json`);

      await this.bigQuery.dataset(this.dataset).table(table).load(file, {
        sourceFormat: "NEWLINE_DELIMITED_JSON",
        autodetect: true,
        location: "europe-west6"
      });

      console.log(`Successfully loaded ${table} table data`);
    } catch (err) {
      console.error(err);
    }
  }

  private async uploadToStorage(data: string | Buffer) {
    const bucket = this.storage.bucket("nodetl");
    const fileName = bucket.file(`bq-load-${this.table}.json`);
    return fileName.save(data);
  }
}
