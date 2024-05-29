export interface Page<T> {
  items: T[];
  page: number;
  pageSize: number;
  totalCount: number;
}

export function emptyPage<T>(): Page<T> {
  return {
    items: [],
    page: 1,
    pageSize: 0,
    totalCount: 0
  };
}
