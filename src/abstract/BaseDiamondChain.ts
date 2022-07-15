import { Loc } from "../Loc";
import { IKropkiPuzzle } from "../interfaces/IKropkiPuzzle";
import { BaseKropkiChain } from "./BaseKropkiChain";


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
}
