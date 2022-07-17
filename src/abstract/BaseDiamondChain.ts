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

  getKropkiString(puzzle:IKropkiPuzzle,chain:Loc[]):string{
    let str = "";

    for (let i = 0; i < chain.length - 1; i++) {
      const loc0 = chain[i];
      const loc1 = chain[i + 1];

      str += puzzle.getCellString(puzzle.getIntersection(loc0, loc1));
    }

    str += puzzle.getCellString(puzzle.getIntersection(chain[3], chain[0]));

    return str;
  }
}
