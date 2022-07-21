export interface IHash<T> {
  get _size(): number;

  // [Symbol.iterator]():Iterable<T>;
  get _items(): Array<T>;
  clear(): boolean;

  add(item: T): boolean;

  delete(item: T): boolean;

  has(item: T): boolean;

  // or_union(items: IHash | Array<number>): IHash;

  // and_intersection(items: IHash | Array<number>): IHash;

  // subtract(items: IHash | Array<number>): IHash;

  set_equals(items: Array<T>): boolean;

  is_subset_of(items: Array<T>): boolean;
  // is_proper_subset_of(items: IHash | Array<number>): boolean;

  // is_superset_of(items: IHash | Array<number>): boolean;
  // is_proper_superset_of(items: IHash | Array<number>): boolean;
}
