import { NewPuzzles } from "./NewPuzzles";
import { OuOdString } from "./OuOdString";
import { FutoshikiString } from "./FutoshikiString";
import { KropkiString } from "./KropkiString";

export function MainFunction() {
  let solvedCount = 0;

  const solvedPuzzles = [];

  const start = performance.now();

  for (const str of NewPuzzles.allPuzzles)
    try {
      if (str.includes(".kropki")) {
        const puzzle = new KropkiString(str);

        puzzle.solvePuzzle();

        if (puzzle.isSolved()) {
          solvedCount++;
          solvedPuzzles.push(puzzle.id);
          continue;
        }

        console.log(puzzle.toString());
      }

      if (str.includes(".ouod")) {
        const puzzle = new OuOdString(str);

        puzzle.solvePuzzle();
        puzzle.solvePuzzle();
        puzzle.solvePuzzle();
        puzzle.solvePuzzle();
        puzzle.solvePuzzle();
        puzzle.solvePuzzle();
        puzzle.solvePuzzle();
        puzzle.solvePuzzle();
        puzzle.solvePuzzle();
        puzzle.solvePuzzle();
        puzzle.solvePuzzle();
        puzzle.solvePuzzle();

        if (puzzle.isSolved()) {
          solvedCount++;
          solvedPuzzles.push(puzzle.id);
          continue;
        }

        console.log(puzzle.toString());
      }

      if (str.includes(".futoshiki")) {
        const puzzle = new FutoshikiString(str);

        puzzle.solvePuzzle();

        if (puzzle.isSolved()) {
          solvedCount++;
          solvedPuzzles.push(puzzle.id);
          continue;
        }

        console.log(puzzle.toString());
      }
    } catch (err) {
      console.log("/////////////////");
      console.log(str);
      console.log(err);
      console.log("/////////////////");
    }
  console.log();

  const map = new Map<string, Array<string>>();

  for (const id of solvedPuzzles) {
    const index = id.indexOf(".");

    const numberId = id.substring(0, index);

    const extension = id.substring(index);

    if (!map.has(extension)) map.set(extension, new Array<string>());

    map.get(extension)?.push(numberId);
  }

  for (const key of map.keys()) {
    let str = `${key}\n`;

    const values = map.get(key);

    if (!values) continue;

    values.sort();

    for (const num of values) str += num + ", ";

    console.log(str);
  }

  console.log(`Total solved: ${solvedCount}`);

  const duration = performance.now() - start;

  console.log(duration / 1000);
}
