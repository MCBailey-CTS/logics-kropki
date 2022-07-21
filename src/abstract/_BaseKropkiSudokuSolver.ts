import { IHash } from "../../IHash";
import { IKropkiPuzzle } from "../interfaces/IKropkiPuzzle";
import { Loc } from "../Loc";
import { _BaseKropkiChain } from "./_BaseKropkiChain";

export abstract class _BaseKropkiSudokuSolver extends _BaseKropkiChain {
  findChains(puzzle: IKropkiPuzzle): IHash<Loc>[] {
    const chains: IHash<Loc>[] = [];

    for (const house of puzzle.getHouses()) chains.push(house);

    return chains;
  }
}
