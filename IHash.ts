export interface IHash<T> extends RelativeIndexable<T> {
  get _size(): number;

  [Symbol.iterator](): IterableIterator<T>;

  clear(): boolean;

  add(item: T): boolean;

  delete(item: T): boolean;

  has(item: T): boolean;

  or_union(items: Iterable<T>): IHash<T>;

  and_intersection(items: Iterable<T>): IHash<T>;

  subtract(items: Iterable<T>): IHash<T>;

  set_equals(items: Array<T>): boolean;

  is_subset_of(items: Array<T>): boolean;
  is_proper_subset_of(items: Iterable<T>): boolean;

  is_superset_of(items: Iterable<T>): boolean;
  is_proper_superset_of(items: Iterable<T>): boolean;
}
