import { IEdit } from "../interfaces/IEdit";
import { IKropkiPuzzle } from "../interfaces/IKropkiPuzzle";
import { Loc } from "../Loc";
import { IKropkiChain } from "../solvers/IKropkiChain";

export abstract class _BaseKropkiSudokuSolver implements IKropkiChain {
  get id(): string {
    return this.constructor.name;
  }

  findChains(puzzle: IKropkiPuzzle): Loc[][] {
    const chains: Loc[][] = [];

    for (const house of puzzle.getHouses()) chains.push(house);

    return chains;
  }

  abstract solve(puzzle: IKropkiPuzzle, cellChainLocs: Loc[]): IEdit[];
}
