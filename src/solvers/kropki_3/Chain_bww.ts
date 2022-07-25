import { Hash } from "../../../Hash";
import { IHash } from "../../../IHash";
import { _BaseKropkiVector } from "../../abstract/_BaseKropkiVector";
import { Edit } from "../../Edit";
import { IEdit } from "../../interfaces/IEdit";
import { IKropkiPuzzle } from "../../interfaces/IKropkiPuzzle";
import { IKropkiSolver } from "../../interfaces/IKropkiSolver";
import { Loc } from "../../Loc";

export class Chain_bww implements IKropkiSolver {
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
      [_base.right(2), _base.right(2), _base.right(2)],
      [_base.left(2), _base.left(2), _base.left(2)],
      [_base.down(2), _base.down(2), _base.down(2)],
      [_base.up(2), _base.up(2), _base.up(2)],
    ].map((locs) => new Hash<Loc>(locs));
  }

  get expected_kropki_string(): string {
    return "bww";
  }

  solveChain(chain: IHash<Loc>): IEdit[] {
    const edits: IEdit[] = [];

    if (this.puzzle.getCellList(chain._at(0)).has(1)) return edits;

    if (!this.puzzle.removeCandidate(chain._at(1), 2)) return edits;

    return [new Edit(this.puzzle, chain._at(1), 2, this)];
  }
}
