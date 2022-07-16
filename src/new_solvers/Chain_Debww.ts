import { Loc } from "../Loc";
import { IEdit } from "../interfaces/IEdit";
import { IKropkiPuzzle } from "../interfaces/IKropkiPuzzle";
import { BaseDiamondChain } from "../abstract/BaseDiamondChain";
import { Edit } from "../Edit";

const BLACK_WHITE = [1, 5, 7, 9];
const WHITE_EMPTY = [3, 5, 7, 9];
const EMPTY_BLACK = [5, 7, 9];

const WHITE_WHITE = [1, 4, 6, 8, 9];

export class Chain_Debww extends BaseDiamondChain {
  // solve1(puzzle: IKropkiPuzzle, chain: Loc[]): IEdit[] {

  solve(puzzle: IKropkiPuzzle, chain: Loc[]): IEdit[] {
    const edits: IEdit[] = [];

    // const chain = [...chain];
    let str = "";

    for (let i = 0; i < chain.length - 1; i++) {
      const loc0 = chain[i];
      const loc1 = chain[i + 1];

      str += puzzle.getCellString(puzzle.getIntersection(loc0, loc1));
    }

    str += puzzle.getCellString(puzzle.getIntersection(chain[3], chain[0]));

    let blackWhite: Loc;
    let whiteWhite: Loc;
    let whiteEmpty: Loc;
    let emptyBlack: Loc;

    switch (str) {
      case "ww.b":
        blackWhite = chain[0]; // top left
        whiteWhite = chain[1]; // top right
        whiteEmpty = chain[2]; // bottom right
        emptyBlack = chain[3]; // bottom left
        break;
      case "b.ww":
        blackWhite = chain[0]; // top left
        whiteWhite = chain[3]; // top right
        whiteEmpty = chain[2]; // bottom right
        emptyBlack = chain[1]; // bottom left

        break;
      case "bww.":
        blackWhite = chain[1]; // top right
        whiteWhite = chain[2]; // bottom right
        whiteEmpty = chain[3]; // bottom left 
        emptyBlack = chain[0]; // top left
        break;
      case ".wwb":

      case ".bww":
      case "wwb.":

      case "bww.":
      case "w.bw":
      case "wb.w":
        console.log(
          `${puzzle.id} '${str}' == ${chain[0]}${chain[1]}${chain[2]}${chain[3]}`
        );

        return edits;
      default:
        // console.log(`unknown ${str}`);

        return edits;
      // default:
      //   return edits;
    }

    // black -> white
    for (const candidate of BLACK_WHITE)
      if (puzzle.removeCandidate(blackWhite, candidate))
        edits.push(new Edit(puzzle, blackWhite, candidate, this));

    // // white -> white
    for (const candidate of WHITE_WHITE)
      if (puzzle.removeCandidate(whiteWhite, candidate))
        edits.push(new Edit(puzzle, whiteWhite, candidate, this));

    // white -> empty
    for (const candidate of WHITE_EMPTY)
      if (puzzle.removeCandidate(whiteEmpty, candidate))
        edits.push(new Edit(puzzle, whiteEmpty, candidate, this));

    // empty -> black
    for (const candidate of EMPTY_BLACK)
      if (puzzle.removeCandidate(emptyBlack, candidate))
        edits.push(new Edit(puzzle, emptyBlack, candidate, this));

    return edits;
  }

  solveExplicit(
    puzzle: IKropkiPuzzle,
    chain: Loc[],
    ...indexes: number[]
  ): IEdit[] {
    const edits: IEdit[] = [];
    for (const candidate of [1, 3, 6])
      for (const loc of [
        chain[indexes[0]],
        chain[indexes[1]],
        chain[indexes[2]],
      ])
        if (puzzle.removeCandidate(loc, candidate))
          edits.push(new Edit(puzzle, loc, candidate, this));

    return edits;
  }
}
