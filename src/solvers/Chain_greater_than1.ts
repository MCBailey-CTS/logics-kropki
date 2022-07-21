import { _BaseKropkiVector } from "../abstract/_BaseKropkiVector";
import { Edit } from "../Edit";
import { IEdit } from "../interfaces/IEdit";
import { IFutoshikiPuzzle } from "../interfaces/IFutoshikiPuzzle";
import { IKropkiPuzzle } from "../interfaces/IKropkiPuzzle";
import { Loc } from "../Loc";
import { NewTechniques } from "../NewTechniques";
import { cellCandidates } from "../puzzles/KropkiPuzzle";

export class Chain_greater_than1 extends _BaseKropkiVector {
  get vector_chains(): Loc[][] {
    const _base = new Loc(0, 0);
    return [[_base.right(2)], [_base.up(2)], [_base.left(2)], [_base.down(2)]];
  }

  get expected_kropki_string(): string {
    return "v";
  }

  solveChain(puzzle: IKropkiPuzzle, locs: Loc[]): IEdit[] {
    const edits: IEdit[] = [];

    return edits;
    // const loc = locs[0];

    // const other = locs[1];

    // // console.log("here");

    // if (Chain_greater_than1.solveGreaterThan(puzzle, locs[0], locs[1]))
    //   edits.push(new Edit(puzzle, locs[0], 1, this));

    // const otherHash = puzzle.getCellSet(other);
    // for (const candidate of puzzle.getCellCandidates(loc)) {
    //   if (otherHash.has(candidate * 2)) continue;
    //   if (candidate % 2 == 0 && otherHash.has(candidate / 2)) continue;
    //   if (!puzzle.removeCandidate(loc, candidate)) continue;
    //   edits.push(new Edit(puzzle, loc, candidate, this));
    // }
    // const hash = new Set<number>();
    // for (const loc of locs)
    //   for (const candidate of puzzle.getCellCandidates(loc))
    //     hash.add(candidate);
    // if (hash.size != 3) return edits;
    // const list = [...hash];
    // list.sort((a, b) => {
    //   return a - b;
    // });
    // if (!(list[0] * 2 == list[1] && list[1] * 2 == list[2])) return edits;
    // const commonHouses = puzzle.getCommonHouses(locs);
    // if (commonHouses.length == 0) return edits;
    // for (const house of commonHouses)
    //   for (const loc of house)
    //     if (
    //       !loc.equals(locs[0]) &&
    //       !loc.equals(locs[1]) &&
    //       puzzle.removeCandidate(loc, list[1])
    //     )
    //       edits.push(new Edit(puzzle, loc, list[1], this));
    return edits;
  }

  static solveGreaterThan(
    puzzle: IFutoshikiPuzzle,
    loc0: Loc,
    loc1: Loc
  ): boolean {
    let edited = false;

    const cell1Candidates = puzzle.getCellCandidates(loc0);

    const length = puzzle.getCellCandidates(loc1).length;

    cell1Candidates.sort((a, b) => a - b);

    const max1 = cell1Candidates[cell1Candidates.length - 1];

    const cell0Candidates = cellCandidates(puzzle.grid[loc1.row][loc1.col]);

    for (const candidate of cell0Candidates) {
      if (candidate < max1) continue;

      NewTechniques.removeCandidate(puzzle.grid, loc1, candidate);

      edited =
        length > cellCandidates(puzzle.grid[loc1.row][loc1.col]).length ||
        edited;
    }

    return edited;
  }

  static solveLessThan(
    puzzle: IFutoshikiPuzzle,
    loc0: Loc,
    loc1: Loc
  ): boolean {
    let edited = false;

    const cell0Candidates = cellCandidates(puzzle.grid[loc0.row][loc0.col]);

    const length = cellCandidates(puzzle.grid[loc1.row][loc1.col]).length;

    cell0Candidates.sort((a, b) => a - b);

    const min0 = cell0Candidates[0];

    const cell1Candidates = cellCandidates(puzzle.grid[loc1.row][loc1.col]);

    for (const candidate of cell1Candidates) {
      if (candidate > min0) continue;
      NewTechniques.removeCandidate(puzzle.grid, loc1, candidate);

      edited =
        length > cellCandidates(puzzle.grid[loc1.row][loc1.col]).length ||
        edited;
    }

    return edited;
  }
}
