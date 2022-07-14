import { Edit } from "../Edit";
import { Loc } from "../Loc";
import { IEdit } from "../interfaces/IEdit";
import { IKropkiPuzzle } from "../interfaces/IKropkiPuzzle";
import { IKropkiSolver } from "../interfaces/IKropkiSolver";
import { LocSet } from "../LocSet";

export class KropkiChainString implements IKropkiSolver {
  get id(): string {
    return "KropkiChainString";
  }

  solvePuzzle(puzzle: IKropkiPuzzle): IEdit[] {
    const edits: IEdit[] = [];

    return edits;
  }
}

export class BaseKropkiChain implements IKropkiSolver {
  get id(): string {
    return "BaseKropkiChain";
  }

  solvePuzzle(puzzle: IKropkiPuzzle): IEdit[] {
    const edits: IEdit[] = [];

    for (const cellLoc of puzzle.sudokuCellLocs)
      for (const other0 of puzzle.getSurroundingCellLocs(cellLoc)) {
        if (!other0.isValidKropkiLoc(puzzle.length)) continue;

        const results: IEdit[] = this.solveChain(puzzle, cellLoc, other0);

        edits.push(...results);
      }

    for (const cellLoc of puzzle.sudokuCellLocs)
      for (const other0 of puzzle.getSurroundingCellLocs(cellLoc))
        for (const other1 of puzzle.getSurroundingCellLocs(other0)) {
          const locs = [cellLoc, other0, other1];

          const locSet = new LocSet(locs);

          if (locSet.size != 3) continue;

          if (
            !locs.every((loc) => {
              return loc.isValidKropkiLoc(puzzle.length);
            })
          )
            continue;

          const results: IEdit[] = this.solveChain(
            puzzle,
            cellLoc,
            other0,
            other1
          );

          edits.push(...results);
        }

    return edits;
  }

  solveChain(puzzle: IKropkiPuzzle, ...chain: Loc[]): IEdit[] {
    const edits: IEdit[] = [];

    if (chain.length == 2) {
      const intersection = puzzle.getIntersection(chain[0], chain[1]);

      switch (puzzle.getCellString(intersection)) {
        case "b":
          // edits.push(...this.solveExplicitBlack(puzzle, chain[0], chain[1]));
          // edits.push(...this.solveExplicitBlack(puzzle, chain[1], chain[0]));
          break;
        case ".":
          // edits.push(...this.solveExplicitDominate(puzzle, chain[0], chain[1]));
          // edits.push(...this.solveExplicitDominate(puzzle, chain[1], chain[0]));
          break;
        case "w":
          // edits.push(...this.solveExplicitWhite(puzzle, chain[0], chain[1]));
          // edits.push(...this.solveExplicitWhite(puzzle, chain[1], chain[0]));
          break;
        default:
          throw Error(
            `Unknown string for intersection: '${puzzle.getCellString(
              intersection
            )}'`
          );
      }
    }

    if (chain.length == 3) {
      const int0 = puzzle.getIntersection(chain[0], chain[1]);
      const int1 = puzzle.getIntersection(chain[1], chain[2]);
      const intStr = puzzle.getCellString(int0) + puzzle.getCellString(int1);

      for (const house of puzzle.getCommonHouses(chain)) {
        const locset = new LocSet(house);

        // console.log(`Before: ${locset.size}`);

        for (const loc of chain) locset.delete(loc);
        // console.log(` After: ${locset.size}`);

        switch (intStr) {
          case "ww":
            if (puzzle.removeCandidate(chain[1], 1))
              edits.push(new Edit(puzzle, chain[1], 1, this));

            if (
              puzzle.getCellSet(chain[0]).has(1) &&
              !puzzle.getCellSet(chain[2]).has(3) &&
              puzzle.removeCandidate(chain[0], 1)
            )
              edits.push(new Edit(puzzle, chain[0], 1, this));

            break;

          case "bw":
          case "wb":
            if (puzzle.removeCandidate(chain[1], 1))
              edits.push(new Edit(puzzle, chain[1], 1, this));

            break;

          case "bb":
            if (puzzle.length != 9) break;
            if (puzzle.removeCandidate(chain[1], 1))
              edits.push(new Edit(puzzle, chain[1], 1, this));
            if (puzzle.removeCandidate(chain[1], 3))
              edits.push(new Edit(puzzle, chain[1], 3, this));
            if (puzzle.removeCandidate(chain[1], 5))
              edits.push(new Edit(puzzle, chain[1], 5, this));
            if (puzzle.removeCandidate(chain[1], 6))
              edits.push(new Edit(puzzle, chain[1], 6, this));
            if (puzzle.removeCandidate(chain[1], 7))
              edits.push(new Edit(puzzle, chain[1], 7, this));
            if (puzzle.removeCandidate(chain[1], 8))
              edits.push(new Edit(puzzle, chain[1], 8, this));
            if (puzzle.removeCandidate(chain[1], 9))
              edits.push(new Edit(puzzle, chain[1], 9, this));

            if (locset.size == 6)
              for (const loc of locset.values) {
                // console.log(loc);
                if (puzzle.removeCandidate(loc, 2))
                  edits.push(new Edit(puzzle, loc, 2, this));
                if (puzzle.removeCandidate(loc, 4))
                  edits.push(new Edit(puzzle, loc, 4, this));
              }
            break;
        }
      }
    }

    return edits;
  }
}
