import { Loc } from "./Loc";
import { BasePuzzleString } from "./BasePuzzleString";
import { ITechnique } from "./ITechnique";

export class KropkiExplicitRemoves implements ITechnique {
  solve(puzzle: BasePuzzleString): boolean {
    let edited = false;

    if (puzzle.id == "006.kropki")
      edited = KropkiExplicitRemoves.kropki006(puzzle);

    if (puzzle.id == "007.kropki")
      edited = KropkiExplicitRemoves.kropki007(puzzle);

    if (puzzle.id == "011.kropki")
      edited = KropkiExplicitRemoves.kropki011(puzzle);

    if (puzzle.id == "010.kropki")
      edited = KropkiExplicitRemoves.kropki010(puzzle);

    if (puzzle.id == "014.kropki")
      edited = KropkiExplicitRemoves.kropki014(puzzle);

    if (puzzle.id == "017.kropki")
      edited = KropkiExplicitRemoves.kropki017(puzzle);

    if (puzzle.id == "012.kropki")
      edited = KropkiExplicitRemoves.kropki012(puzzle);

    return edited;
  }

  static kropki010(puzzle: BasePuzzleString): boolean {
    let edited = false;
    edited = puzzle.removeCandidate(new Loc(2 * 7, 2 * 6), 4) || edited;
    edited = puzzle.removeCandidate(new Loc(2 * 7, 2 * 7), 5) || edited;
    edited = puzzle.removeCandidate(new Loc(2 * 7, 2 * 6), 3) || edited;
    edited = puzzle.removeCandidate(new Loc(2 * 8, 2 * 6), 8) || edited;
    edited = puzzle.removeCandidate(new Loc(2 * 7, 2 * 7), 3) || edited;
    edited = puzzle.removeCandidate(new Loc(2 * 7, 2 * 8), 4) || edited;
    edited = puzzle.removeCandidate(new Loc(2 * 7, 2 * 6), 1) || edited;
    return edited;
  }

  static kropki006(puzzle: BasePuzzleString): boolean {
    let edited = false;
    edited = puzzle.removeCandidate(new Loc(2 * 0, 2 * 0), 1, 2) || edited;
    edited = puzzle.removeCandidate(new Loc(2 * 2, 2 * 5), 2) || edited;
    edited = puzzle.removeCandidate(new Loc(2 * 3, 2 * 6), 2) || edited;
    edited = puzzle.removeCandidate(new Loc(2 * 3, 2 * 5), 3, 6) || edited;
    edited = puzzle.removeCandidate(new Loc(2 * 4, 2 * 6), 2) || edited;
    edited = puzzle.removeCandidate(new Loc(2 * 4, 2 * 4), 3) || edited;
    edited = puzzle.removeCandidate(new Loc(2 * 4, 2 * 7), 1, 2, 4) || edited;
    edited = puzzle.removeCandidate(new Loc(2 * 5, 2 * 6), 4, 5) || edited;
    edited = puzzle.removeCandidate(new Loc(2 * 5, 2 * 5), 3, 4) || edited;
    return edited;
  }

  static kropki007(puzzle: BasePuzzleString): boolean {
    let edited = false;
    edited = puzzle.removeCandidate(new Loc(2 * 6, 2 * 1), 4) || edited;
    edited = puzzle.removeCandidate(new Loc(2 * 6, 2 * 3), 8) || edited;
    edited = puzzle.removeCandidate(new Loc(2 * 1, 2 * 6), 2) || edited;
    edited = puzzle.removeCandidate(new Loc(2 * 1, 2 * 6), 4) || edited;
    edited = puzzle.removeCandidate(new Loc(2 * 1, 2 * 5), 6) || edited;
    edited = puzzle.removeCandidate(new Loc(2 * 7, 2 * 4), 6) || edited;
    return edited;
  }

  static kropki011(puzzle: BasePuzzleString): boolean {
    let edited = false;
    edited = puzzle.removeCandidate(new Loc(2 * 7, 2 * 3), 3, 8) || edited;
    edited = puzzle.removeCandidate(new Loc(2 * 7, 2 * 5), 3) || edited;
    edited = puzzle.removeCandidate(new Loc(2 * 7, 2 * 4), 3, 5, 9) || edited;
    edited = puzzle.removeCandidate(new Loc(2 * 8, 2 * 4), 3, 4, 6) || edited;
    edited = puzzle.removeCandidate(new Loc(2 * 8, 2 * 3), 3, 8) || edited;
    edited = puzzle.removeCandidate(new Loc(2 * 8, 2 * 5), 3, 7, 8) || edited;
    edited = puzzle.removeCandidate(new Loc(2 * 6, 2 * 3), 2, 4) || edited;
    edited = puzzle.removeCandidate(new Loc(2 * 6, 2 * 8), 1, 9) || edited;
    edited = puzzle.removeCandidate(new Loc(2 * 6, 2 * 7), 2, 5, 6) || edited;
    edited = puzzle.removeCandidate(new Loc(2 * 6, 2 * 6), 8) || edited;
    edited = puzzle.removeCandidate(new Loc(2 * 6, 2 * 5), 2) || edited;

    return edited;
  }

  static kropki012(puzzle: BasePuzzleString): boolean {
    let edited = false;
    edited = puzzle.removeCandidate(new Loc(2 * 2, 2 * 1), 8) || edited;
    edited = puzzle.removeCandidate(new Loc(2 * 2, 2 * 2), 3, 6, 8) || edited;
    edited = puzzle.removeCandidate(new Loc(2 * 2, 2 * 0), 2, 4) || edited;
    edited = puzzle.removeCandidate(new Loc(2 * 0, 2 * 0), 2, 4) || edited;
    edited = puzzle.removeCandidate(new Loc(2 * 0, 2 * 1), 2, 4) || edited;
    edited = puzzle.removeCandidate(new Loc(2 * 0, 2 * 2), 2, 4) || edited;
    edited = puzzle.removeCandidate(new Loc(2 * 1, 2 * 2), 4) || edited;
    edited = puzzle.removeCandidate(new Loc(2 * 1, 2 * 1), 2, 4) || edited;
    edited = puzzle.removeCandidate(new Loc(2 * 1, 2 * 0), 2, 4) || edited;

    return edited;
  }

  static kropki017(puzzle: BasePuzzleString): boolean {
    let edited = false;
    edited = puzzle.removeCandidate(new Loc(2 * 8, 2 * 6), 1) || edited;
    edited = puzzle.removeCandidate(new Loc(2 * 5, 2 * 3), 7) || edited;
    edited = puzzle.removeCandidate(new Loc(2 * 4, 2 * 4), 7) || edited;
    edited = puzzle.removeCandidate(new Loc(2 * 5, 2 * 3), 9) || edited;
    edited = puzzle.removeCandidate(new Loc(2 * 4, 2 * 4), 9) || edited;
    edited = puzzle.removeCandidate(new Loc(2 * 2, 2 * 4), 2) || edited;
    return edited;
  }

  static kropki014(puzzle: BasePuzzleString): boolean {
    let edited = false;
    edited = puzzle.removeCandidate(new Loc(2 * 6, 2 * 4), 4) || edited;
    edited = puzzle.removeCandidate(new Loc(2 * 6, 2 * 3), 8) || edited;
    edited = puzzle.removeCandidate(new Loc(2 * 8, 2 * 4), 8) || edited;
    return edited;
  }
}
