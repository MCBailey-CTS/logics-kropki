import { IEdit, IKropkiPuzzle, IKropkiSolver } from "./IKropkiSolver";
import { Loc } from "./Loc";
import { BaseKropkiSolver } from "./BaseKropkiSolver";
import { Edit } from "./Edit";
import { KropkiString } from "./KropkiString";

export class KropkiBlack implements IKropkiSolver {
  solveExplicit(puzzle: IKropkiPuzzle, loc: Loc, other: Loc): IEdit | null {
    const otherHash = puzzle.getCellSet(other);

    for (const candidate of puzzle.getCellCandidates(loc)) {
      if (otherHash.has(candidate * 2)) continue;

      if (candidate % 2 == 0 && otherHash.has(candidate / 2)) continue;

      if (!puzzle.removeCandidate(loc, candidate)) continue;

      return new Edit(puzzle, loc, candidate, this);
    }

    return null;
  }

  solveCell(puzzle: IKropkiPuzzle, loc: Loc): IEdit | null {
    const surroundingCells = [
      loc.up(),
      loc.up().up(),
      loc.right(),
      loc.right().right(),
      loc.down(),
      loc.down().down(),
      loc.left(),
      loc.left().left(),
    ];

    for (let i = 0; i < surroundingCells.length; i += 2) {
      const surrounding = surroundingCells[i + 1];

      if (surrounding.row < 0 || surrounding.col < 0) continue;

      if (
        surrounding.row >= puzzle.length * 2 - 1 ||
        surrounding.col >= puzzle.length * 2 - 1
      )
        continue;

      const intersection = puzzle.getCellString(surroundingCells[i]);

      if (intersection != "b") continue;

      const edit = this.solveExplicit(puzzle, loc, surrounding);

      if (edit == null) continue;

      return edit;
    }

    return null;
  }

  get id(): string {
    return "KropkiBlack";
  }
}

export class KropkiWhite implements IKropkiSolver {
  solveExplicit(puzzle: IKropkiPuzzle, loc: Loc, other: Loc): IEdit | null {
    const otherHash = puzzle.getCellSet(other);

    for (const candidate of puzzle.getCellCandidates(loc)) {
      if (otherHash.has(candidate + 1)) continue;

      if (otherHash.has(candidate - 1)) continue;

      if (!puzzle.removeCandidate(loc, candidate)) continue;

      return new Edit(puzzle, loc, candidate, this);
    }

    return null;
  }

  solveCell(puzzle: IKropkiPuzzle, loc: Loc): IEdit | null {
    const surroundingCells = [
      loc.up(),
      loc.up().up(),
      loc.right(),
      loc.right().right(),
      loc.down(),
      loc.down().down(),
      loc.left(),
      loc.left().left(),
    ];

    for (let i = 0; i < surroundingCells.length; i += 2) {
      const surrounding = surroundingCells[i + 1];

      if (surrounding.row < 0 || surrounding.col < 0) continue;

      if (
        surrounding.row >= puzzle.length * 2 - 1 ||
        surrounding.col >= puzzle.length * 2 - 1
      )
        continue;

      const intersection = puzzle.getCellString(surroundingCells[i]);

      if (intersection != "w") continue;

      const edit = this.solveExplicit(puzzle, loc, surrounding);

      if (edit == null) continue;

      return edit;
    }

    return null;
  }

  get id(): string {
    return "KropkiBlack";
  }
}

export class KropkiEmptyDominate implements IKropkiSolver {
  solveExplicit(puzzle: IKropkiPuzzle, loc: Loc, other: Loc): IEdit | null {
    const otherHash = puzzle.getCellSet(other);

    for (const candidate of puzzle.getCellCandidates(loc)) {
    //   const kropkiCandidates: Set<number> =
    //     puzzle.getKropkiCandidates(candidate);

      let allValid = true;

      for (const c of otherHash) {
        allValid =
          (candidate % 2 == 0 && candidate / 2 == c) ||
          candidate * 2 == c ||
          candidate + 1 == c ||
          candidate - 1 == c;

        // console.log(`${candidate}, ${c}, ${allValid}`);

      }

      if (!allValid) continue;


      // {
      if (!puzzle.removeCandidate(loc, candidate)) continue;

      return new Edit(puzzle, loc, candidate, this);
      // }

      //   console.log(`Candidate: ${candidate} == Kropki: ${[...kropkiCandidates]} Other: ${[...otherHash]}`);

      //   if (!KropkiString.isSubset([...kropkiCandidates], [...otherHash]))
      //     continue;
    }

    return null;
  }

  solveCell(puzzle: IKropkiPuzzle, loc: Loc): IEdit | null {
    const surroundingCells = [
      loc.up(),
      loc.up().up(),
      loc.right(),
      loc.right().right(),
      loc.down(),
      loc.down().down(),
      loc.left(),
      loc.left().left(),
    ];

    for (let i = 0; i < surroundingCells.length; i += 2) {
      const surrounding = surroundingCells[i + 1];

      if (surrounding.row < 0 || surrounding.col < 0) continue;

      if (
        surrounding.row >= puzzle.length * 2 - 1 ||
        surrounding.col >= puzzle.length * 2 - 1
      )
        continue;

      const intersection = puzzle.getCellString(surroundingCells[i]);

      if (intersection != ".") continue;

      const edit = this.solveExplicit(puzzle, loc, surrounding);

      if (edit == null) continue;

      return edit;
    }

    return null;
  }

  get id(): string {
    return "KropkiBlack";
  }
}
