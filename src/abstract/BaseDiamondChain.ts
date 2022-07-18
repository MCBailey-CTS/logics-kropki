import { Loc } from "../Loc";
import { IKropkiPuzzle } from "../interfaces/IKropkiPuzzle";
import { BaseKropkiChain } from "./BaseKropkiChain";
import { IEdit } from "../interfaces/IEdit";

export abstract class BaseDiamondChain extends BaseKropkiChain {
  findChains(puzzle: IKropkiPuzzle): Loc[][] {
    const chains: Loc[][] = [];

    for (let r = 0; r < puzzle.length - 1; r++)
      for (let c = 0; c < puzzle.length - 1; c++) {
        const loc = new Loc(r * 2, c * 2);

        const temp = [loc, loc.right(2), loc.right(2).down(2), loc.down(2)];

        chains.push(temp);
      }

    return chains;
  }

  abstract get expectedKropkiString(): string;

  abstract solve1(puzzle: IKropkiPuzzle, chain: Loc[]): IEdit[];

  solve(puzzle: IKropkiPuzzle, chain: Loc[], reverse?: boolean): IEdit[] {
    if (typeof reverse == "undefined") reverse = true;

    const temp = [...chain];
    const chain1 = [...chain];

    for (let i = 0; i < chain.length; i++) {
      if (this.getKropkiString(puzzle, chain1) == this.expectedKropkiString)
        return this.solve1(puzzle, chain1);

      this.pop_push(chain1);
    }

    if (!reverse) return new Array<IEdit>();

    temp.reverse();

    return this.solve(puzzle, temp, false);
  }
}
