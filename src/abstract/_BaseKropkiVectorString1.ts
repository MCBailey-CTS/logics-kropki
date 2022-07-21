import { Hash } from "../../Hash";
import { IHash } from "../../IHash";
import { Loc } from "../Loc";
import { _BaseKropkiVector } from "./_BaseKropkiVector";


export abstract class _BaseKropkiVectorString1 extends _BaseKropkiVector {
   constructor(expectedKropkiString: string) {
    super();

    this.__expected = expectedKropkiString;
  }

  private readonly __expected: string;

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
    return this.__expected;
  }
}
