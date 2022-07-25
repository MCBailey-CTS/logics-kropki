import { Hash } from "../../../Hash";
import { IHash } from "../../../IHash";
import { _BaseKropkiVector } from "../../abstract/_BaseKropkiVector";
import { Edit } from "../../Edit";

import { IEdit } from "../../interfaces/IEdit";
import { IKropkiPuzzle } from "../../interfaces/IKropkiPuzzle";
import { IKropkiSolver } from "../../interfaces/IKropkiSolver";
import {
  east_north_west,
  east_south_west,
  Loc,
  north_east_south,
  north_west_south,
  south_east_north,
  south_west_north,
  west_north_east,
  west_south_east,
} from "../../Loc";

export class Chain_Debwb implements IKropkiSolver {
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
    return [
      east_north_west,
      east_south_west,
      west_south_east,
      west_north_east,
      north_east_south,
      north_west_south,
      south_east_north,
      south_west_north,
    ].map((locs) => new Hash<Loc>(locs));
  }
  get expected_kropki_string(): string {
    return "wb.b";
  }

  solveChain(chain: IHash<Loc>): IEdit[] {
    const edits: IEdit[] = [];

    edits.push(...this.remove(chain._at(0), 1));
    edits.push(...this.remove(chain._at(1), 1));

    const hash0 = this.puzzle.getCellList(chain._at(0));
    const hash1 = this.puzzle.getCellList(chain._at(1));

    let explicit = [2, 3, 4];

    if (!hash0.is_subset_of(explicit) || !hash1.is_subset_of(explicit))
      return edits;

    for (const house of this.puzzle.getCommonHouses(
      new Hash<Loc>([chain._at(2), chain._at(3)])
    )) {
      for (const loc of house) {
        if (loc.equals(chain._at(2))) continue;
        if (loc.equals(chain._at(3))) continue;

        edits.push(...this.remove(loc, 6));
      }
    }

    return edits;
  }
}
