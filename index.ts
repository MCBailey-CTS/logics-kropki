import { IKropkiSolver } from "./IKropkiSolver";
import { KropkiString } from "./KropkiString";
import { NewPuzzles } from "./NewPuzzles";
import { KropkiChainBbCenter } from "./KropkiChainBbCenter";
import { KropkiChainBwCenter } from "./KropkiChainBwCenter";


const solvers: IKropkiSolver[] = [new KropkiChainBwCenter()];

const puzzleStrings = [
  NewPuzzles._Kropki_010,
  NewPuzzles._Kropki_001,
  NewPuzzles._Kropki_006,
  NewPuzzles._Kropki_004,
  NewPuzzles._Kropki_003,
  NewPuzzles._Kropki_002,
  NewPuzzles._Kropki_018,

];

for (const str of puzzleStrings) {
  console.log("///////////////");
  const puzzle = new KropkiString(str);

  puzzle.solve(solvers);

  console.log(puzzle.toString());
}
