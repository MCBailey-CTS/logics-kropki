import { IHash } from "../../../IHash";
import { _BaseKropkiChain } from "../../abstract/_BaseKropkiChain";
import { Edit } from "../../Edit";
import { IEdit } from "../../interfaces/IEdit";
import { Loc } from "../../Loc";


export class HiddenSingle extends _BaseKropkiChain {
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
}
