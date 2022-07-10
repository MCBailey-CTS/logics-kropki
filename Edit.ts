import { IEdit, IKropkiPuzzle, IKropkiSolver } from "./IKropkiSolver";
import { Loc } from "./Loc";

// MainFunction();

export class Edit implements IEdit {
    private readonly _candidate: number;
    private readonly _solver: IKropkiSolver;
    private readonly _loc: Loc;
    private readonly _puzzle: IKropkiPuzzle;
    constructor(
        puzzle: IKropkiPuzzle,
        loc: Loc,
        candidate: number,
        solver: IKropkiSolver
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

    get solver(): IKropkiSolver {
        return this._solver;
    }

    get candidate(): number {
        return this._candidate;
    }
}
