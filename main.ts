import { Loc } from "./Loc";
import { Puzzles } from "./Puzzles";
import { PuzzleString } from "./PuzzleString";
import { Techniques } from "./Techniques";
import { MainFunction } from "./NewMain";

// export function MainFunction() {
//   let solvedCount = 0;

//   const solvedPuzzles = [];

//   for (const str of Puzzles.allPuzzles)
//     try {
//       if (str.includes(".lightenup")) {
//         const puzzle = new PuzzleString(str);

//         puzzle.solveLightenUp();
//         puzzle.solveLightenUp();
//         puzzle.solveLightenUp();
//         puzzle.solveLightenUp();
//         puzzle.solveLightenUp();

//         if (puzzle.isLightenUpSolved()) {
//           solvedCount++;
//           solvedPuzzles.push(puzzle._id);

//           continue;
//         }

//         console.log(puzzle._id);
//         console.log(puzzle._length);
//         console.log(puzzle.toLightenUpString());

//         continue;
//       }

//       if (str.includes(".parks1")) {
//         const puzzle = new PuzzleString(str);

//         puzzle
//           .solveParks1()
//           .solveParks1()
//           .solveParks1()
//           .solveParks1()
//           .solveParks1()
//           .solveParks1()
//           .solveParks1()
//           .solveParks1();

//         if (puzzle.isParks1Solved()) {
//           solvedCount++;
//           solvedPuzzles.push(puzzle._id);

//           continue;
//         }

//         console.log(puzzle.toParks1String());

//         continue;
//       }

//       if (str.includes(".kropki")) {
//         // try {
//         let puzzle = new PuzzleString(str);

//         puzzle
//           .solveKropki()
//           .solveKropki()
//           .solveKropki()
//           .solveKropki()
//           .solveKropki()
//           .solveKropki()
//           .solveKropki()
//           .solveKropki()
//           .solveKropki()
//           .solveKropki()
//           .solveKropki();

//         if (puzzle.isSolvedKropki()) {
//           solvedCount++;

//           solvedPuzzles.push(puzzle._id);

//           continue;
//         }

//         console.log(puzzle.toKropkiString());

//         continue;
//       }

//       if (str.includes(".futoshiki")) {
//         // try {
//         let puzzle = new PuzzleString(str);

//         puzzle
//           .solveFutoshiki()
//           .solveFutoshiki()
//           .solveFutoshiki()
//           .solveFutoshiki()
//           .solveFutoshiki()
//           .solveFutoshiki()
//           .solveFutoshiki()
//           .solveFutoshiki()
//           .solveFutoshiki();

//         if (puzzle.isSolvedFutoshiki()) {
//           solvedCount++;
//           solvedPuzzles.push(puzzle._id);

//           continue;
//         }

//         console.log(puzzle.toFutoshikiString());

//         continue;
//       }

//       if (str.includes(".moreorless")) {
//         // try {
//         let puzzle = new PuzzleString(str);

//         puzzle
//           .solveMoreOrLess()
//           .solveMoreOrLess()
//           .solveMoreOrLess()
//           .solveMoreOrLess()
//           .solveMoreOrLess()
//           .solveMoreOrLess()
//           .solveMoreOrLess()
//           .solveMoreOrLess()
//           .solveMoreOrLess()
//           .solveMoreOrLess();

//         if (puzzle.isSolvedMoreOrLess()) {
//           solvedCount++;
//           solvedPuzzles.push(puzzle._id);

//           continue;
//         }

//         console.log(puzzle.toFutoshikiString());

//         continue;
//       }

//       if (str.includes(".mathrax")) {
//         let puzzle = new PuzzleString(str);

//         puzzle = puzzle
//           .solveMathrax()
//           .solveMathrax()
//           .solveMathrax()
//           .solveMathrax()
//           .solveMathrax()
//           .solveMathrax()
//           .solveMathrax()
//           .solveMathrax()
//           .solveMathrax()
//           .solveMathrax()
//           .solveMathrax();

//         if (puzzle.isSolvedMathrax()) {
//           solvedCount++;
//           solvedPuzzles.push(puzzle._id);

//           continue;
//         }

//         console.log(puzzle.toMathraxString());
//         console.log("/////////////////////////");

//         continue;
//       }

//       if (str.includes(".skyscrapers")) {
//         let puzzle = new PuzzleString(str);

