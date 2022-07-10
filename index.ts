import { IKropkiPuzzle } from "./IKropkiSolver";
import { KropkiBlack } from "./KropkiBlack";
import { KropkiString } from "./KropkiString";
import { MainFunction } from "./NewMain";
import { NewPuzzles } from "./NewPuzzles";

const puzzle001 = new KropkiString(NewPuzzles._Kropki_001);

puzzle001.solve([new KropkiBlack()]);

console.log(puzzle001.toString());

console.log("///////////////");
const puzzle002 = new KropkiString(NewPuzzles._Kropki_002);

puzzle002.solve([new KropkiBlack()]);

console.log(puzzle002.toString());


console.log("///////////////");
