import { IEdit } from "../interfaces/IEdit";
import { IKropkiPuzzle } from "../interfaces/IKropkiPuzzle";
import { Loc } from "../Loc";
import { IKropkiChain } from "../solvers/IKropkiChain";
import { _BaseKropkiChain } from "./_BaseKropkiChain";

export abstract class _BaseKropkiSudokuSolver extends _BaseKropkiChain {
  findChains(puzzle: IKropkiPuzzle): Loc[][] {
    const chains: Loc[][] = [];

    for (const house of puzzle.getHouses()) chains.push(house);

    return chains;
  }

  // abstract solve(puzzle: IKropkiPuzzle, cellChainLocs: Loc[]): IEdit[];
}
