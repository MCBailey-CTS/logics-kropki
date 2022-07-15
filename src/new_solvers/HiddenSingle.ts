import { Loc } from "../Loc";
import { IEdit } from "../interfaces/IEdit";
import { IKropkiPuzzle } from "../interfaces/IKropkiPuzzle";
import { Edit } from "../Edit";
import { BaseKropkiChain } from "../abstract/BaseKropkiChain";

export class HiddenSingle extends BaseKropkiChain {
  findChains(puzzle: IKropkiPuzzle): Loc[][] {
    const chains: Loc[][] = [];

    for (const house of puzzle.getHouses()) chains.push(house);

    return chains;
  }

  solve(puzzle: IKropkiPuzzle, cellChainLocs: Loc[]): IEdit[] {
    const edits: IEdit[] = [];

    if (puzzle.length != cellChainLocs.length) return edits;

    const expected = [];

    for (let i = 1; i <= puzzle.length; i++) expected.push(i);

    for (const candidate of expected) {
      const indexes = [];

      for (let i = 0; i < cellChainLocs.length; i++)
        if (puzzle.getCellSet(cellChainLocs[i]).has(candidate)) indexes.push(i);

      if (indexes.length != 1) continue;

      //   console.log(cellChainLocs);
      const loc = cellChainLocs[indexes[0]];

      //   console.log(loc);
      const candidates = puzzle.getCellCandidates(loc);

      if (candidates.length == 1) continue;

      for (const temp of candidates)
        if (temp != candidate && puzzle.removeCandidate(loc, temp))
          edits.push(new Edit(puzzle, loc, temp, this));
    }

    return edits;
  }
}

export class HiddenPairs extends BaseKropkiChain {
  findChains(puzzle: IKropkiPuzzle): Loc[][] {
    const chains: Loc[][] = [];

    for (const house of puzzle.getHouses()) chains.push(house);

    return chains;
  }

  solve(puzzle: IKropkiPuzzle, cellChainLocs: Loc[]): IEdit[] {
    const edits: IEdit[] = [];

    if (puzzle.length != cellChainLocs.length) return edits;

    // const map = new Map<number,Set<number>>();

    // for(const )

    for (const candidate0 of puzzle.expectedCandidates)
      for (const candidate1 of puzzle.expectedCandidates) {
        if (candidate0 == candidate1) continue;

        const set0 = new Set<number>();

        const set1 = new Set<number>();

        for (let i = 0; i < cellChainLocs.length; i++) {
          if (puzzle.getCellSet(cellChainLocs[i]).has(candidate0)) set0.add(i);

          if (puzzle.getCellSet(cellChainLocs[i]).has(candidate1)) set1.add(i);
        }

        if (set0.size != 2) continue;

        if (set0.size != set1.size) continue;

        const indexes = [...set0];

        if (
          !indexes.every((index) => {
            return set1.has(index);
          })
        )
          continue;

        // console.log(
        //   `${cellChainLocs[indexes[0]]} ${cellChainLocs[indexes[1]]}`
        // );

        for (const candidate of puzzle.expectedCandidates) {
          if (candidate == candidate0 || candidate == candidate1) continue;

          if (puzzle.removeCandidate(cellChainLocs[indexes[0]], candidate))
            edits.push(
              new Edit(puzzle, cellChainLocs[indexes[0]], candidate, this)
            );

          if (puzzle.removeCandidate(cellChainLocs[indexes[1]], candidate))
            edits.push(
              new Edit(puzzle, cellChainLocs[indexes[1]], candidate, this)
            );
        }
      }

    return edits;
  }
}
