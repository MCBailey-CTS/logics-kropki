import { Loc } from "./Loc";

export class Consolidate{
  static surroundingIntersectionCell(loc: Loc):Loc[] {
    return [
        loc.up(),
        loc.up().up(),
        loc.down(),
        loc.down().down(),
        loc.left(),
        loc.left().left(),
        loc.right(),
        loc.right().right(),
      ];
  }
    
}