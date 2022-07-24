import { IHash } from "../../../IHash";
import { _BaseKropkiChain } from "../../abstract/_BaseKropkiChain";
import { Edit } from "../../Edit";
import { IEdit } from "../../interfaces/IEdit";
import { IKropkiPuzzle } from "../../interfaces/IKropkiPuzzle";
import { IKropkiSolver } from "../../interfaces/IKropkiSolver";
import { Loc } from "../../Loc";

export class HiddenPair implements IKropkiSolver {
  solve(cellChainLocs: IHash<Loc>): IEdit[] {
    const edits: IEdit[] = [];

    if (this.puzzle.length != cellChainLocs.length) return edits;

    // const map = new Map<number,Set<number>>();
    // for(const )
    for (const candidate0 of this.puzzle.expectedCandidates)
      for (const candidate1 of this.puzzle.expectedCandidates) {
        if (candidate0 == candidate1) continue;

        const set0 = new Set<number>();

        const set1 = new Set<number>();

        for (let i = 0; i < cellChainLocs.length; i++) {
          if (this.puzzle.getCellList(cellChainLocs._at(i)).has(candidate0))
            set0.add(i);

          if (this.puzzle.getCellList(cellChainLocs._at(i)).has(candidate1))
            set1.add(i);
        }

        if (set0.size != 2) continue;

        if (set0.size != set1.size) continue;

        const indexes = [...set0];

        if (
          !indexes.every((index) => {
            return set1.has(index);
          })
        )
          continue;

        // console.log(
        //   `${cellChainLocs[indexes[0]]} ${cellChainLocs[indexes[1]]}`
        // );
        for (const candidate of this.puzzle.expectedCandidates) {
          if (candidate == candidate0 || candidate == candidate1) continue;

          if (
            this.puzzle.removeCandidate(
              cellChainLocs._at(indexes[0]),
              candidate
            )
          )
            edits.push(
              new Edit(
                this.puzzle,
                cellChainLocs._at(indexes[0]),
                candidate,
                this
              )
            );

          if (
            this.puzzle.removeCandidate(
              cellChainLocs._at(indexes[1]),
              candidate
            )
          )
            edits.push(
              new Edit(
                this.puzzle,
                cellChainLocs._at(indexes[1]),
                candidate,
                this
              )
            );
        }
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
