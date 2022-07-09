import { BasePuzzleString } from "./BasePuzzleString";

export interface ITechnique {
  solve(puzzle: BasePuzzleString): boolean;
}
