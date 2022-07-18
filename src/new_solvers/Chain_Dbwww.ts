import { Loc } from "../Loc";
import { IEdit } from "../interfaces/IEdit";
import { IKropkiPuzzle } from "../interfaces/IKropkiPuzzle";
import { BaseDiamondChain } from "../abstract/BaseDiamondChain";

export class Chain_Dbwww extends BaseDiamondChain {
  solve1(puzzle: IKropkiPuzzle, chain: Loc[]): IEdit[] {
    const edits: IEdit[] = [];

    edits.push(...this.remove(puzzle, chain[0], 4));
    edits.push(...this.remove(puzzle, chain[1], 4));

    return edits;
  }

  solve(puzzle: IKropkiPuzzle, chain: Loc[], reverse?: boolean): IEdit[] {
    if (typeof reverse == "undefined") reverse = true;

    const temp = [...chain];
    const chain1 = [...chain];

    for (let i = 0; i < chain.length; i++) {
      if (this.getKropkiString(puzzle, chain1) == "bwww")
        return this.solve1(puzzle, chain1);

      this.pop_push(chain1);
    }

    if (!reverse) return new Array<IEdit>();

    temp.reverse();

    return this.solve(puzzle, temp, false);
  }
}