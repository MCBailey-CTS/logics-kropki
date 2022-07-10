import { BaseKropkiSolver } from "./BaseKropkiSolver";
import { IEdit, IKropkiPuzzle, IKropkiSolver } from "./IKropkiSolver";
import { KropkiBlack, KropkiEmptyDominate, KropkiWhite } from "./KropkiBlack";
import { KropkiString } from "./KropkiString";
import { Loc } from "./Loc";
import { MainFunction } from "./NewMain";
import { NewPuzzles } from "./NewPuzzles";

const solvers: IKropkiSolver[] = [new KropkiEmptyDominate()];

const puzzle001 = new KropkiString(NewPuzzles._Kropki_001);

puzzle001.solve(solvers);

console.log(puzzle001.toString());

console.log("///////////////");
const puzzle002 = new KropkiString(NewPuzzles._Kropki_002);

puzzle002.solve(solvers);

console.log(puzzle002.toString());

console.log("///////////////");





export class KropkiChainBw extends BaseKropkiSolver{
    get id(): string {
        throw new Error("Method not implemented.");
    }
    solveCell(puzzle: IKropkiPuzzle, loc: Loc): IEdit | null {
        throw new Error("Method not implemented.");
    }

}
