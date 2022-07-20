
export interface IHash {
  get _size(): number; get _items(): Array<number>; clear(): boolean;

  add(item: number): boolean;

  delete(item: number | Array<number>): boolean;

  set_equals(hash: IHash): boolean;

  or_union(hash: IHash): IHash;

  and_intersection(hash: IHash): IHash;

  subtract(hash: IHash): IHash;

  is_subset_of(hash: IHash): boolean;
  is_proper_subset_of(hash: IHash): boolean;

  is_superset_of(hash: IHash): boolean;
  is_proper_superset_of(hash: IHash): boolean;
}
