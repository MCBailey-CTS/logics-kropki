import { IHash } from "../../../IHash";
import { _BaseKropkiChain } from "../../abstract/_BaseKropkiChain";
import { Edit } from "../../Edit";
import { IEdit } from "../../interfaces/IEdit";
import { IKropkiPuzzle } from "../../interfaces/IKropkiPuzzle";
import { Loc } from "../../Loc";

export class HiddenPair extends _BaseKropkiChain {
  solve(cellChainLocs: IHash<Loc>): IEdit[] {
    const edits: IEdit[] = [];

    if (this.puzzle.length != cellChainLocs.length) return edits;

    // const map = new Map<number,Set<number>>();
    // for(const )
    for (const candidate0 of this.puzzle.expectedCandidates)
      for (const candidate1 of this.puzzle.expectedCandidates) {
        if (candidate0 == candidate1) continue;

        const set0 = new Set<number>();

        const set1 = new Set<number>();

        for (let i = 0; i < cellChainLocs.length; i++) {
          if (this.puzzle.getCellList(cellChainLocs._at(i)).has(candidate0))
            set0.add(i);

          if (this.puzzle.getCellList(cellChainLocs._at(i)).has(candidate1))
            set1.add(i);
        }

        if (set0.size != 2) continue;

        if (set0.size != set1.size) continue;

        const indexes = [...set0];

        if (
          !indexes.every((index) => {
            return set1.has(index);
          })
        )
          continue;

        // console.log(
        //   `${cellChainLocs[indexes[0]]} ${cellChainLocs[indexes[1]]}`
        // );
        for (const candidate of this.puzzle.expectedCandidates) {
          if (candidate == candidate0 || candidate == candidate1) continue;

          if (
            this.puzzle.removeCandidate(
              cellChainLocs._at(indexes[0]),
              candidate
            )
          )
            edits.push(
              new Edit(
                this.puzzle,
                cellChainLocs._at(indexes[0]),
                candidate,
                this
              )
            );

          if (
            this.puzzle.removeCandidate(
              cellChainLocs._at(indexes[1]),
              candidate
            )
          )
            edits.push(
              new Edit(
                this.puzzle,
                cellChainLocs._at(indexes[1]),
                candidate,
                this
              )
            );
        }
      }

    return edits;
  }

  findChains(): IHash<Loc>[] {
    const chains: IHash<Loc>[] = [];

    for (const house of this.puzzle.getHouses()) chains.push(house);

    return chains;
  }
}
