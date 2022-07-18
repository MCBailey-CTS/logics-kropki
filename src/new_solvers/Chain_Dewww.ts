import { Loc } from "../Loc";
import { IEdit } from "../interfaces/IEdit";
import { IKropkiPuzzle } from "../interfaces/IKropkiPuzzle";
import { BaseDiamondChain } from "../abstract/BaseDiamondChain";

export class Chain_Dewww extends BaseDiamondChain {
  solve1(
    puzzle: IKropkiPuzzle,
    blackWhite: Loc | undefined,
    whiteWhite: Loc | undefined,
    whiteEmpty: Loc | undefined,
    emptyBlack: Loc | undefined
  ): IEdit[] {
    const edits: IEdit[] = [];

    // // black -> white
    // if (blackWhite)
    //   edits.push(...this.remove(puzzle, blackWhite, ...BLACK_WHITE));
    // // white -> white
    // if (whiteWhite)
    //   edits.push(...this.remove(puzzle, whiteWhite, ...WHITE_WHITE));
    // // white -> empty
    // if (whiteEmpty)
    //   edits.push(...this.remove(puzzle, whiteEmpty, ...WHITE_EMPTY));
    // // empty -> black
    // if (emptyBlack)
    //   edits.push(...this.remove(puzzle, emptyBlack, ...EMPTY_BLACK));
    return edits;
  }

  solve(puzzle: IKropkiPuzzle, chain: Loc[]): IEdit[] {
    const edits: IEdit[] = [];
    let str = this.getKropkiString(puzzle, chain);

    let item: Loc | undefined;

    const chain1 = [...chain];

    switch (str) {
      case "ww.w":
        edits.push(...this.remove(puzzle, chain[0], 1, 9));
        edits.push(...this.remove(puzzle, chain[1], 1, 9));
        edits.push(...this.remove(puzzle, chain[2], 3));
        edits.push(...this.remove(puzzle, chain[3], 3));

        return edits;

      case "www.":
      case ".www":
      case "w.ww":
        console.log(`${puzzle.id} ${this.id} == ${str}`);

        break;

      default:
        break; // const temp = [...chain];

      // temp.reverse();
      // return this.solveReverse(puzzle, temp);
    }

    return new Array<IEdit>();
  }

  solveReverse(puzzle: IKropkiPuzzle, chain: Loc[]): IEdit[] {
    let str = this.getKropkiString(puzzle, chain);

    let item: Loc | undefined;

    const chain1 = [...chain];

    switch (str) {
      case "ww.b":
        return this.solve1(puzzle, chain1[0], chain1[1], chain1[2], chain1[3]);
      case "bww.":
        item = chain1.shift();

        if (typeof item == "undefined") throw Error();

        chain1.push(item);

        return this.solve1(puzzle, chain1[0], chain1[1], chain1[2], chain1[3]);

      case ".bww":
        item = chain1.shift();

        if (typeof item == "undefined") throw Error();

        chain1.push(item);

        item = chain1.shift();

        if (typeof item == "undefined") throw Error();

        chain1.push(item);

        return this.solve1(puzzle, chain1[0], chain1[1], chain1[2], chain1[3]);

      case "w.bw":
        item = chain1.shift();

        if (typeof item == "undefined") throw Error();

        chain1.push(item);

        item = chain1.shift();

        if (typeof item == "undefined") throw Error();

        chain1.push(item);

        item = chain1.shift();

        if (typeof item == "undefined") throw Error();

        chain1.push(item);

        return this.solve1(puzzle, chain1[0], chain1[1], chain1[2], chain1[3]);

      default:
        return new Array<IEdit>();
    }
  }
}
