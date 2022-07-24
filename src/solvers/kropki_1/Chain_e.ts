import { Hash } from "../../../Hash";
import { IHash } from "../../../IHash";
import { _BaseKropkiVector } from "../../abstract/_BaseKropkiVector";
import { Edit } from "../../Edit";
import { IEdit } from "../../interfaces/IEdit";
import { Loc } from "../../Loc";


export class Chain_e extends _BaseKropkiVector {
  get vector_chains(): IHash<Loc>[] {
    const _base = new Loc(0, 0);

    const chains: IHash<Loc>[] = [];

    chains.push(new Hash<Loc>([_base.right(2)]));
    chains.push(new Hash<Loc>([_base.up(2)]));
    chains.push(new Hash<Loc>([_base.left(2)]));
    chains.push(new Hash<Loc>([_base.down(2)]));

    return chains;
  }
  get expected_kropki_string(): string {
    return ".";
  }

  solveChain(locs: IHash<Loc>): IEdit[] {
    const edits: IEdit[] = [];

    for (const candidate of this.puzzle.getCellList(locs._at(0))) {
      const kropkiCandidates = [
        ...this.puzzle.getKropkiCandidates(candidate),
        candidate,
      ];

      const otherHash = this.puzzle.getCellList(locs._at(1));

      for (const t of kropkiCandidates)
        otherHash.delete(t);

      if (otherHash._size > 0)
        continue;

      if (!this.puzzle.removeCandidate(locs._at(0), candidate))
        continue;

      edits.push(new Edit(this.puzzle, locs._at(0), candidate, this));
    }

    return edits;
  }
}
