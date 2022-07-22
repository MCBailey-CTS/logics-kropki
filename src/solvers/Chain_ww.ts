// import { Hash } from "../../Hash";
// import { IHash } from "../../IHash";
// import { _BaseKropkiVector } from "../abstract/_BaseKropkiVector";
// import { Edit } from "../Edit";
// import { IEdit } from "../interfaces/IEdit";
// import { IKropkiPuzzle } from "../interfaces/IKropkiPuzzle";
// import { Loc } from "../Loc";

// export class Chain_ww extends _BaseKropkiVector {
//   get vector_chains(): IHash<Loc>[] {
//     const _base = new Loc(0, 0);
//     return [
//       new Hash<Loc>([_base.right(2), _base.right(2)]),
//       new Hash<Loc>([_base.right(2), _base.up(2)]),
//       new Hash<Loc>([_base.right(2), _base.down(2)]),

//       new Hash<Loc>([_base.left(2), _base.left(2)]),
//       new Hash<Loc>([_base.left(2), _base.up(2)]),
//       new Hash<Loc>([_base.left(2), _base.down(2)]),

//       new Hash<Loc>([_base.up(2), _base.up(2)]),
//       new Hash<Loc>([_base.up(2), _base.left(2)]),
//       new Hash<Loc>([_base.up(2), _base.right(2)]),

//       new Hash<Loc>([_base.down(2), _base.down(2)]),
//       new Hash<Loc>([_base.down(2), _base.left(2)]),
//       new Hash<Loc>([_base.down(2), _base.right(2)]),
//     ];
//   }

//   get expected_kropki_string(): string {
//     return "ww";
//   }

//   solveChain(puzzle: IKropkiPuzzle, chain: IHash<Loc>): IEdit[] {
//     const edits: IEdit[] = [];

//     const commonHouses = puzzle.getCommonHouses(locs);

//     if (commonHouses.length == 0) return edits;

//     const edge0 = locs[0];
//     const center = locs[1];
//     const edge1 = locs[2];

//     const edgeSet0 = puzzle.getCellList(edge0);
//     const centerSet = puzzle.getCellList(center);
//     const edgeSet1 = puzzle.getCellList(edge1);

//     for (const candidate of edgeSet0) {
//       if (!edgeSet1.has(candidate - 2) && !edgeSet1.has(candidate + 2)) {
//         edits.push(...this.remove(puzzle, edge0, candidate));
//       }
//     }

//     for (const candidate of edgeSet1) {
//       if (!edgeSet0.has(candidate - 2) && !edgeSet0.has(candidate + 2)) {
//         edits.push(...this.remove(puzzle, edge1, candidate));
//       }
//     }

//     for (const candidate of edgeSet0) {
//       if (!centerSet.has(candidate - 1) && !centerSet.has(candidate + 1)) {
//         edits.push(...this.remove(puzzle, edge0, candidate));
//       }
//     }

//     for (const candidate of edgeSet1) {
//       if (!centerSet.has(candidate - 1) && !centerSet.has(candidate + 1)) {
//         edits.push(...this.remove(puzzle, edge1, candidate));
//       }
//     }

//     return edits;
//   }
// }
