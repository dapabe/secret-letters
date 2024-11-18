/**
 * From T, extract properties that match V
 * @default V Unknown; Extract all
 */
export type ExtractTypedKeys<T, V = unknown> = {
  [K in keyof T]: T[K] extends V ? K : never;
}[keyof T];
