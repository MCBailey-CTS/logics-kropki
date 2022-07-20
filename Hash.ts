import { IHash } from "./IHash";


export class Hash implements IHash {
  get _size(): number {
    throw new Error("Method not implemented.");
  }
  get _items(): number[] {
    throw new Error("Method not implemented.");
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
  set_equals(hash: IHash): boolean {
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
    throw new Error("Method not implemented.");
  }
}
