import { IEdit } from "./interfaces/IEdit";
import { IKropkiPuzzle } from "./interfaces/IKropkiPuzzle";
import { IKropkiSolver } from "./interfaces/IKropkiSolver";
import { Loc } from "./Loc";
import { IKropkiChain } from "./interfaces/IKropkiChain";

export class Edit implements IEdit {
  private readonly _candidate: number;
  private readonly _solver: IKropkiSolver | IKropkiChain;
  private readonly _loc: Loc;
  private readonly _puzzle: IKropkiPuzzle;
  constructor(
    puzzle: IKropkiPuzzle,
    loc: Loc,
    candidate: number,
    solver: IKropkiSolver | IKropkiChain
  ) {
    this._puzzle = puzzle;
    this._loc = loc;
    this._candidate = candidate;
    this._solver = solver;
  }

  get puzzle(): IKropkiPuzzle {
    return this._puzzle;
  }

  get loc(): Loc {
    return this._loc;
  }

  get solver(): IKropkiSolver | IKropkiChain {
    return this._solver;
  }

  get candidate(): number {
    return this._candidate;
  }
}
