import { _BaseKropkiChain } from "./src/abstract/_BaseKropkiChain";
import { IEdit } from "./src/interfaces/IEdit";
import { IFutoshikiSolver } from "./src/interfaces/IFutoshikiSolver";
import { IKropkiSolver } from "./src/interfaces/IKropkiSolver";
import { NewPuzzles } from "./src/NewPuzzles";
import { KropkiPuzzle } from "./src/puzzles/KropkiPuzzle";
import { Chain_b } from "./src/solvers/Chain_b";
import { Chain_Dewbb } from "./src/solvers/Chain_Dewbb";
import { Chain_e } from "./src/solvers/Chain_e";
import { Chain_w } from "./src/solvers/Chain_w";
import { CrossHatch } from "./src/solvers/CrossHatch";
import { HiddenSingle } from "./src/solvers/HiddenSingle";

function main() {
  const puzzleStrings = [
    NewPuzzles._MoreOrLess_015,
    NewPuzzles._MoreOrLess_023,

    

    NewPuzzles._Futoshiki_110,
    NewPuzzles._Futoshiki_099,
    NewPuzzles._Futoshiki_077,
    NewPuzzles._Futoshiki_041,
    NewPuzzles._Futoshiki_034,
    NewPuzzles._Futoshiki_024,
    NewPuzzles._Futoshiki_014,
    NewPuzzles._Futoshiki_013,
    NewPuzzles._Futoshiki_012,
    NewPuzzles._Futoshiki_011,
    NewPuzzles._Futoshiki_010,
    NewPuzzles._Futoshiki_009,
    NewPuzzles._Futoshiki_008,
    NewPuzzles._Futoshiki_007,
    NewPuzzles._Futoshiki_006,
    NewPuzzles._Futoshiki_005,
    NewPuzzles._Futoshiki_004,
    NewPuzzles._Futoshiki_003,
    NewPuzzles._Futoshiki_002,
    NewPuzzles._Futoshiki_001,

    NewPuzzles._Kropki_022,
    NewPuzzles._Kropki_021,
    NewPuzzles._Kropki_020,
    NewPuzzles._Kropki_019,
    NewPuzzles._Kropki_018,
    NewPuzzles._Kropki_017,
    NewPuzzles._Kropki_016,
    NewPuzzles._Kropki_015,
    NewPuzzles._Kropki_014,
    NewPuzzles._Kropki_013,
    NewPuzzles._Kropki_012,
    NewPuzzles._Kropki_011,
    NewPuzzles._Kropki_010,
    NewPuzzles._Kropki_009,
    NewPuzzles._Kropki_008,
    NewPuzzles._Kropki_007,
    NewPuzzles._Kropki_006,
    NewPuzzles._Kropki_005,
    NewPuzzles._Kropki_004,
    NewPuzzles._Kropki_003,
    NewPuzzles._Kropki_002,
    NewPuzzles._Kropki_001
  ];

  // const totalEdits = [];

  let totalEdits = 0;

  const solvedPuzzles = [];

  const kropkiSolvers: IKropkiSolver[] = [
    new Chain_b(),
    new Chain_e(),
    new Chain_w(),
    new HiddenSingle(),
    // new NakedPair(),
    // new Chain_bb(),
    // new Chain_bw(),
    // new Chain_ww(),
    new Chain_Dewbb(),
    // new Chain_Debww(),
    // new Chain_Dewww(),
    // new Chain_Debwb(),
    // new Chain_Dewbw(),
    // new Chain_Dbwww(),
    new CrossHatch(),
    // new Chain_bww(),
    // new Chain_Dbbww(),
    // new HiddenPair(),
    // new NakedQuad(),
  ];

  const futoshikiSolvers: IFutoshikiSolver[] = [
    // new Chain_greater_than1(),
    // new Chain_b(),
    // new Chain_e(),
    // new Chain_w(),
    // new Chain_bb(),
    // new Chain_bw(),
    // new Chain_ww(),
    // new Chain_Dewbb(),
    // new Chain_Debww(),
    // new Chain_Dewww(),
    // new Chain_Debwb(),
    // new Chain_Dewbw(),
    // new Chain_Dbwww(),
    // new Chain_bww(),
    // new Chain_Dbbww(),
    // new HiddenSingle(),
    // new NakedPair(),
    // new CrossHatch(),
    // new HiddenPair(),
    // new NakedQuad(),
  ];

  for (const str of puzzleStrings) {
    if (str.includes(".kropki")) {
      // console.log("///////////////");
      const puzzle = new KropkiPuzzle(str);
      try {
        // puzzle.solve(solvers);

        const resultingEdits: IEdit[] = [];

        resultingEdits.push(..._BaseKropkiChain.solve(puzzle, kropkiSolvers));

        totalEdits += resultingEdits.length;

        if (puzzle.isSolved) {
          solvedPuzzles.push(puzzle);

          continue;
        }

        console.log(puzzle.toString());
        console.log(`Edits: ${resultingEdits.length}`);

        console.log("//////////");
      } catch (err) {
        console.log("//////////");
        console.log(puzzle.id);
        console.log(err);
        console.log("//////////");
      }
    }

    // if (str.includes(".futoshiki") || str.includes(".moreorless")) {
    //   // console.log(str);
    //   // console.log("///////////////");
    //   const puzzle = new FutoshikiPuzzle(str);
    //   try {
    //     // puzzle.solve(solvers);

    //     const resultingEdits: IEdit[] = [];

    //     resultingEdits.push(
    //       ..._BaseKropkiChain.solveFutoshiki(puzzle, futoshikiSolvers)
    //     );

    //     totalEdits += resultingEdits.length;

    //     if (puzzle.isSolved) {
    //       solvedPuzzles.push(puzzle);

    //       continue;
    //     }

    //     console.log(puzzle.toString());
    //     console.log(`Edits: ${resultingEdits.length}`);

    //     console.log("//////////");
    //   } catch (err) {
    //     console.log("//////////");
    //     console.log(puzzle.id);
    //     console.log(err);
    //     console.log("//////////");
    //   }
    // }
  }

  console.log();

  console.log(`Total edits: ${totalEdits}`);

  for (const puzzle of solvedPuzzles) {
    console.log(`${puzzle.id}`);
    // console.log(`${puzzle.id} == ${puzzle.edits.length} edits`);
  }

  console.log(`Total solved: ${solvedPuzzles.length}`);

  //
}

const start = Date.now();

main();

const end = Date.now();

console.log((end - start) / 1000);

// const temp = new Hash<string>();

// temp.add("1");
// temp.add("2");
// temp.add("3");
// temp.add("2");

// for (const l of temp) console.log(l);

// console.log("Count: " + temp._size);

// const temp1 = new Hash<number>();

// temp1.add(1);
// temp1.add(2);
// temp1.add(3);
// temp1.add(2);
// temp1.add(5);
// temp1.add(6);

// for (const l of temp1) console.log(l);

// console.log("Count: " + temp1._size);
