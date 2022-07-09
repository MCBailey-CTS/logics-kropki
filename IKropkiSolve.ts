import { Loc } from "./Loc";

export interface IKropkiSolve {
  solvePuzzle(puzzle: IKropkiPuzzle): IEdit[];

  solveCell(puzzle: IKropkiPuzzle, loc: Loc): IEdit[];

  get id(): string;
}

export interface IKropkiPuzzle {
  get id(): string;
}

export interface IEdit {
  get puzzle(): IKropkiPuzzle;

  get loc(): Loc;

  get technique(): IKropkiSolve;

  get candidate(): number;
}
