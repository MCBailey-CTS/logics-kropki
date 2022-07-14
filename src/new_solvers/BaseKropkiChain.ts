import { Edit } from "../Edit";
import { Loc } from "../Loc";
import { IEdit } from "../interfaces/IEdit";
import { IKropkiPuzzle } from "../interfaces/IKropkiPuzzle";
import { IKropkiSolver } from "../interfaces/IKropkiSolver";

export class BaseKropkiChain implements IKropkiSolver {
  get id(): string {
    return "BaseKropkiChain";
  }

  solvePuzzle(puzzle: IKropkiPuzzle): IEdit[] {
    const edits: IEdit[] = [];

    for (const cellLoc of puzzle.sudokuCellLocs) {
      for (const other of puzzle.getSurroundingCellLocs(cellLoc)) {
        if (!other.isValidKropkiLoc(puzzle.length)) continue;

        const results: IEdit[] = this.solveChain(puzzle, cellLoc, other);

        edits.push(...results);
      }
    }

    return edits;
  }

  solveChain(puzzle: IKropkiPuzzle, ...chain: Loc[]): IEdit[] {
    const edits: IEdit[] = [];

    if (chain.length != 2) return edits;

    if (
      (chain[0].up(2).equals(chain[1]) &&
        puzzle.getCellString(chain[0].up()) == "b") ||
      (chain[0].right(2).equals(chain[1]) &&
        puzzle.getCellString(chain[0].right()) == "b") ||
      (chain[0].down(2).equals(chain[1]) &&
        puzzle.getCellString(chain[0].down()) == "b") ||
      (chain[0].left(2).equals(chain[1]) &&
        puzzle.getCellString(chain[0].left()) == "b")
    ) {
      edits.push(...this.solveExplicitBlack(puzzle, chain[0], chain[1]));
      edits.push(...this.solveExplicitBlack(puzzle, chain[1], chain[0]));
    }

    if (
      (chain[0].up(2).equals(chain[1]) &&
        puzzle.getCellString(chain[0].up()) == ".") ||
      (chain[0].right(2).equals(chain[1]) &&
        puzzle.getCellString(chain[0].right()) == ".") ||
      (chain[0].down(2).equals(chain[1]) &&
        puzzle.getCellString(chain[0].down()) == ".") ||
      (chain[0].left(2).equals(chain[1]) &&
        puzzle.getCellString(chain[0].left()) == ".")
    ) {
      edits.push(...this.solveExplicitDominate(puzzle, chain[0], chain[1]));
      edits.push(...this.solveExplicitDominate(puzzle, chain[1], chain[0]));
    }

    if (
      (chain[0].up(2).equals(chain[1]) &&
        puzzle.getCellString(chain[0].up()) == "w") ||
      (chain[0].right(2).equals(chain[1]) &&
        puzzle.getCellString(chain[0].right()) == "w") ||
      (chain[0].down(2).equals(chain[1]) &&
        puzzle.getCellString(chain[0].down()) == "w") ||
      (chain[0].left(2).equals(chain[1]) &&
        puzzle.getCellString(chain[0].left()) == "w")
    ) {
      edits.push(...this.solveExplicitWhite(puzzle, chain[0], chain[1]));
      edits.push(...this.solveExplicitWhite(puzzle, chain[1], chain[0]));
    }

    return edits;
  }

  solveExplicitBlack(puzzle: IKropkiPuzzle, loc: Loc, other: Loc): IEdit[] {
    const otherHash = puzzle.getCellSet(other);

    const edits: IEdit[] = [];

    for (const candidate of puzzle.getCellCandidates(loc)) {
      if (otherHash.has(candidate * 2)) continue;

      if (candidate % 2 == 0 && otherHash.has(candidate / 2)) continue;

      if (!puzzle.removeCandidate(loc, candidate)) continue;

      edits.push(new Edit(puzzle, loc, candidate, this));
    }

    return edits;
  }

  solveExplicitWhite(puzzle: IKropkiPuzzle, loc: Loc, other: Loc): IEdit[] {
    const edits: IEdit[] = [];

    const otherHash = puzzle.getCellSet(other);

    for (const candidate of puzzle.getCellCandidates(loc)) {
      if (otherHash.has(candidate + 1)) continue;

      if (otherHash.has(candidate - 1)) continue;

      if (!puzzle.removeCandidate(loc, candidate)) continue;

      edits.push(new Edit(puzzle, loc, candidate, this));
    }

    return edits;
  }

  solveExplicitDominate(puzzle: IKropkiPuzzle, loc: Loc, other: Loc): IEdit[] {
    const edits: IEdit[] = [];
    for (const candidate of puzzle.getCellCandidates(loc)) {
      const kropkiCandidates = [
        ...puzzle.getKropkiCandidates(candidate),
        candidate,
      ];

      const otherHash = puzzle.getCellSet(other);

      for (const t of kropkiCandidates) otherHash.delete(t);

      if (otherHash.size > 0) continue;

      if (!puzzle.removeCandidate(loc, candidate)) continue;

      edits.push(new Edit(puzzle, loc, candidate, this));
    }

    return edits;
  }
}
