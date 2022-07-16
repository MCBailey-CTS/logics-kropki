import { Loc } from "../Loc";
import { IEdit } from "../interfaces/IEdit";
import { IKropkiPuzzle } from "../interfaces/IKropkiPuzzle";
import { BaseDiamondChain } from "../abstract/BaseDiamondChain";
import { Edit } from "../Edit";

export class Chain_Debww extends BaseDiamondChain {
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

    let black_white: Loc;
    let white_empty: Loc;
    let empty_black: Loc;
    let black_black: Loc;

    switch (str) {
      case "ww.b":
        {
          const blackWhite = chain[0]; // top left
          const whiteWhite = chain[1]; // top right
          const whiteEmpty = chain[2]; // bottom right
          const emptyBlack = chain[3]; // bottom left

          // black -> white
          for (const candidate of [1, 5, 7, 9])
            if (puzzle.removeCandidate(blackWhite, candidate))
              edits.push(new Edit(puzzle, blackWhite, candidate, this));

          // white -> white
          for (const candidate of [1, 4, 6, 8, 9])
            if (puzzle.removeCandidate(whiteWhite, candidate))
              edits.push(new Edit(puzzle, whiteWhite, candidate, this));

          // white -> empty
          for (const candidate of [3, 5, 7, 9])
            if (puzzle.removeCandidate(whiteEmpty, candidate))
              edits.push(new Edit(puzzle, whiteEmpty, candidate, this));

          // empty -> black
          for (const candidate of [5, 7, 9])
            if (puzzle.removeCandidate(emptyBlack, candidate))
              edits.push(new Edit(puzzle, emptyBlack, candidate, this));
        }

        return edits;

      case "b.ww":
        {
          const blackWhite = chain[0]; // top left
          const whiteWhite = chain[3]; // top right
          // const whiteEmpty = chain[0]; // bottom right
          // const emptyBlack = chain[3]; // bottom left

          // black -> white
          for (const candidate of [1, 5, 7, 9])
            if (puzzle.removeCandidate(blackWhite, candidate))
              edits.push(new Edit(puzzle, blackWhite, candidate, this));

          // white -> white
          for (const candidate of [1, 4, 6, 8, 9])
            if (puzzle.removeCandidate(whiteWhite, candidate))
              edits.push(new Edit(puzzle, whiteWhite, candidate, this));

          // white -> empty
          // for (const candidate of [3, 5, 7, 9])
          //   if (puzzle.removeCandidate(whiteEmpty, candidate))
          //     edits.push(new Edit(puzzle, whiteEmpty, candidate, this));

          // empty -> black
          // for (const candidate of [5, 7, 9])
          //   if (puzzle.removeCandidate(emptyBlack, candidate))
          //     edits.push(new Edit(puzzle, emptyBlack, candidate, this));
        }

        return edits;
      case ".wwb":

      // return edits;
      // for (const candidate of [1, 3, 5, 6, 7, 9])
      //   if (puzzle.removeCandidate(chain[0], candidate))
      //     edits.push(new Edit(puzzle, chain[0], candidate, this));
      // return edits;
      case ".bww":
      case "wwb.":

      case "bww.":
      case "w.bw":
      case "wb.w":
        console.log(`${str} == ${chain[0]}${chain[1]}${chain[2]}${chain[3]}`);

        return edits;
      default:
        // console.log(`unknown ${str}`);

        return edits;
      // default:
      //   return edits;
    }

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
