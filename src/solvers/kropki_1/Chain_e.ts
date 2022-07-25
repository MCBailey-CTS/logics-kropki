import { Hash } from "../../../Hash";
import { IHash } from "../../../IHash";
import { _BaseKropkiVector } from "../../abstract/_BaseKropkiVector";
import { Edit } from "../../Edit";
import { IEdit } from "../../interfaces/IEdit";
import { IKropkiPuzzle } from "../../interfaces/IKropkiPuzzle";
import { IKropkiSolver } from "../../interfaces/IKropkiSolver";
import { Loc } from "../../Loc";


export class Chain_e implements IKropkiSolver {
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

    const chains: IHash<Loc>[] = [];

    chains.push(new Hash<Loc>([_base.right(2)]));
    chains.push(new Hash<Loc>([_base.up(2)]));
    chains.push(new Hash<Loc>([_base.left(2)]));
    chains.push(new Hash<Loc>([_base.down(2)]));

    return chains;
  }
  get expected_kropki_string(): string {
    return ".";
  }

  solveChain(locs: IHash<Loc>): IEdit[] {
    const edits: IEdit[] = [];

    for (const candidate of this.puzzle.getCellList(locs._at(0))) {
      const kropkiCandidates = [
        ...this.puzzle.getKropkiCandidates(candidate),
        candidate,
      ];

      const otherHash = this.puzzle.getCellList(locs._at(1));

      for (const t of kropkiCandidates)
        otherHash.delete(t);

      if (otherHash._size > 0)
        continue;

      if (!this.puzzle.removeCandidate(locs._at(0), candidate))
        continue;

      edits.push(new Edit(this.puzzle, locs._at(0), candidate, this));
    }

    return edits;
  }
}
