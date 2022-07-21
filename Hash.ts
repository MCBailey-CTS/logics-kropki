import { IHash } from "./IHash";

export class Hash implements IHash {
  private readonly __hash: Set<number>;

  constructor() {
    this.__hash = new Set<number>();
  }

  get _size(): number {
    return this.__hash.size;
  }

  get _items(): number[] {
    return [...this.__hash];
  }

  clear(): boolean {
    throw new Error("Method not implemented.");
  }

  add(item: number): boolean {
    throw new Error("Method not implemented.");
  }

  delete(item: number | number[]): boolean {
    throw new Error("Method not implemented.");
  }
  
  or_union(hash: IHash): IHash {
    throw new Error("Method not implemented.");
  }

  and_intersection(hash: IHash): IHash {
    throw new Error("Method not implemented.");
  }

  subtract(hash: IHash): IHash {
    throw new Error("Method not implemented.");
  }

  set_equals(hash: IHash): boolean {
    return hash._size == this._size && this.is_superset_of(hash);
  }

  is_subset_of(hash: IHash): boolean {
    throw new Error("Method not implemented.");
  }
  
  is_proper_subset_of(hash: IHash): boolean {
    throw new Error("Method not implemented.");
  }

  is_superset_of(hash: IHash): boolean {
    throw new Error("Method not implemented.");
  }

  is_proper_superset_of(hash: IHash): boolean {
    return false;
  }
}
