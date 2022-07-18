import { _BaseKropkiChain } from "../abstract/_BaseKropkiChain";
import { Edit } from "../Edit";
import { IEdit } from "../interfaces/IEdit";
import { IKropkiPuzzle } from "../interfaces/IKropkiPuzzle";
import { Loc } from "../Loc";
import { LocSet } from "../LocSet";


export class XWing extends _BaseKropkiChain {
  findChains(puzzle: IKropkiPuzzle): Loc[][] {
    const chains: Loc[][] = [];

    if (puzzle.length < 7) return chains;

    for (let r = 0; r < puzzle.length - 1; r++)
      for (let rr = r + 1; rr < puzzle.length; rr++) {
        chains.push([
          ...puzzle.getRowHouse(new Loc(r * 2, 0)),
          ...puzzle.getRowHouse(new Loc(rr * 2, 0)),
        ]);
        chains.push([
          ...puzzle.getColHouse(new Loc(0, r * 2)),
          ...puzzle.getColHouse(new Loc(0, rr * 2)),
        ]);
      }

    // const col0 = puzzle.getColHouse(new Loc(0, 4));

    // const col1 = puzzle.getColHouse(new Loc(0, 12));

    // chains.push([...col0, ...col1]);

    return chains;
  }

  solve(puzzle: IKropkiPuzzle, cellChainLocs: Loc[]): IEdit[] {
    const edits: IEdit[] = [];

    const house0 = cellChainLocs.splice(0, cellChainLocs.length / 2);

    const house1 = cellChainLocs;
    if (
      house0.every((loc) => {
        return house0[0].col == loc.col;
      }) &&
      house1.every((loc) => {
        return house1[0].col == loc.col;
      })
    ) {
      for (const candidate of puzzle.expectedCandidates) {
        const house0Locs = puzzle.getColLocsWithCandidate(house0[0], candidate);
        const house1Locs = puzzle.getColLocsWithCandidate(house1[0], candidate);

        const allLocs = [...house0Locs, ...house1Locs];

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
          for (const loc of locs)
            if (!xwingSet.has(loc) && puzzle.removeCandidate(loc, candidate))
              edits.push(new Edit(puzzle, loc, candidate, this));
        }
      }
    }

    if (
      house0.every((loc) => {
        return house0[0].row == loc.row;
      }) &&
      house1.every((loc) => {
        return house1[0].row == loc.row;
      })
    ) {
      for (const candidate of puzzle.expectedCandidates) {
        const house0Locs = puzzle.getRowLocsWithCandidate(house0[0], candidate);
        const house1Locs = puzzle.getRowLocsWithCandidate(house1[0], candidate);

        const allLocs = [...house0Locs, ...house1Locs];

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

        for (const locs of [...colIndexes].map((index) => {
          return puzzle.getRowHouse(new Loc(0, index));
        })) {
          for (const loc of locs)
            if (!xwingSet.has(loc) && puzzle.removeCandidate(loc, candidate))
              edits.push(new Edit(puzzle, loc, candidate, this));
        }
      }
    }

    return edits;
  }
}
