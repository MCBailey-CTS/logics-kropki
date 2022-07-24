import { IHash } from "../../../IHash";
import { _BaseKropkiChain } from "../../abstract/_BaseKropkiChain";
import { Edit } from "../../Edit";
import { IEdit } from "../../interfaces/IEdit";
import { IKropkiChain } from "../../interfaces/IKropkiChain";
import { IKropkiPuzzle } from "../../interfaces/IKropkiPuzzle";
import { IKropkiSolver } from "../../interfaces/IKropkiSolver";
import { Loc } from "../../Loc";


export class HiddenSingle implements IKropkiSolver {
  solve(cellChainLocs: IHash<Loc>): IEdit[] {
    const edits: IEdit[] = [];

    if (this.puzzle.length != cellChainLocs._length) return edits;

    const expected = [];

    for (let i = 1; i <= this.puzzle.length; i++) expected.push(i);

    for (const candidate of expected) {
      const indexes = [];

      for (let i = 0; i < cellChainLocs._length; i++)
        if (this.puzzle.getCellList(cellChainLocs._at(i)).has(candidate))
          indexes.push(i);

      if (indexes.length != 1) continue;

      //   console.log(cellChainLocs);
      const loc = cellChainLocs._at(indexes[0]);

      //   console.log(loc);
      const candidates = this.puzzle.getCellList(loc);

      if (candidates._length == 1) continue;

      for (const temp of candidates)
        if (temp != candidate && this.puzzle.removeCandidate(loc, temp))
          edits.push(new Edit(this.puzzle, loc, temp, this));
    }

    return edits;
  }

  findChains(): IHash<Loc>[] {
    const chains: IHash<Loc>[] = [];

    for (const house of this.puzzle.getHouses()) chains.push(house);

    return chains;
  }

  //////////////
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

  solvePuzzle(): IEdit[] {
    const edits: IEdit[] = [];

    for (const locs of this.findChains()) edits.push(...this.solve(locs));

    return edits;
  }

  get id(): string {
    return this.constructor.name;
  }


  getKropkiString(puzzle: IKropkiPuzzle, chain: IHash<Loc>): string {
    let str = "";

    for (let i = 0; i < chain._length - 1; i++) {
      const loc0 = chain._at(i);
      const loc1 = chain._at(i + 1);

      str += puzzle.getCellString(puzzle.getIntersection(loc0, loc1));
    }

    str += puzzle.getCellString(
      puzzle.getIntersection(chain._at(3), chain._at(0))
    );

    return str;
  }

  remove(loc: Loc, ...candidates: number[]): IEdit[] {
    const edits: IEdit[] = [];

    for (const candidate of candidates)
      if (this.puzzle.removeCandidate(loc, candidate))
        edits.push(new Edit(this.puzzle, loc, candidate, this));

    return edits;
  }

  pop_push(chain1: IHash<Loc>) {
    const item = chain1.shift();

    if (typeof item == "undefined") throw Error();

    chain1.push(item);
  }
  //////////
}