//         puzzle = puzzle
//           .solveSkyscrapers()
//           .solveSkyscrapers()
//           .solveSkyscrapers()
//           .solveSkyscrapers()
//           .solveSkyscrapers()
//           .solveSkyscrapers()
//           .solveSkyscrapers()
//           .solveSkyscrapers()
//           .solveSkyscrapers()
//           .solveSkyscrapers();

//         if (puzzle.isSolvedSkyscrapers()) {
//           solvedCount++;
//           solvedPuzzles.push(puzzle._id);

//           continue;
//         }

//         console.log(puzzle.toSkyscrapersString());
//         console.log("/////////////////////////");

//         continue;
//       }

//       if (str.includes(".tenner")) {
//         let puzzle = new PuzzleString(str);

//         puzzle = puzzle
//           .solveTenner()
//           .solveTenner()
//           .solveTenner()
//           .solveTenner()
//           .solveTenner()
//           .solveTenner()
//           .solveTenner()
//           .solveTenner();

//         if (puzzle.isSolvedTenner()) {
//           solvedCount++;
//           solvedPuzzles.push(puzzle._id);

//           continue;
//         }

//         console.log(puzzle.toTennerString());
//         console.log("/////////////////////////");

//         continue;
//       }

//       if (str.includes(".ouod")) {
//         let puzzle = new PuzzleString(str);

//         puzzle = puzzle
//           .solveOneUpOneDown()
//           .solveOneUpOneDown()
//           .solveOneUpOneDown()
//           .solveOneUpOneDown()
//           .solveOneUpOneDown()
//           .solveOneUpOneDown()
//           .solveOneUpOneDown()
//           .solveOneUpOneDown();

//         if (puzzle.isSolvedOneUpOneDown()) {
//           solvedCount++;
//           solvedPuzzles.push(puzzle._id);

//           continue;
//         }

//         console.log(puzzle.toOneUpOneDownString());
//         console.log("/////////////////////////");

//         continue;
//       }

//       if (str.includes(".powergrid")) {
//         const puzzle = new PuzzleString(str);

//         puzzle.solvePowerGrid();
//         puzzle.solvePowerGrid();
//         puzzle.solvePowerGrid();
//         puzzle.solvePowerGrid();
//         puzzle.solvePowerGrid();
//         puzzle.solvePowerGrid();
//         puzzle.solvePowerGrid();
//         puzzle.solvePowerGrid();
//         puzzle.solvePowerGrid();
//         puzzle.solvePowerGrid();
//         puzzle.solvePowerGrid();
//         puzzle.solvePowerGrid();
//         puzzle.solvePowerGrid();
//         puzzle.solvePowerGrid();
//         puzzle.solvePowerGrid();

//         if (puzzle.isSolved()) {
//           solvedCount++;

//           solvedPuzzles.push(puzzle._id);

//           continue;
//         }

//         console.log(puzzle.toPowerGridString());

//         console.log("/////////////////////////");

//         continue;
//       }

//       console.log(`Unknown puzzle: ${str}`);
//     } catch (err) {
//       console.log("/////////////////");
//       console.log(str);
//       console.log(err);
//       console.log("/////////////////");
//     }
//   console.log();

//   const map = new Map<string, Array<string>>();

//   for (const id of solvedPuzzles) {
//     const index = id.indexOf(".");

//     const numberId = id.substring(0, index);

//     const extension = id.substring(index);

//     if (!map.has(extension)) map.set(extension, new Array<string>());

//     map.get(extension)?.push(numberId);
//   }

//   for (const key of map.keys()) {
//     let str = `${key}\n`;

//     const values = map.get(key);

//     if (!values) continue;

//     values.sort();

//     for (const num of values) str += num + ", ";

//     console.log(str);
//   }

//   console.log(`Total solved: ${solvedCount}`);
// }

// let seconds = 0;
// setInterval(function () {
//   seconds++;
// }, 1000);

// const start = new Date();

MainFunction();

// const end = new Date();

// console.log(`[minutes:seconds] == [${end.getMinutes()- start.getMinutes()}:${end.getSeconds()- start.getSeconds()}]`);

// console.log(`Time: ${seconds}`);

// const puzzle = new PuzzleString(Puzzles._Kropki_009);

// puzzle.solveKropki();
// // console.log(puzzle.toKropkiString());

// puzzle.solveKropki();
// // console.log(puzzle.toKropkiString());

// puzzle.solveKropki();
// puzzle.solveKropki();
// console.log(puzzle.toKropkiString());

// puzzle.solveKropki();
// console.log(puzzle.toKropkiString());

// puzzle.solveKropki();
// console.log(puzzle.toKropkiString());
