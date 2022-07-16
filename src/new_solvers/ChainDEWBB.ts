import { Loc } from "../Loc";
import { IEdit } from "../interfaces/IEdit";
import { IKropkiPuzzle } from "../interfaces/IKropkiPuzzle";
import { BaseDiamondChain } from "../abstract/BaseDiamondChain";
import { Edit } from "../Edit";

export class ChainDEWBB extends BaseDiamondChain {
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
      case "w.bb":
        black_white = chain[0];
        white_empty = chain[1];
        empty_black = chain[2];
        black_black = chain[3];
        break;
      case ".bbw":
        black_white = chain[3];
        white_empty = chain[0];
        empty_black = chain[1];
        black_black = chain[2];
        break;
      case "wbb.": // reverse
        const reverse = [...chain];

        reverse.reverse();

        edits.push(...this.solve(puzzle, reverse));
        return edits;

      case "b.wb": //
        for (const candidate of [1, 3, 6])
          for (const loc of [chain[3], chain[0], chain[1]])
            if (puzzle.removeCandidate(loc, candidate))
              edits.push(new Edit(puzzle, loc, candidate, this));

        return edits;
      case "bbw.": //
        for (const candidate of [1, 3, 6])
          for (const loc of [chain[0], chain[1], chain[2]])
            if (puzzle.removeCandidate(loc, candidate))
              edits.push(new Edit(puzzle, loc, candidate, this));

        return edits;
      case ".wbb": //
        for (const candidate of [1, 3, 6])
          for (const loc of [chain[0], chain[3], chain[2]])
            if (puzzle.removeCandidate(loc, candidate))
              edits.push(new Edit(puzzle, loc, candidate, this));

        return edits;
      case "bw.b":
      case "bb.w":
        console.log(`unknown ${str}`);

        return edits;
      default:
        return edits;
    }

    for (const candidate of [1, 3, 6])
      for (const loc of [black_white, black_black, empty_black])
        if (puzzle.removeCandidate(loc, candidate))
          edits.push(new Edit(puzzle, loc, candidate, this));

    return edits;
  }

  // solveExplicit(puzzle: IKropkiPuzzle, locs: Loc[]): IEdit[] {
  //   const edits: IEdit[] = [];

  //   const empty_white = locs[1];
  //   const white_black = locs[2];
  //   const black_black = locs[3];
  //   const black_empty = locs[0];

  //   // puzzle.removeCandidate(temp[0], 1);
  //   for (const candidate of [3, 6])
  //     for (const corner of [white_black, black_black, black_empty])
  //       if (puzzle.removeCandidate(corner, candidate))
  //         edits.push(new Edit(puzzle, corner, candidate, this));
  //   // puzzle.removeCandidate(white_black, 6);

  //   // puzzle.removeCandidate(black_black, 3);
  //   // puzzle.removeCandidate(black_black, 6);

  //   // puzzle.removeCandidate(black_empty, 3);
  //   // puzzle.removeCandidate(black_empty, 6);

  //   return edits;
  // }
}
