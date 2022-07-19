import { _BaseKropkiChain } from "./src/abstract/_BaseKropkiChain";
import { IEdit } from "./src/interfaces/IEdit";
import { IKropkiSolver } from "./src/interfaces/IKropkiSolver";
import { NewPuzzles } from "./src/NewPuzzles";
import { KropkiPuzzle } from "./src/puzzles/KropkiPuzzle";
import { Chain_b } from "./src/solvers/Chain_b";
import { Chain_bb } from "./src/solvers/Chain_bb";
import { Chain_bw } from "./src/solvers/Chain_bw";
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
import { HiddenSingle } from "./src/solvers/HiddenSingle";
import { IKropkiChain } from "./src/solvers/IKropkiChain";
import { NakedPair } from "./src/solvers/NakedPair";
function main() {
  const puzzleStrings = [
    NewPuzzles._Kropki_022,
    NewPuzzles._Kropki_021,
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
    NewPuzzles._Kropki_005,
    NewPuzzles._Kropki_004,
    NewPuzzles._Kropki_003,
    NewPuzzles._Kropki_002,
    NewPuzzles._Kropki_001,
    NewPuzzles._Kropki_006,
  ];

  // const totalEdits = [];

  let totalEdits = 0;

  const solvedPuzzles = [];

  const masterSolvers: IKropkiChain[] = [
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
  ];

  for (const str of puzzleStrings) {
    // console.log("///////////////");

    const puzzle = new KropkiPuzzle(str);
    try {
      // puzzle.solve(solvers);

      const resultingEdits: IEdit[] = [];

      switch (puzzle.id) {
        case "001.kropki":
        case "002.kropki":
        case "003.kropki":
        case "009.kropki":
        case "018.kropki":
        case "019.kropki":
        case "004.kropki":
        case "005.kropki":
        case "006.kropki":
        case "010.kropki":
        case "007.kropki":
        case "008.kropki":
        case "011.kropki":
        case "012.kropki":
        case "013.kropki":
        case "014.kropki":
        case "015.kropki":
        case "016.kropki":
        case "017.kropki":
        case "020.kropki":
        case "021.kropki":
        case "022.kropki":
          resultingEdits.push(..._BaseKropkiChain.solve(puzzle, masterSolvers));

          break;

        default:
          console.log(`Unknown puzzle: '${puzzle.id}'`);

          break;
      }

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

  console.log();

  console.log(`Total edits: ${totalEdits}`);

  for (const puzzle of solvedPuzzles) {
    console.log(`${puzzle.id}`);
    // console.log(`${puzzle.id} == ${puzzle.edits.length} edits`);
  }

  console.log(`Total solved: ${solvedPuzzles.length}`);

  //
}

main();

export interface IHash {
  get _size(): number;

  get _items(): Array<number>;

  clear(): boolean;

  add(item: number): boolean;
  add_range(items: Array<number>): boolean;

  delete(item: number): boolean;
  delete_range(items: Array<number>): boolean;

  set_equals(hash: IHash): boolean;

  or_union(hash: IHash): IHash;

  and_intersection(hash: IHash): IHash;

  subtract(hash: IHash): IHash;

  is_subset(hash: IHash): boolean;
  is_proper_subset(hash: IHash): boolean;

  is_superset(hash: IHash): boolean;
  is_proper_superset(hash: IHash): boolean;
}

export class Hash implements IHash {
  get _size(): number {
    throw new Error("Method not implemented.");
  }
  get _items(): number[] {
    throw new Error("Method not implemented.");
  }
  clear(): boolean {
    throw new Error("Method not implemented.");
  }
  add(item: number): boolean {
    throw new Error("Method not implemented.");
  }
  add_range(items: number[]): boolean {
    throw new Error("Method not implemented.");
  }
  delete(item: number): boolean {
    throw new Error("Method not implemented.");
  }
  delete_range(items: number[]): boolean {
    throw new Error("Method not implemented.");
  }
  set_equals(hash: IHash): boolean {
    throw new Error("Method not implemented.");
  }
  or_union(hash: IHash): IHash {
    throw new Error("Method not implemented.");
  }
  and_intersection(hash: IHash): IHash {
    throw new Error("Method not implemented.");
  }
  subtract(hash: IHash): IHash {
    throw new Error("Method not implemented.");
  }
  is_subset(hash: IHash): boolean {
    throw new Error("Method not implemented.");
  }
  is_proper_subset(hash: IHash): boolean {
    throw new Error("Method not implemented.");
  }
  is_superset(hash: IHash): boolean {
    throw new Error("Method not implemented.");
  }
  is_proper_superset(hash: IHash): boolean {
    throw new Error("Method not implemented.");
  }
}

// const t = new Hash();

// t.add_range([6, 5, 1, 4, 2, 3, 4, 4, 5]);

// console.log(`set: ${t._size_set}`);
