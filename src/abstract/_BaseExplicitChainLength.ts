import { IKropkiPuzzle } from "../interfaces/IKropkiPuzzle";
import { Loc } from "../Loc";
import { LocSet } from "../LocSet";
import { _BaseKropkiChain } from "./_BaseKropkiChain";

export abstract class _BaseExplicitChainLength extends _BaseKropkiChain {
  abstract get chainLength(): number;

  findChains(puzzle: IKropkiPuzzle): Loc[][] {
    const chains: Loc[][] = [];

    switch (this.chainLength) {
      case 2:
        for (const cellLoc of puzzle.sudokuCellLocs)
          for (const other0 of puzzle.getSurroundingCellLocs(cellLoc)) {
            if (new LocSet([cellLoc, other0]).size != 2) continue;

            chains.push([cellLoc, other0]);
          }
        break;
      case 3:
        for (const loc0 of puzzle.sudokuCellLocs)
          for (const loc1 of puzzle.getSurroundingCellLocs(loc0))
            for (const loc2 of puzzle.getSurroundingCellLocs(loc1)) {
              if (new LocSet([loc0, loc1, loc2]).size != 3) continue;

              chains.push([loc0, loc1, loc2]);
            }
        break;
      case 4:
        for (const loc0 of puzzle.sudokuCellLocs)
          for (const loc1 of puzzle.getSurroundingCellLocs(loc0))
            for (const loc2 of puzzle.getSurroundingCellLocs(loc1))
              for (const loc3 of puzzle.getSurroundingCellLocs(loc2)) {
                if (new LocSet([loc0, loc1, loc2, loc3]).size != 4) continue;

                chains.push([loc0, loc1, loc2, loc3]);
              }

        break;
      case 5:
        for (const loc0 of puzzle.sudokuCellLocs)
          for (const loc1 of puzzle.getSurroundingCellLocs(loc0))
            for (const loc2 of puzzle.getSurroundingCellLocs(loc1))
              for (const loc3 of puzzle.getSurroundingCellLocs(loc2))
                for (const loc4 of puzzle.getSurroundingCellLocs(loc3)) {
                  if (new LocSet([loc0, loc1, loc2, loc3, loc4]).size != 5)
                    continue;

                  chains.push([loc0, loc1, loc2, loc3, loc4]);
                }
        break;
      case 6:
        for (const loc0 of puzzle.sudokuCellLocs)
          for (const loc1 of puzzle.getSurroundingCellLocs(loc0))
            for (const loc2 of puzzle.getSurroundingCellLocs(loc1))
              for (const loc3 of puzzle.getSurroundingCellLocs(loc2))
                for (const loc4 of puzzle.getSurroundingCellLocs(loc3))
                  for (const loc5 of puzzle.getSurroundingCellLocs(loc4)) {
                    if (
                      new LocSet([loc0, loc1, loc2, loc3, loc4, loc5]).size != 6
                    )
                      continue;

                    chains.push([loc0, loc1, loc2, loc3, loc4, loc5]);
                  }
        break;
      default:
        console.log(
          `Unknown length for BaseExplicitChain '${this.chainLength}'`
        );
        break;
    }

    return chains;
  }
}
