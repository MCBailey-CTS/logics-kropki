// import { _BaseKropkiVectorDiamond } from "../abstract/_BaseKropkiVectorDiamond";
// import { IEdit } from "../interfaces/IEdit";
// import { IKropkiPuzzle } from "../interfaces/IKropkiPuzzle";
// import { Loc } from "../Loc";

// export class Chain_Dbbww extends _BaseKropkiVectorDiamond {
//   get expected_kropki_string(): string {
//     return "bbww";
//   }

//   solveChain(puzzle: IKropkiPuzzle, chain: Loc[]): IEdit[] {
//     const edits: IEdit[] = [];

//     if (
//       puzzle.getCellList(chain[0]).has(1) &&
//       !puzzle.getCellList(chain[2]).has(1)
//     )
//       edits.push(...this.remove(puzzle, chain[0], 1));

//     if (
//       puzzle.getCellList(chain[2]).has(1) &&
//       !puzzle.getCellList(chain[0]).has(1)
//     )
//       edits.push(...this.remove(puzzle, chain[2], 1));

//     return edits;
//   }
// }
