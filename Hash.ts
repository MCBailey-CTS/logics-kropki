import { IHash } from "./IHash";

export class Hash<T> implements IHash<T> {
  private readonly __hash: Set<T>;

  constructor(items?: T[] | null | undefined) {
    if (items == null || typeof items == "undefined") {
      this.__hash = new Set<T>();
      return;
    }

    this.__hash = new Set<T>(items);
  }


  // [Symbol.iterator](): Iterable<T> {
  //   throw new Error("Method not implemented.");
  // }

  set_equals(items: T[]): boolean {
    const other = new Set<T>(items);

    return other.size == this._size && this.is_subset_of(items);
  }

  has(item: T): boolean {
    return this.__hash.has(item);
  }

  is_subset_of(items: T[]): boolean {
    const other = new Set<T>(items);

    return this._items.every((item) => {
      return other.has(item);
    });
  }

  get _size(): number {
    return this.__hash.size;
  }

  get _items(): T[] {
    return [...this.__hash];
  }

  clear(): boolean {
    const originalSize = this._size;

    this.__hash.clear();

    return originalSize > this._size && this._size != 0;
  }

  add(item: T): boolean {
    const originalSize = this._size;

    this.__hash.add(item);

    return originalSize < this._size;
  }

  delete(item: T): boolean {
    return this.__hash.delete(item);
  }
}
