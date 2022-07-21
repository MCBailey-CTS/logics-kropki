import { IHash } from "./IHash";

export class Hash implements IHash {
  private readonly __hash: Set<number>;

  constructor(items?: number[] | null | undefined) {
    if (items == null || typeof items == "undefined") {
      this.__hash = new Set<number>();
      return;
    }

    this.__hash = new Set<number>(items);
  }

  set_equals(items: number[]): boolean {
    const other = new Set<number>(items);

    return other.size == this._size && this.is_subset_of(items);
  }

  has(item: number): boolean {
    return this.__hash.has(item);
  }

  is_subset_of(items: number[]): boolean {
    const other = new Set<number>(items);

    return this._items.every((item) => {
      return other.has(item);
    });
  }

  get _size(): number {
    return this.__hash.size;
  }

  get _items(): number[] {
    return [...this.__hash];
  }

  clear(): boolean {
    const originalSize = this._size;

    this.__hash.clear();

    return originalSize > this._size && this._size != 0;
  }

  add(item: number): boolean {
    const originalSize = this._size;

    this.__hash.add(item);

    return originalSize < this._size;
  }

  delete(item: number): boolean {
    return this.__hash.delete(item);
  }
}
