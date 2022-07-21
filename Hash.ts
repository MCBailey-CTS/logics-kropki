import { IHash } from "./IHash";

export class Hash<T> implements IHash<T> {
  private readonly __hash: Set<T>;
  private readonly __list: Array<T>;

  constructor(items?: Iterable<T> | null | undefined) {
    this.__hash = new Set<T>(items);

    this.__list = new Array<T>();

    if (items == null || typeof items == "undefined") return;

    this.__list = new Array<T>(...items);
  }

  add(item: T): boolean{
    return this.push(item);
  }


  shift(): T | undefined {
    return this.__list.shift();
  }
  
  _shift(): T {
    const item = this.shift();

    if (typeof item == "undefined") throw Error();

    return item;
  }

  _at(index: number): T {
    const item = this.__list.at(index);

    if (typeof item == "undefined") throw Error();

    return item;
  }


  sort(compareFn?: (a: T, b: T) => number): this {
    this.__list.sort(compareFn);

    return this;
  }

  // pop(): T | undefined {
  //   throw new Error("Method not implemented.");
  // }
  // _pop(): T {
  //   throw new Error("Method not implemented.");
  // }
  // peek(): T | undefined {
  //   throw new Error("Method not implemented.");
  // }
  // _peek(): T {
  //   throw new Error("Method not implemented.");
  // }
  // unshift(): number {
  //   throw new Error("Method not implemented.");
  // }
  // shift(): T | undefined {
  //   throw new Error("Method not implemented.");
  // }
  // _shift(): T {
  //   throw new Error("Method not implemented.");
  // }

  or_union(items: Iterable<T>): IHash<T> {
    throw new Error("Method not implemented.");
  }
  and_intersection(items: Iterable<T>): IHash<T> {
    throw new Error("Method not implemented.");
  }
  subtract(items: Iterable<T>): IHash<T> {
    throw new Error("Method not implemented.");
  }
  is_proper_subset_of(items: Iterable<T>): boolean {
    throw new Error("Method not implemented.");
  }
  is_superset_of(items: Iterable<T>): boolean {
    throw new Error("Method not implemented.");
  }
  is_proper_superset_of(items: Iterable<T>): boolean {
    throw new Error("Method not implemented.");
  }

  at(index: number): T | undefined {
    return this.__list.at(index);
  }

  *[Symbol.iterator](): IterableIterator<T> {
    for (let item of this.__list) yield item;
  }

  set_equals(items: T[]): boolean {
    const other = new Hash<T>(items);

    return other._size == this._size && this.is_subset_of(items);
  }

  has(item: T): boolean {
    return this.__hash.has(item);
  }

  is_subset_of(items: T[]): boolean {
    const other = new Set<T>(items);

    return [...this].every((item) => {
      return other.has(item);
    });
  }



  get _size(): number {
    return this.__hash.size;
  }

  get _length(): number {
    return this.__list.length;
  }

  clear(): boolean {
    const originalSize = this._size;

    this.__hash.clear();

    return originalSize > this._size && this._size != 0;
  }

  push(item: T): boolean {
    const originalSize = this._size;

    this.__hash.add(item);

    this.__list.push(item);

    return originalSize < this._size;
  }

  delete(item: T): boolean {
    return this.__hash.delete(item);
  }
}
