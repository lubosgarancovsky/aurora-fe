type PartOf<T> = {
  [K in keyof T]-?: Pick<T, K> & Partial<Record<Exclude<keyof T, K>, never>>;
}[keyof T];
