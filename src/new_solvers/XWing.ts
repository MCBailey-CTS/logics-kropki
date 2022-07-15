import { Loc } from "../Loc";
import { IEdit } from "../interfaces/IEdit";
import { IKropkiPuzzle } from "../interfaces/IKropkiPuzzle";
import { BaseKropkiChain } from "../abstract/BaseKropkiChain";
import { LocSet } from "../LocSet";
import { Edit } from "../Edit";

// export class XWing extends BaseKropkiChain {
//   findChains(puzzle: IKropkiPuzzle): Loc[][] {
//     const chains: Loc[][] = [];

//     for (let i = 0; i < puzzle.length - 1; i++) {
//       //   const row0 = puzzle.getRowHouse(new Loc(i * 2, 0));

//       //   const row1 = puzzle.getRowHouse(new Loc((i + 1) * 2, 0));

//       const row0 = puzzle.getColHouse(new Loc(0, i * 2));

//       const row1 = puzzle.getColHouse(new Loc(0, (i + 1) * 2));

//       chains.push([...row0, ...row1]);
//     }

//     return chains;
//   }

//   solve(puzzle: IKropkiPuzzle, cellChainLocs: Loc[]): IEdit[] {
//     const row0 = cellChainLocs.splice(cellChainLocs.length / 2);
//     const row1 = cellChainLocs;

//     // console.log(row0);
//     // console.log(row1);
//     // console.log("//////////");

//     const edits: IEdit[] = [];

//     // return edits;

//     for (const candidate of puzzle.expectedCandidates) {
//       const row0Set = new Set<number>();
//       const row1Set = new Set<number>();

//       const columns = new Set<number>();

//       for (let i = 0; i < puzzle.length; i++) {
//         if (puzzle.getCellSet(row0[i]).has(candidate)) row0Set.add(i);

//         if (puzzle.getCellSet(row1[i]).has(candidate)) row1Set.add(i);
//       }

//       if (row0Set.size != 2) continue;

//       if (row0Set.size != row1Set.size) continue;

//       const row0Locs = [...row0Set].map((index) => {
//         return row0[index];
//       });

//       const row1Locs = [...row1Set].map((index) => {
//         return row1[index];
//       });

//       for (const loc of [...row0Locs, ...row1Locs]) columns.add(loc.col);

//       if (columns.size != 2) continue;

//       //   console.log("here");

//       console.log(row0Locs);
//       console.log(row1Locs);

//       console.log("/////");

//       //   if()

//       //   console.log(`${row0Set.size} ${row1Set.size}`);

//       //   if()

//       //   const indexes = [...row0Set];

//       //   console.log(indexes);

//       //   console.log(`${cellChainLocs[indexes[0]]} ${cellChainLocs[indexes[1]]}`);

//       //   if (
//       //     !indexes.every((i) => {
//       //       return row1Set.has(i);
//       //     })
//       //   )
//       //     continue;
//     }

//     // bool edited = false;
//     // foreach (int candidate in puzzle.DefaultCandidates())
//     // {
//     //     for (int rowIndex0 = 0; rowIndex0 < puzzle.length - 1; rowIndex0++)
//     //     {
//     //         Loc[] locs0 = Loc.GetRowLocs(puzzle.length, rowIndex0).Where(loc => puzzle[loc].Contains(candidate)).ToArray();
//     //         if (locs0.Length != WING_LENGTH)
//     //             continue;
//     //         for (int rowIndex1 = rowIndex0 + 1; rowIndex1 < puzzle.length; rowIndex1++)
//     //         {
//     //             Loc[] locs1 = Loc.GetRowLocs(puzzle.length, rowIndex1).Where(loc => puzzle[loc].Contains(candidate)).ToArray();
//     //             if (locs1.Length != WING_LENGTH)
//     //                 continue;
//     //             ISet<int> colIndexes = new HashSet<int>(locs0.Select(t => t.Col).Concat(locs1.Select(t => t.Col)));
//     //             if (colIndexes.Count != WING_LENGTH)
//     //                 continue;
//     //             int col0 = colIndexes.First();
//     //             int col1 = colIndexes.Last();
//     //             for (int row = 0; row < puzzle.length; row++)
//     //             {
//     //                 if (new HashSet<int>(new[] { rowIndex0, rowIndex1 }).Contains(row))
//     //                     continue;
//     //                 Loc loc0 = new Loc(row, col0);
//     //                 Loc loc1 = new Loc(row, col1);
//     //                 edited = puzzle[loc0]._Remove(candidate) || edited;
//     //                 edited = puzzle[loc1]._Remove(candidate) || edited;
//     //             }
//     //         }
//     //     }
//     // }
//     // return edited;

