export interface IHash<T> extends RelativeIndexable<T> {
  get _size(): number;

  get _length(): number;

  [Symbol.iterator](): IterableIterator<T>;

  clear(): boolean;

  push(item: T): boolean;
  add(item: T): boolean;

  delete(item: T): boolean;

  has(item: T): boolean;

  or_union(items: Iterable<T>): IHash<T>;

  and_intersection(items: Iterable<T>): IHash<T>;

  subtract(items: Iterable<T>): IHash<T>;

  set_equals(items: Iterable<T>): boolean;

  is_subset_of(items: Iterable<T>): boolean;
  is_proper_subset_of(items: Iterable<T>): boolean;

  is_superset_of(items: Iterable<T>): boolean;
  is_proper_superset_of(items: Iterable<T>): boolean;

  _at(index: number): T;

  sort(compareFn?: (a: T, b: T) => number): this;

  // pop(): T | undefined;
  // _pop(): T;

  // peek(): T | undefined;
  // _peek(): T;

  // unshift(): number;

  shift(): T | undefined;
  _shift(): T;
}
