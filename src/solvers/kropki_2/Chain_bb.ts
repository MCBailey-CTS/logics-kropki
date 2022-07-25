import { Hash } from "../../../Hash";
import { IHash } from "../../../IHash";
import { _BaseKropkiVector } from "../../abstract/_BaseKropkiVector";
import { Edit } from "../../Edit";
import { IEdit } from "../../interfaces/IEdit";
import { IKropkiPuzzle } from "../../interfaces/IKropkiPuzzle";
import { IKropkiSolver } from "../../interfaces/IKropkiSolver";
import { Loc } from "../../Loc";

export class Chain_bb implements IKropkiSolver {
   /////////////
   __puzzle: IKropkiPuzzle | undefined = undefined;

   get puzzle(): IKropkiPuzzle {
     if (typeof this.__puzzle == "undefined")
       throw Error(`You have not set a puzzle for the solver ${this.id}`);
 
     return this.__puzzle;
   }
 
   set puzzle(puzzle: IKropkiPuzzle) {
     if (typeof this.__puzzle != "undefined")
       throw Error(`You can only set a puzzle one time the solver ${this.id}`);
 
     this.__puzzle = puzzle;
   }
 
   get id(): string {
     return this.constructor.name;
   }
 
   remove(loc: Loc, ...candidates: number[]): IEdit[] {
     const edits: IEdit[] = [];
 
     for (const candidate of candidates)
       if (this.puzzle.removeCandidate(loc, candidate))
         edits.push(new Edit(this.puzzle, loc, candidate, this));
 
     return edits;
   }
 
   solvePuzzle(): IEdit[] {
     const edits: IEdit[] = [];
 
     for (const loc of this.puzzle.sudokuCellLocs)
       for (const vectorChain of this.vector_chains) {
         const locs: IHash<Loc> = new Hash<Loc>([loc]);
 
         let intersectionString = "";
 
         for (const vec of vectorChain) {
           const previous = locs._at(locs._length - 1);
 
           const next = previous.add_vector(vec.row, vec.col);
 
           if (!next.isValidKropkiLoc(this.puzzle.length)) break;
 
           // continue;
           const intersectionLoc = this.puzzle.getIntersection(previous, next);
 
           intersectionString += this.puzzle.getCellString(intersectionLoc);
 
           locs.push(next);
         }
 
         if (this.expected_kropki_string != intersectionString) continue;
 
         if (vectorChain._length + 1 != locs._length) continue;
 
         edits.push(...this.solveChain(locs));
       }
 
     return edits;
   }
   ///////////
  get vector_chains(): IHash<Loc>[] {
    const _base = new Loc(0, 0);
    return [
      [_base.right(2), _base.right(2)],
      [_base.right(2), _base.up(2)],
      [_base.right(2), _base.down(2)],

      [_base.left(2), _base.left(2)],
      [_base.left(2), _base.up(2)],
      [_base.left(2), _base.down(2)],

      [_base.up(2), _base.up(2)],
      [_base.up(2), _base.left(2)],
      [_base.up(2), _base.right(2)],

      [_base.down(2), _base.down(2)],
      [_base.down(2), _base.left(2)],
      [_base.down(2), _base.right(2)],
    ].map((array) => new Hash<Loc>(array));
  }
  get expected_kropki_string(): string {
    return "bb";
  }

  solveChain(locs: IHash<Loc>): IEdit[] {
    const edits: IEdit[] = [];

    const commonHouses = this.puzzle.getCommonHouses(locs);

    if (commonHouses.length == 0) return edits;

    // if (this.puzzle.id == "004.kropki") console.log([...locs]);

    if (this.puzzle.length == 9) {
      // edge
      for (const candidate of [3, 5, 6, 7, 9])
        if (this.puzzle.removeCandidate(locs._at(0), candidate))
          edits.push(new Edit(this.puzzle, locs._at(0), candidate, this));

      // center
      for (const candidate of [1, 3, 5, 6, 7, 8, 9])
        if (this.puzzle.removeCandidate(locs._at(1), candidate))
          edits.push(new Edit(this.puzzle, locs._at(1), candidate, this));

      // outsiders
      for (const house of commonHouses) {
        for (const loc of house) {
          if (loc.equals(locs._at(0))) continue;
          if (loc.equals(locs._at(1))) continue;
          if (loc.equals(locs._at(2))) continue;

          if (this.puzzle.removeCandidate(loc, 2))
            edits.push(new Edit(this.puzzle, loc, 2, this));
          if (this.puzzle.removeCandidate(loc, 4))
            edits.push(new Edit(this.puzzle, loc, 4, this));
        }
      }
    } else {
      // edge
      for (const candidate of [2, 3, 5, 6, 7])
        if (this.puzzle.removeCandidate(locs._at(0), candidate))
          edits.push(new Edit(this.puzzle, locs._at(0), candidate, this));

      // center
      for (const candidate of [1, 3, 4, 5, 6, 7])
        if (this.puzzle.removeCandidate(locs._at(1), candidate))
          edits.push(new Edit(this.puzzle, locs._at(1), candidate, this));

      // outsiders
      for (const house of commonHouses) {
        // console.log(cellChainLocs);
        // console.log(house);
        for (const loc of house) {
          if (loc.equals(locs._at(0))) continue;
          if (loc.equals(locs._at(1))) continue;
          if (loc.equals(locs._at(2))) continue;
          if (this.puzzle.removeCandidate(loc, 2))
            edits.push(new Edit(this.puzzle, loc, 2, this));
        }
      }
    }
    return edits;
  }
}
