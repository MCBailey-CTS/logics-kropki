import { Loc } from "./Loc";
import { BasePuzzleString } from "./BasePuzzleString";
import { ITechnique } from "./ITechnique";

export class KropkiDiamonds implements ITechnique {
  solve(puzzle: BasePuzzleString): boolean {
    let edited = false;

    for (let r = 1; r < puzzle.length * 2 - 1; r += 2)
      for (let c = 1; c < puzzle.length * 2 - 1; c += 2) {
        const topI = new Loc(r - 1, c);
        const bottomI = new Loc(r + 1, c);
        const leftI = new Loc(r, c - 1);
        const rightI = new Loc(r, c + 1);

        const intersectionString = `${puzzle.getCellString(
          topI
        )}${puzzle.getCellString(leftI)}${puzzle.getCellString(
          rightI
        )}${puzzle.getCellString(bottomI)}`;

        switch (intersectionString) {
          case "www.":
            {
              // w
              //w w
              // .
              edited = puzzle.removeCandidate(topI.left(), 1) || edited;
              edited = puzzle.removeCandidate(topI.right(), 1) || edited;
              edited = puzzle.removeCandidate(topI.left(), 9) || edited;
              edited = puzzle.removeCandidate(topI.right(), 9) || edited;

              const topLeft = Math.min(
                ...puzzle.getCellCandidates(topI.left())
              );

              const topRight = Math.min(
                ...puzzle.getCellCandidates(topI.right())
              );

              const bottomLeft = Math.min(
                ...puzzle.getCellCandidates(bottomI.left())
              );
              const bottomRight = Math.min(
                ...puzzle.getCellCandidates(bottomI.right())
              );

              // top right
              if (topLeft == topRight && topLeft == bottomRight)
                edited =
                  puzzle.removeCandidate(topI.right(), topRight) || edited;

              // top left
              if (topLeft == topRight && topLeft == bottomLeft)
                edited =
                  puzzle.removeCandidate(topI.right(), topLeft) || edited;

              ////// another technique
              // bottom right
              if (puzzle.getCellString(bottomI.right()) == "_2345____")
                edited = puzzle.removeCandidate(bottomI.left(), 3) || edited;

              // bottom left
              if (puzzle.getCellString(bottomI.left()) == "_2345____")
                edited = puzzle.removeCandidate(bottomI.right(), 3) || edited;
            }
            continue;

          case "wbw.":
            {
              // w
              //b w
              // .
              const topLeft = Math.min(
                ...puzzle.getCellCandidates(topI.left())
              );

              const topRight = Math.min(
                ...puzzle.getCellCandidates(topI.right())
              );

              const bottomRight = Math.min(
                ...puzzle.getCellCandidates(bottomI.left())
              );

              // top right
              if (topLeft == topRight && topLeft == bottomRight)
                edited =
                  puzzle.removeCandidate(topI.right(), topRight) || edited;
            }
            continue;

          case "wb.b":
            {
              // w
              //b .
              // b
              edited =
                puzzle.removeCandidate(bottomI.left(), 1, 3, 6, 8) || edited;
            }
            continue;

          case "ww.b":
            {
              // w
              //w .
              // b
              edited = puzzle.removeCandidate(topI.left(), 1, 9) || edited;
              edited = puzzle.removeCandidate(bottomI.left(), 1, 9) || edited;
            }
            continue;
          case ".wwb":
            {
              // .
              //w w
              // b
              edited = puzzle.removeCandidate(bottomI.left(), 1) || edited;
              edited = puzzle.removeCandidate(bottomI.right(), 1) || edited;
            }

            continue;
          case "bw.b":
            {
              // b
              //w .
              // b
              edited = puzzle.removeCandidate(topI.left(), 1) || edited;
              edited = puzzle.removeCandidate(leftI.down(), 1) || edited;
            }

            continue;

          case "ww.w":
            {
              // w
              //w .
              // w
              edited = puzzle.removeCandidate(leftI.up(), 1, 9) || edited;
              edited = puzzle.removeCandidate(leftI.down(), 1, 9) || edited;
            }
            continue;

          case ".www":
            {
              // .
              //w w
              // w
              edited = puzzle.removeCandidate(bottomI.left(), 1, 9) || edited;
              edited = puzzle.removeCandidate(bottomI.right(), 1, 9) || edited;
            }
            continue;

          case "b.ww":
            {
              // w
              //. w
              // b
              const topRight = Math.min(
                ...puzzle.getCellCandidates(topI.right())
              );

              const bottomLeft = Math.min(
                ...puzzle.getCellCandidates(topI.left())
              );

              const bottomRight = Math.min(
                ...puzzle.getCellCandidates(bottomI.right())
              );

              // bottom right
              if (bottomLeft == topRight && bottomLeft == bottomRight)
                edited =
                  puzzle.removeCandidate(bottomI.right(), bottomRight) ||
                  edited;

              // // bottom left
              // if (topLeft == topRight && topLeft == bottomLeft)
              //   puzzle.removeCandidate(topI.right(), topLeft);
            }
            continue;
          case "bw.w":
            {
              // b
              //w .
              // w
              edited = puzzle.removeCandidate(topI.left(), 1) || edited;
            }
            continue;
        }
      }

    return edited;
  }
}
