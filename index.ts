import { _BaseKropkiChain } from "./src/abstract/_BaseKropkiChain";
import { IEdit } from "./src/interfaces/IEdit";
import { IFutoshikiSolver } from "./src/interfaces/IFutoshikiSolver";
import { IKropkiSolver } from "./src/interfaces/IKropkiSolver";
import { NewPuzzles } from "./src/NewPuzzles";
import { FutoshikiPuzzle } from "./src/puzzles/FutoshikiPuzzle";
import { KropkiPuzzle } from "./src/puzzles/KropkiPuzzle";
import { Chain_b } from "./src/solvers/Chain_b";
import { Chain_greater_than1 } from "./src/solvers/Chain_greater_than1";
import { Chain_bb } from "./src/solvers/Chain_bb";
import { Chain_bw } from "./src/solvers/Chain_bw";
import { Chain_bww } from "./src/solvers/Chain_bww";
import { Chain_Dbbww } from "./src/solvers/Chain_Dbbww";
import { Chain_Dbwww } from "./src/solvers/Chain_Dbwww";
import { Chain_Debwb } from "./src/solvers/Chain_Debwb";
import { Chain_Debww } from "./src/solvers/Chain_Debww";
import { Chain_Dewbb } from "./src/solvers/Chain_Dewbb";
import { Chain_Dewbw } from "./src/solvers/Chain_Dewbw";
import { Chain_Dewww } from "./src/solvers/Chain_Dewww";
import { Chain_e } from "./src/solvers/Chain_e";
import { Chain_w } from "./src/solvers/Chain_w";
import { Chain_ww } from "./src/solvers/Chain_ww";
import { CrossHatch } from "./src/solvers/CrossHatch";
import { HiddenPair } from "./src/solvers/HiddenPair";
import { HiddenSingle } from "./src/solvers/HiddenSingle";
import { NakedPair } from "./src/solvers/NakedPair";
import { NakedQuad } from "./src/solvers/NakedQuad";

function main() {
  const puzzleStrings = [
    NewPuzzles._MoreOrLess_015,
    NewPuzzles._MoreOrLess_023,

    NewPuzzles._Kropki_022,
    NewPuzzles._Kropki_019,
    NewPuzzles._Kropki_018,
    NewPuzzles._Kropki_017,
    NewPuzzles._Kropki_016,
    NewPuzzles._Kropki_014,
    NewPuzzles._Kropki_013,
    NewPuzzles._Kropki_012,
    NewPuzzles._Kropki_011,
    NewPuzzles._Kropki_009,
    NewPuzzles._Kropki_007,
    NewPuzzles._Kropki_005,
    NewPuzzles._Kropki_004,
    NewPuzzles._Kropki_003,
    NewPuzzles._Kropki_002,
    NewPuzzles._Kropki_001,

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

    NewPuzzles._Kropki_010,
    NewPuzzles._Kropki_006,
    NewPuzzles._Kropki_015,
    NewPuzzles._Kropki_021,
    NewPuzzles._Kropki_020,
    NewPuzzles._Kropki_008,
  ];

  // const totalEdits = [];

  let totalEdits = 0;

  const solvedPuzzles = [];

  const kropkiSolvers: IKropkiSolver[] = [
    new Chain_b(),
    new Chain_e(),
    new Chain_w(),
    new HiddenSingle(),
    new NakedPair(),
    new Chain_bb(),
    new Chain_bw(),
    new Chain_ww(),
    new Chain_Dewbb(),
    new Chain_Debww(),
    new Chain_Dewww(),
    new Chain_Debwb(),
    new Chain_Dewbw(),
    new Chain_Dbwww(),
    new CrossHatch(),
    new Chain_bww(),
    new Chain_Dbbww(),
    new HiddenPair(),
    new NakedQuad(),
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