//     // if (puzzle.length != cellChainLocs.length) return edits;
//     // // const map = new Map<number,Set<number>>();
//     // // for(const )
//     // for (const candidate0 of puzzle.expectedCandidates)
//     //   for (const candidate1 of puzzle.expectedCandidates) {
//     //     if (candidate0 == candidate1) continue;
//     //     const set0 = new Set<number>();
//     //     const set1 = new Set<number>();
//     //     for (let i = 0; i < cellChainLocs.length; i++) {
//     //       if (puzzle.getCellSet(cellChainLocs[i]).has(candidate0)) set0.add(i);
//     //       if (puzzle.getCellSet(cellChainLocs[i]).has(candidate1)) set1.add(i);
//     //     }
//     //     if (set0.size != 2) continue;
//     //     if (set0.size != set1.size) continue;
//     //     const indexes = [...set0];
//     //     if (
//     //       !indexes.every((index) => {
//     //         return set1.has(index);
//     //       })
//     //     )
//     //       continue;
//     //     // console.log(
//     //     //   `${cellChainLocs[indexes[0]]} ${cellChainLocs[indexes[1]]}`
//     //     // );
//     //     for (const candidate of puzzle.expectedCandidates) {
//     //       if (candidate == candidate0 || candidate == candidate1) continue;
//     //       if (puzzle.removeCandidate(cellChainLocs[indexes[0]], candidate))
//     //         edits.push(
//     //           new Edit(puzzle, cellChainLocs[indexes[0]], candidate, this)
//     //         );
//     //       if (puzzle.removeCandidate(cellChainLocs[indexes[1]], candidate))
//     //         edits.push(
//     //           new Edit(puzzle, cellChainLocs[indexes[1]], candidate, this)
//     //         );
//     //     }
//     //   }
//     return edits;
//   }
// }

export class XWing extends BaseKropkiChain {
  findChains(puzzle: IKropkiPuzzle): Loc[][] {
    const chains: Loc[][] = [];

    const col0 = puzzle.getColHouse(new Loc(0, 4));

    const col1 = puzzle.getColHouse(new Loc(0, 12));

    chains.push([...col0, ...col1]);

    return chains;
  }

  solve(puzzle: IKropkiPuzzle, cellChainLocs: Loc[]): IEdit[] {
    const edits: IEdit[] = [];

    // console.log(cellChainLocs);

    const col0 = cellChainLocs.splice(0, cellChainLocs.length / 2);

    const col1 = cellChainLocs;

    // for (const candidate of puzzle.expectedCandidates)
    if (
      col0.every((loc) => {
        return col0[0].col == loc.col;
      }) &&
      col1.every((loc) => {
        return col1[0].col == loc.col;
      })
    ) {
      for (const candidate of puzzle.expectedCandidates) {
        const col0Locs = puzzle.getColLocsWithCandidate(col0[0], candidate);
        const col1Locs = puzzle.getColLocsWithCandidate(col1[0], candidate);

        const allLocs = [...col0Locs, ...col1Locs];

        const xwingSet = new LocSet(allLocs);

        if (xwingSet.size != 4) continue;

        const rowIndexes = new Set<number>(
          allLocs.map((loc) => {
            return loc.row;
          })
        );

        const colIndexes = new Set<number>(
          allLocs.map((loc) => {
            return loc.col;
          })
        );

        if (colIndexes.size != 2 || rowIndexes.size != 2) return edits;

        for (const locs of [...rowIndexes].map((index) => {
          return puzzle.getRowHouse(new Loc(index, 0));
        })) {
          //   console.log(locs);
          for (const loc of locs)
            if (!xwingSet.has(loc) && puzzle.removeCandidate(loc, candidate))
              edits.push(new Edit(puzzle, loc, candidate, this));
        }
      }
    }

    return edits;
  }
}
