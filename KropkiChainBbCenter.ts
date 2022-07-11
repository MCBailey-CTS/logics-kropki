import { BaseKropkiSolver } from "./BaseKropkiSolver";
import { IEdit } from "./IEdit";
import { IKropkiPuzzle } from "./IKropkiPuzzle";
import { Loc } from "./Loc";
import { Edit } from "./Edit";


export class KropkiChainBbCenter extends BaseKropkiSolver {
    get id(): string {
        return "KropkiChainBbCenter";
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

                if (str !== "bb")
                    continue;

                const row = new Set<number>([leftCell.row, loc.row, rightCell.row]);
                const col = new Set<number>([leftCell.col, loc.col, rightCell.col]);
                

                if (row.size === 3 || col.size == 3) {
                    switch (puzzle.length) {
                        case 6:
                        case 7:
                            for (const candidate of [1, 3, 4, 5, 6, 7]) {
                                if (puzzle.removeCandidate(loc, candidate))
                                    return new Edit(puzzle, loc, candidate, this);
                            }

                            for (const candidate of [2, 5, 6, 7]) {
                                if (puzzle.removeCandidate(leftCell, candidate))
                                    return new Edit(puzzle, leftCell, candidate, this);
                            }

                            break;
                        case 9:
                            for (const candidate of [1, 3, 5, 6, 7, 8, 9]) {
                                if (puzzle.removeCandidate(loc, candidate))
                                    return new Edit(puzzle, loc, candidate, this);
                            }

                            for (const candidate of [3, 5, 6, 7, 9]) {
                                if (puzzle.removeCandidate(leftCell, candidate))
                                    return new Edit(puzzle, leftCell, candidate, this);
                            }
                            break;
                    }
                }
            }

        return null;
    }
}
