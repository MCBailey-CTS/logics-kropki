type valid = IHash;

export interface IHash {
  get _size(): number;
  get _items(): Array<number>;
  clear(): boolean;

  add(item: number): boolean;

  delete(item: number): boolean;

  has(item: number): boolean;

  // or_union(items: IHash | Array<number>): IHash;

  // and_intersection(items: IHash | Array<number>): IHash;

  // subtract(items: IHash | Array<number>): IHash;

  set_equals(items: Array<number>): boolean;

  is_subset_of(items: Array<number>): boolean;
  // is_proper_subset_of(items: IHash | Array<number>): boolean;

  // is_superset_of(items: IHash | Array<number>): boolean;
  // is_proper_superset_of(items: IHash | Array<number>): boolean;
}
