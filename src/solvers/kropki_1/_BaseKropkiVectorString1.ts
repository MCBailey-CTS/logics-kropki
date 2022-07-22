import { Hash } from "../../../Hash";
import { IHash } from "../../../IHash";
import { Loc } from "../../Loc";
import { _BaseKropkiVector } from "../../abstract/_BaseKropkiVector";

export abstract class _BaseKropkiVectorString1 extends _BaseKropkiVector {
  get vector_chains(): IHash<Loc>[] {
    const _base = new Loc(0, 0);

    const chains: IHash<Loc>[] = [];

    chains.push(new Hash<Loc>([_base.right(2)]));
    chains.push(new Hash<Loc>([_base.up(2)]));
    chains.push(new Hash<Loc>([_base.left(2)]));
    chains.push(new Hash<Loc>([_base.down(2)]));

    return chains;
  }
}
