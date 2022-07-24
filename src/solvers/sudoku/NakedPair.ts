import { IHash } from "../../../IHash";
import { _BaseKropkiChain } from "../../abstract/_BaseKropkiChain";
import { Edit } from "../../Edit";
import { IEdit } from "../../interfaces/IEdit";
import { IKropkiPuzzle } from "../../interfaces/IKropkiPuzzle";
import { Loc } from "../../Loc";
import { NewTechniques } from "../../NewTechniques";

export class NakedPair extends _BaseKropkiChain {
  solve(cellChainLocs: Loc[]): IEdit[] {
    const edits: IEdit[] = [];

    if (
      NewTechniques.solveSudokuNakedPairLocs(
        this.puzzle.grid,
        this.puzzle.length,
        cellChainLocs
      )
    )
      edits.push(new Edit(this.puzzle, new Loc(0, 0), 0, this));

    return edits;
  }

  findChains(): IHash<Loc>[] {
    const chains: IHash<Loc>[] = [];

    for (const house of this.puzzle.getHouses()) chains.push(house);

    return chains;
  }
}
