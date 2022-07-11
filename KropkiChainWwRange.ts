import { BaseKropkiSolver } from "./BaseKropkiSolver";
import { IEdit } from "./IEdit";
import { IKropkiPuzzle } from "./IKropkiPuzzle";
import { Loc } from "./Loc";
import { Edit } from "./Edit";


export class KropkiChainWwRange extends BaseKropkiSolver {
    get id(): string {
        return "KropkiChainWwCenter";
    }

    solveCell(puzzle: IKropkiPuzzle, loc: Loc): IEdit | null {
        const leftIntersections = [
            loc.up(),
            loc.up().up(),
            loc.down(),
            loc.down().down(),
            loc.left(),
            loc.left().left(),
            loc.right(),
            loc.right().right(),
        ];

        const rightIntersections = [
            loc.up(),
            loc.up().up(),
            loc.down(),
            loc.down().down(),
            loc.left(),
            loc.left().left(),
            loc.right(),
            loc.right().right(),
        ];

        for (let i = 0; i < leftIntersections.length; i += 2)
            for (let j = 0; j < leftIntersections.length; j += 2) {
                const leftInt = leftIntersections[i];

                const rightInt = rightIntersections[j];

                const leftCell = leftIntersections[i + 1];

                const rightCell = rightIntersections[j + 1];

                if (!leftCell.isValidKropkiLoc(puzzle.length) ||
                    !rightCell.isValidKropkiLoc(puzzle.length))
                    continue;

                let str = puzzle.getCellString(leftInt) + puzzle.getCellString(rightInt);

                if (str !== "bw" && str !== "wb")
                    continue;

                const row = new Set<number>([leftCell.row, loc.row, rightCell.row]);
                const col = new Set<number>([leftCell.col, loc.col, rightCell.col]);

                if (row.size === 3 || col.size == 3) {
                    if (!puzzle.removeCandidate(loc, 1))
                        continue;

                    return new Edit(puzzle, loc, 1, this);
                }
            }

        return null;
    }
}
