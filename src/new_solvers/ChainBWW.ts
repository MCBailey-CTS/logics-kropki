// import { Loc } from "../Loc";
// import { IEdit } from "../interfaces/IEdit";
// import { IKropkiPuzzle } from "../interfaces/IKropkiPuzzle";
// import { BaseKropkiChain } from "../abstract/BaseKropkiChain";
// import { LocSet } from "../LocSet";
// import { Edit } from "../Edit";
// import { BaseExplicitChainLength } from "../abstract/BaseExplicitChainLength";

// export class ChainBWW extends BaseExplicitChainLength {
//   get chainLength(): number {
//     return 4;
//   }

//   solve(puzzle: IKropkiPuzzle, cellChainLocs: Loc[]): IEdit[] {
//     const edits: IEdit[] = [];

//     // if (cellChainLocs.length != 3) return edits;
//     // if (puzzle.id != "002.kropki") return edits;
//     const iLoc0 = puzzle.getIntersection(cellChainLocs[0], cellChainLocs[1]);

//     const iLoc1 = puzzle.getIntersection(cellChainLocs[1], cellChainLocs[2]);

//     const iLoc2 = puzzle.getIntersection(cellChainLocs[2], cellChainLocs[3]);

//     const iStr0 = puzzle.getCellString(iLoc0);

//     const iStr1 = puzzle.getCellString(iLoc1);

//     const iStr2 = puzzle.getCellString(iLoc2);

//     if (iStr0 + iStr1 + iStr2 != "bww") return edits;

//     const commonHouses = puzzle.getCommonHouses(cellChainLocs);

//     if (commonHouses.length == 0) return edits;

//     // console.log(cellChainLocs);
//     if (puzzle.removeCandidate(cellChainLocs[3], 3))
//       edits.push(new Edit(puzzle, cellChainLocs[3], 3, this));

//     if (puzzle.removeCandidate(cellChainLocs[3], 7))
//       edits.push(new Edit(puzzle, cellChainLocs[3], 7, this));

//     // let centerCandidates: Set<number>;
//     // let edgeCandidates: Set<number>;
//     // if (puzzle.length == 9) {
//     //   // edge
//     //   for (const candidate of [3, 5, 6, 7, 9])
//     //     if (puzzle.removeCandidate(cellChainLocs[0], candidate))
//     //       edits.push(new Edit(puzzle, cellChainLocs[0], candidate, this));
//     //   // center
//     //   for (const candidate of [1, 3, 5, 6, 7, 8, 9])
//     //     if (puzzle.removeCandidate(cellChainLocs[1], candidate))
//     //       edits.push(new Edit(puzzle, cellChainLocs[1], candidate, this));
//     //   // outsiders
//     //   for (const house of commonHouses) {
//     //     for (const loc of house) {
//     //       if (loc.equals(cellChainLocs[0])) continue;
//     //       if (loc.equals(cellChainLocs[1])) continue;
//     //       if (loc.equals(cellChainLocs[2])) continue;
//     //       if (puzzle.removeCandidate(loc, 2))
//     //         edits.push(new Edit(puzzle, loc, 2, this));
//     //       if (puzzle.removeCandidate(loc, 4))
//     //         edits.push(new Edit(puzzle, loc, 4, this));
//     //     }
//     //   }
//     // } else {
//     //   // edge
//     //   for (const candidate of [2, 3, 5, 6, 7])
//     //     if (puzzle.removeCandidate(cellChainLocs[0], candidate))
//     //       edits.push(new Edit(puzzle, cellChainLocs[0], candidate, this));
//     //   // center
//     //   for (const candidate of [1, 3, 4, 5, 6, 7])
//     //     if (puzzle.removeCandidate(cellChainLocs[1], candidate))
//     //       edits.push(new Edit(puzzle, cellChainLocs[1], candidate, this));
//     //   // outsiders
//     //   for (const house of commonHouses) {
//     //     // console.log(cellChainLocs);
//     //     // console.log(house);
//     //     for (const loc of house) {
//     //       if (loc.equals(cellChainLocs[0])) continue;
//     //       if (loc.equals(cellChainLocs[1])) continue;
//     //       if (loc.equals(cellChainLocs[2])) continue;
//     //       if (puzzle.removeCandidate(loc, 2))
//     //         edits.push(new Edit(puzzle, loc, 2, this));
//     //     }
//     //   }
//     // }
//     return edits;
//   }
// }
