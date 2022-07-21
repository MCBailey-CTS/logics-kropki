// import { _BaseKropkiChain } from "../abstract/_BaseKropkiChain";
// import { _BaseKropkiSudokuSolver } from "../abstract/_BaseKropkiSudokuSolver";
// import { Edit } from "../Edit";
// import { IEdit } from "../interfaces/IEdit";
// import { IKropkiPuzzle } from "../interfaces/IKropkiPuzzle";
// import { Loc } from "../Loc";

// export class HiddenTriple extends _BaseKropkiSudokuSolver {
//   static isSubset(topset: Set<number>, subset: Set<number>): boolean {
//     // if (topset.size == 0 && subset.size == 0) return false;

//     // if (subset.size > topset.size) return false;

//     for (const item of subset) if (!topset.has(item)) return false;

//     return true;
//   }

//   solve(puzzle: IKropkiPuzzle, cellChainLocs: Loc[]): IEdit[] {
//     const edits: IEdit[] = [];

//     if (puzzle.length != cellChainLocs.length) return edits;

//     for (const candidate0 of puzzle.expectedCandidates)
//       for (const candidate1 of puzzle.expectedCandidates)
//         for (const candidate2 of puzzle.expectedCandidates) {
//           const hiddenSet = new Set<number>([
//             candidate0,
//             candidate1,
//             candidate2,
//           ]);

//           const set0 = new Set<number>();

//           const set1 = new Set<number>();

//           const set2 = new Set<number>();

//           for (let i = 0; i < cellChainLocs.length; i++) {
//             if (puzzle.getCellList(cellChainLocs[i]).has(candidate0))
//               set0.add(i);

//             if (puzzle.getCellList(cellChainLocs[i]).has(candidate1))
//               set1.add(i);

//             if (puzzle.getCellList(cellChainLocs[i]).has(candidate2))
//               set2.add(i);
//           }

//           const hiddenIndexesSet = new Set<number>([...set0, ...set1, ...set2]);

//           if (hiddenIndexesSet.size != 3) continue;

//           //   console.log(hiddenIndexesSet);

//           if (!HiddenTriple.isSubset(hiddenIndexesSet, set0)) continue;
//           if (!HiddenTriple.isSubset(hiddenIndexesSet, set1)) continue;
//           if (!HiddenTriple.isSubset(hiddenIndexesSet, set2)) continue;

//           //   if (set0.size != 2) continue;

//           //   if (set0.size != set1.size) continue;

//           //   const indexes = [...set0];

//           //   if (
//           //     !indexes.every((index) => {
//           //       return set1.has(index);
//           //     })
//           //   )
//           //     continue;

//           // console.log(
//           //   `${cellChainLocs[indexes[0]]} ${cellChainLocs[indexes[1]]}`
//           // );
//           for (const candidate of puzzle.expectedCandidates) {
//             if (hiddenSet.has(candidate)) continue;
//             for (const index of hiddenIndexesSet)
//               if (puzzle.removeCandidate(cellChainLocs[index], candidate))
//                 edits.push(
//                   new Edit(puzzle, cellChainLocs[index], candidate, this)
//                 );

//             // if (puzzle.removeCandidate(cellChainLocs[indexes[1]], candidate))
//             //   edits.push(
//             //     new Edit(puzzle, cellChainLocs[indexes[1]], candidate, this)
//             //   );
//           }
//         }

//     return edits;
//   }
// }
