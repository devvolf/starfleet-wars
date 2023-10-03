export type SwapiResponse<T> = {
  message: string;
  result: {
    properties: T;
  };
};
