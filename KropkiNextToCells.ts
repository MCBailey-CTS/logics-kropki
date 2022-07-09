import { Loc } from "./Loc";
// import { BasePuzzleString } from "./BasePuzzleString";
import { ITechnique } from "./ITechnique";
import { KropkiString } from "./KropkiString";

export class KropkiNextToCells implements ITechnique {
  solve(puzzle: KropkiString): boolean {
    if (puzzle.length != 9) return false;

    let edited = false;

    for (let r = 0; r < puzzle.length; r++)
      for (let c = 0; c < puzzle.length; c++) {
        const loc = new Loc(r * 2, c * 2);

        let cell = puzzle.getCellString(loc);

        if (cell.length == 10) cell = cell.substring(0, 9);

        switch (cell) {
          case "1_34_____":
          case "1234_____":
          case "12_4_____":
          case "1_3______":
            edited = puzzle.removeUpDownLeftRight(loc, 2) || edited;
            continue;
          case "_234_6___":
          case "_23__6___":
            edited = puzzle.removeUpDownLeftRight(loc, 3) || edited;
            continue;
          case "_2_4_____":
          case "_234_____":
          case "__34_____":
          case "_23______":
            edited = puzzle.removeUpDownLeftRight(loc, 2) || edited;
            edited = puzzle.removeUpDownLeftRight(loc, 3) || edited;
            edited = puzzle.removeUpDownLeftRight(loc, 4) || edited;
            continue;
          case "_2_4___8_":
          case "_2345____":
          case "__345____":
            edited = puzzle.removeUpDownLeftRight(loc, 4) || edited;
            continue;
          case "_____6_8_":
            edited = puzzle.removeUpDownLeftRight(loc, 7) || edited;
            continue;
          case "______78_":
            edited = puzzle.removeUpDownLeftRight(loc, 7) || edited;
            edited = puzzle.removeUpDownLeftRight(loc, 8) || edited;
            continue;
          case "___45____":
            edited = puzzle.removeUpDownLeftRight(loc, 4) || edited;
            edited = puzzle.removeUpDownLeftRight(loc, 5) || edited;
            continue;
          case "__3__6___":
            edited = puzzle.removeUpDownLeftRight(loc, 3) || edited;
            edited = puzzle.removeUpDownLeftRight(loc, 6) || edited;
            continue;
        }
      }

    return edited;
  }
}
