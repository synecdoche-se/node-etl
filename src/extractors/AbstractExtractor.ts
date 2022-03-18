export default abstract class AbstractExtractor<T> {
  public url: string;

  constructor(apiBase: string, endpoint: string) {
    this.url = apiBase + endpoint;
  }

  abstract extract(params: Record<string, unknown>): Promise<T>;
}
