import type { TransformedData } from "../types";

export default abstract class AbstractBigQueryLoader {
  constructor(
    public dataset: string = "",
    public table: string = "",
    public schema: string | null = null
  ) {}

  abstract datasetExists(): Promise<boolean>;
  abstract tableExists(table: string): Promise<boolean>;
  abstract load(transformedData: TransformedData): Promise<void>;
}
