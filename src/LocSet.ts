import { Loc } from "./Loc";

export class LocSet {
  constructor(locs?: Loc[] | undefined) {
    this._map = new Map<string, Loc>();

    if (!locs) return;

    for (const loc of locs) this.add(loc);
  }

  private readonly _map: Map<string, Loc>;

  private static locToString(loc: Loc): string {
    return `${loc.row}_${loc.col}`;
  }

  add(loc: Loc): boolean {
    if (this.has(loc)) return false;

    const locStr = LocSet.locToString(loc);

    this._map.set(locStr, loc);

    return true;
  }

  has(loc: Loc): boolean {
    const locStr = LocSet.locToString(loc);

    return this._map.has(locStr);
  }

  clear() {
    this._map.clear();
  }

  get size(): number {
    return this._map.size;
  }

  delete(loc: Loc): boolean {
    if (!this.has(loc)) return false;

    const locStr = LocSet.locToString(loc);

    return this._map.delete(locStr);
  }

  get values(): Loc[] {
    return [...this._map.values()];
  }

  difference(locs: Loc[]): LocSet {
    const _difference = new LocSet(this.values);

    for (const loc of locs) _difference.delete(loc);

    return _difference;
  }
}
