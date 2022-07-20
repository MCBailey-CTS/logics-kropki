import { _BaseDiamondChain } from "../abstract/_BaseDiamondChain";
import { IEdit } from "../interfaces/IEdit";
import { IKropkiPuzzle } from "../interfaces/IKropkiPuzzle";
import { Loc } from "../Loc";

export class Chain_Dbbww extends _BaseDiamondChain {
  get expectedKropkiString(): string {
    return "bbww";
  }

  solve1(puzzle: IKropkiPuzzle, chain: Loc[]): IEdit[] {
    const edits: IEdit[] = [];

    if (
      puzzle.getCellSet(chain[0]).has(1) &&
      !puzzle.getCellSet(chain[2]).has(1)
    )
      edits.push(...this.remove(puzzle, chain[0], 1));

    if (
      puzzle.getCellSet(chain[2]).has(1) &&
      !puzzle.getCellSet(chain[0]).has(1)
    )
      edits.push(...this.remove(puzzle, chain[2], 1));

    return edits;
  }
}
