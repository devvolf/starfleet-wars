export type Page<T> = {
  message: string;
  total_records: number;
  total_pages: number;
  results: T[];
};
