import { Loc } from "./Loc";
import { BasePuzzleString } from "./BasePuzzleString";
import { LocSet } from "./LocSet";
import { IKropkiChain } from "./IKropkiChain";
import { KropkiString } from "./KropkiString";

export class KropkiChain_BB implements IKropkiChain {
  solve(puzzle: BasePuzzleString, chainLocs: Loc[]): boolean {
    let edited = false;

    if (puzzle.length != 9) return false;

    if (chainLocs.length < 3)
      throw Error(`Not enough locs in chain: ${chainLocs.length}`);

    if (chainLocs.length % 2 == 2)
      throw Error(
        `Cannot have an even number of locs for chain : ${chainLocs.length}`
      );

    const lastInter = puzzle.getCellString(chainLocs[chainLocs.length - 2]);

    if (lastInter == ".") return false;

    // all cell locs must be in the same row, same col, or same fence
    const rowIndexes = new Set<number>();
    const colIndexes = new Set<number>();

    for (let i = 0; i < chainLocs.length; i += 2) {
      rowIndexes.add(chainLocs[i].row);
      colIndexes.add(chainLocs[i].col);
    }

    if (rowIndexes.size != 1 && colIndexes.size != 1) return false;

    const cellLocSet = new LocSet();
    const kropkiLocSet = new LocSet();

    const cellIndexesList = [];
    const kropkiIndexesList = [];

    for (let i = 0; i < chainLocs.length; i++)
      if (i % 2 == 0) {
        cellLocSet.add(chainLocs[i]);
        cellIndexesList.push(i);
      } else {
        kropkiLocSet.add(chainLocs[i]);
        kropkiIndexesList.push(i);
      }

    const candidatesInLocs = new Set<number>();

    for (const cellLoc of cellLocSet.values)
      for (const candidate of puzzle.getCellCandidates(cellLoc))
        candidatesInLocs.add(candidate);

    edited =
      puzzle.removeCandidate(
        chainLocs[2],
        Math.min(...candidatesInLocs),
        Math.max(...candidatesInLocs)
      ) || edited;

    const candidatesList = [...candidatesInLocs].sort((a, b) => a - b);

    const minIndex = candidatesList.length - cellIndexesList.length;

    const maxIndex = cellIndexesList.length - 1;

    const requiredCandiates = [];

    for (let index = minIndex; index <= maxIndex; index++)
      requiredCandiates.push(candidatesList[index]);

    let cellLocs: LocSet | undefined;

    if (
      chainLocs[0].inSameRow(chainLocs[1]) &&
      chainLocs[0].inSameRow(chainLocs[2])
    ) {
      cellLocs = new LocSet(puzzle.getCellRowHouseLocs(chainLocs[0].row / 2));
    }

    if (
      chainLocs[0].inSameCol(chainLocs[1]) &&
      chainLocs[0].inSameCol(chainLocs[2])
    ) {
      cellLocs = new LocSet(puzzle.getCellColHouseLocs(chainLocs[0].col / 2));
    }

    if (typeof cellLocs != "undefined") {
      puzzle.removeCandidate(chainLocs[cellIndexesList[0]], 3, 5, 6, 7, 9);
      puzzle.removeCandidate(
        chainLocs[cellIndexesList[1]],
        1,
        3,
        5,
        6,
        7,
        8,
        9
      );
      puzzle.removeCandidate(chainLocs[cellIndexesList[2]], 3, 5, 6, 7, 9);

      cellLocs.delete(chainLocs[cellIndexesList[0]]);
      cellLocs.delete(chainLocs[cellIndexesList[1]]);
      cellLocs.delete(chainLocs[cellIndexesList[2]]);

      for (const required of requiredCandiates) {
        for (const loc of cellLocs.values)
          edited = puzzle.removeCandidate(loc, required) || edited;
      }
    }

    const cell0 = puzzle.getCellCandidates(chainLocs[0]);
    const cell1 = puzzle.getCellCandidates(chainLocs[2]);
    const cell2 = puzzle.getCellCandidates(chainLocs[4]);

    if (
      KropkiString.equalSets(cell0, [1, 4, 8]) &&
      KropkiString.equalSets(cell1, [2, 4]) &&
      KropkiString.equalSets(cell2, [2, 4, 8])
    ) {
      edited = puzzle.removeCandidate(chainLocs[0], 4) || edited;
      edited = puzzle.removeCandidate(chainLocs[4], 8) || edited;
    }
    return edited;
  }
}
