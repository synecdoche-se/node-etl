export default abstract class AbstractExtractor {
  public url: string;

  constructor(apiBase: string, endpoint: string) {
    this.url = apiBase + endpoint;
  }

  abstract extractData<T>(params: Record<string, unknown>): Promise<T>;
}
