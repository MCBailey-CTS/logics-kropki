import { Loc } from "./Loc";
import { BasePuzzleString } from "./BasePuzzleString";
import { KropkiExplicitRemoves } from "./KropkiExplicitRemoves";
import { KropkiNextToCells } from "./KropkiNextToCells";
import { GRID } from "./Types";
import { KropkiDiamonds } from "./KropkiDiamonds";
import { ITechnique } from "./ITechnique";
import { LocSet } from "./LocSet";
import { KropkiChain_BW } from "./KropkiChain_BW";
import { KropkiChain_BB } from "./KropkiChain_BB";
import { KropkiDiamondWwwe } from "./KropkiDiamondWwwe";
import { Tech } from "./KropkiTechniques/Tech";
export class KropkiString extends BasePuzzleString {
  constructor(puzzle: string) {
    super(puzzle);
  }

  isIntersectionSolved(c0: number, kropki: string, c1: number): boolean {
    switch (kropki) {
      case "b":
        if (c0 * 2 == c1 || c1 * 2 == c0) return true;
        return false;
      case "w":
        if (c0 + 1 == c1 || c1 + 1 == c0) return true;
        return false;
      case ".":
        if (c0 * 2 == c1) return false;
        if (c1 * 2 == c0) return false;
        if (c0 + 1 == c1) return false;
        if (c1 + 1 == c0) return false;
        return true;
      default:
        return true;
    }
  }

  // isSolved(): boolean {

  //   return super.isSolved();
  // }

  kropkiBlack(loc0: Loc, loc1: Loc): boolean {
    let edited = false;

    for (const strCandidate of this.getCellString(loc0)) {
      if (
        strCandidate == "_" ||
        strCandidate == "a" ||
        strCandidate == "b" ||
        strCandidate == "c" ||
        strCandidate == "d" ||
        strCandidate == "e" ||
        strCandidate == "f" ||
        strCandidate == "g" ||
        strCandidate == "h" ||
        strCandidate == "i"
      )
        continue;

      const candidate = +strCandidate;

      let isValid = false;

      for (const otherCandidate of this.getCellString(loc1)) {
        const other = +otherCandidate;

        if (candidate * 2 == other) isValid = true;

        if (candidate / 2 == other) isValid = true;
      }

      if (isValid) continue;

      const length = this.getCellCandidates(loc0).length;

      this.removeCandidate(loc0, +strCandidate);

      edited = length > this.getCellCandidates(loc0).length || edited;
    }

    return edited;
  }

  kropkiWhite(loc0: Loc, loc1: Loc) {
    let edited = false;

    for (const strCandidate of this.getCellString(loc0)) {
      if (
        strCandidate == "_" ||
        strCandidate == "a" ||
        strCandidate == "b" ||
        strCandidate == "c" ||
        strCandidate == "d" ||
        strCandidate == "e" ||
        strCandidate == "f" ||
        strCandidate == "g" ||
        strCandidate == "h" ||
        strCandidate == "i"
      )
        continue;

      const candidate = +strCandidate;

      let isValid = false;

      for (const otherCandidate of this.getCellString(loc1)) {
        const other = +otherCandidate;

        if (candidate + 1 == other) isValid = true;

        if (candidate - 1 == other) isValid = true;
      }

      if (isValid) continue;

      const length = this.getCellCandidates(loc0).length;

      this.removeCandidate(loc0, +strCandidate);

      edited = length > this.getCellCandidates(loc0).length;
    }

    return edited;
  }

  kropkiEmpty(loc0: Loc, loc1: Loc): boolean {
    let edited = false;

    const cell = this.getCellCandidates(loc1);

    const length = this.getCellCandidates(loc0).length;

    if (cell.length != 1) return false;

    const solved = cell[0];

    if (solved - 1 >= -1) this.removeCandidate(loc0, solved - 1);

    if (solved + 1 <= 9) this.removeCandidate(loc0, solved + 1);

    if (solved % 2 == 0 && solved / 2 >= -1)
      this.removeCandidate(loc0, solved / 2);

    if (solved * 2 < 10) this.removeCandidate(loc0, solved * 2);

    return length > this.getCellCandidates(loc0).length || edited;
  }

  solveIntersections(): boolean {
    let edited = false;

    for (const intersection of this.getKropkiIntersectionLocs(this.length)) {
      const cellLocs = this.getIntersectionCellLocs(intersection);

      const op = this.getCellString(intersection);

      switch (op) {
        case "b":
          edited = this.kropkiBlack(cellLocs[0], cellLocs[1]) || edited;
          edited = this.kropkiBlack(cellLocs[1], cellLocs[0]) || edited;

          if (
            (this.getCellString(cellLocs[0]) == "_2_4___8_" &&
              this.getCellString(cellLocs[1]) == "_2_4___8_") ||
            (this.getCellString(cellLocs[0]) == "_2_4_____" &&
              this.getCellString(cellLocs[1]) == "_2_4___8_") ||
            (this.getCellString(cellLocs[0]) == "_2_4___8_" &&
              this.getCellString(cellLocs[1]) == "_2_4_____")
          ) {
            if (intersection.isKropkiColIntersection)
              for (let r = 0; r < this.length; r++) {
                const row = r * 2;

                if (cellLocs[0].row == row || cellLocs[1].row == row) continue;

                edited =
                  this.removeCandidate(new Loc(row, cellLocs[0].col), 4) ||
                  edited;
              }

            if (intersection.isKropkiRowIntersection)
              for (let c = 0; c < this.length; c++) {
                const col = c * 2;

                if (cellLocs[0].col == col || cellLocs[1].col == col) continue;

                edited =
                  this.removeCandidate(new Loc(cellLocs[0].row, col), 4) ||
                  edited;
              }
          }

          continue;
        case "w":
          edited = this.kropkiWhite(cellLocs[0], cellLocs[1]) || edited;
          edited = this.kropkiWhite(cellLocs[1], cellLocs[0]) || edited;

          if (
            (this.getCellString(cellLocs[0]).includes("_234_____") &&
              this.getCellString(cellLocs[1]).includes("_234_____")) ||
            (this.getCellString(cellLocs[0]).includes("_234_____") &&
              this.getCellString(cellLocs[1]).includes("__34_____")) ||
            (this.getCellString(cellLocs[0]).includes("__34_____") &&
              this.getCellString(cellLocs[1]).includes("_234_____"))
          ) {
            if (intersection.isKropkiColIntersection)
              for (let r = 0; r < this.length; r++) {
                const row = r * 2;

                if (cellLocs[0].row == row || cellLocs[1].row == row) continue;

                edited =
                  this.removeCandidate(new Loc(row, cellLocs[0].col), 3) ||
                  edited;
              }

            if (intersection.isKropkiRowIntersection)
              for (let c = 0; c < this.length; c++) {
                const col = c * 2;

                if (cellLocs[0].col == col || cellLocs[1].col == col) continue;

                edited =
                  this.removeCandidate(new Loc(cellLocs[0].row, col), 3) ||
                  edited;
              }
          }
          continue;
        case ".":
          edited = this.kropkiEmpty(cellLocs[0], cellLocs[1]) || edited;
          edited = this.kropkiEmpty(cellLocs[1], cellLocs[0]) || edited;
          continue;
        default:
          throw Error(
            `Unknown kropki intersection candidate '${op}' in location '${intersection.toString()}'`
          );
      }
    }

    return edited;
  }

  solveCellIntersections(loc: Loc): boolean {
    const upInter = loc.up();
    const downInter = loc.down();
    const leftInter = loc.left();
    const rightInter = loc.right();

    const upCell = upInter.up();
    const downCell = downInter.down();
    const leftCell = leftInter.left();
    const rightCell = rightInter.right();

    let edited = this.solveExplicitNextTo(loc);

    if (upCell.isValidKropkiLoc(this.length)) {
      edited = this.solveCellIntersection(loc, upInter, upCell) || edited;

      edited = this.solveCellIntersectionChain(loc, upInter, upCell) || edited;

      edited = this.solveCellIntersectionNextTo(loc, upInter, upCell) || edited;
    }

    if (downCell.isValidKropkiLoc(this.length)) {
      edited = this.solveCellIntersection(loc, downInter, downCell) || edited;

      edited =
        this.solveCellIntersectionChain(loc, downInter, downCell) || edited;

      edited =
        this.solveCellIntersectionNextTo(loc, downInter, downCell) || edited;
    }

    if (leftCell.isValidKropkiLoc(this.length)) {
      edited = this.solveCellIntersection(loc, leftInter, leftCell) || edited;

      edited =
        this.solveCellIntersectionChain(loc, leftInter, leftCell) || edited;

      edited =
        this.solveCellIntersectionNextTo(loc, leftInter, leftCell) || edited;
    }

    if (rightCell.isValidKropkiLoc(this.length)) {
      edited = this.solveCellIntersection(loc, rightInter, rightCell) || edited;

      edited =
        this.solveCellIntersectionChain(loc, rightInter, rightCell) || edited;

      edited =
        this.solveCellIntersectionNextTo(loc, rightInter, rightCell) || edited;
    }

    return this.solveDiamondIntersections(loc) || edited;
  }

  solveCellIntersectionNextTo(
    loc: Loc,
    intersection: Loc,
    other: Loc
  ): boolean {
    let edited = false;

    if (this.getCellString(intersection) != ".") return false;

    const candidates0 = this.getCellCandidates(loc);

    // 2345 => 4
    if (
      KropkiString.equalSets([2, 3, 4, 5], candidates0) ||
      KropkiString.isSubset([2, 3, 4, 5], candidates0)
    )
      edited = this.removeCandidate(other, 4) || edited;

    // 2346 => 3
    if (
      KropkiString.equalSets([2, 3, 4, 6], candidates0) ||
      KropkiString.isSubset([2, 3, 4, 6], candidates0)
    )
      edited = this.removeCandidate(other, 3) || edited;

    return edited;
  }

  static isSubset(original: number[], possibleSubset: number[]): boolean {
    let i = 0;
    let j = 0;
    for (i = 0; i < possibleSubset.length; i++) {
      for (j = 0; j < original.length; j++) {
        if (possibleSubset[i] == original[j]) break;
      }

      /* If the above inner loop was
      not broken at all then arr2[i]
      is not present in arr1[] */
      if (j == original.length) return false;
    }

    /* If we reach here then all
    elements of arr2[] are present
    in arr1[] */
    return true;
  }

  static equalSets(arr1: number[], arr2: number[]) {
    const s0 = new Set<number>(arr1);
    const s1 = new Set<number>(arr2);

    if (s0.size != s1.size) return false;

    for (const item of [...s0]) if (!s1.has(item)) return false;

    return true;
  }

  solveCellIntersection(cellLoc0: Loc, kropkiLoc: Loc, cellLoc1: Loc): boolean {
    switch (this.getCellString(kropkiLoc)) {
      case "b":
        return this.kropkiBlack(cellLoc0, cellLoc1);
      case "w":
        return this.kropkiWhite(cellLoc0, cellLoc1);
      case ".":
        return this.kropkiEmpty(cellLoc0, cellLoc1);
      default:
        throw new Error(
          `Unknown kropki string for Loc ${kropkiLoc.toString()} '${this.getCellString(
            kropkiLoc
          )}'`
        );
    }
  }

  solveConsecutiveWhites(
    chainLocs: Loc[],
    cellIndexesList: number[],
    cellLocSet: LocSet
  ): boolean {
    let edited = false;

    const candidatesInLocs = new Set<number>();

    for (const cellLoc of cellLocSet.values)
      for (const candidate of this.getCellCandidates(cellLoc))
        candidatesInLocs.add(candidate);

    edited =
      this.removeCandidate(
        chainLocs[2],
        Math.min(...candidatesInLocs),
        Math.max(...candidatesInLocs)
      ) || edited;

    const candidatesList = [...candidatesInLocs].sort((a, b) => a - b);

    const minIndex = candidatesList.length - cellIndexesList.length;

    const maxIndex = cellIndexesList.length - 1;

    const requiredCandiates = [];

    for (let index = minIndex; index <= maxIndex; index++)
      requiredCandiates.push(candidatesList[index]);

    let cellLocs: LocSet | undefined;

    if (
      cellIndexesList.every((index) => chainLocs[0].inSameRow(chainLocs[index]))
    )
      cellLocs = new LocSet(this.getCellRowHouseLocs(chainLocs[0].row / 2));

    if (
      cellIndexesList.every((index) => chainLocs[0].inSameCol(chainLocs[index]))
    ) {
      cellLocs = new LocSet(this.getCellColHouseLocs(chainLocs[0].col / 2));
    }

    if (typeof cellLocs == "undefined") return edited;

    for (const cellIndex of cellIndexesList)
      cellLocs.delete(chainLocs[cellIndex]);

    for (const required of requiredCandiates)
      for (const loc of cellLocs.values)
        edited = this.removeCandidate(loc, required) || edited;

    const cells = [];

    for (const i of cellIndexesList) cells.push(chainLocs[i]);

    edited = this.solveConsecutiveWhiteRange(cells) || edited;

    cells.reverse();

    return this.solveConsecutiveWhiteRange(cells) || edited;
  }

  solveCellIntersectionChain(...chainLocs: Loc[]): boolean {
    if (this.length != 9) return false;

    if (chainLocs.length < 3)
      throw Error(`Not enough locs in chain: ${chainLocs.length}`);

    if (chainLocs.length % 2 == 2)
      throw Error(
        `Cannot have an even number of locs for chain : ${chainLocs.length}`
      );

    const lastInter = this.getCellString(chainLocs[chainLocs.length - 2]);

    if (lastInter == ".") return false;

    // all cell locs must be in the same row, same col, or same fence

    const rowIndexes = new Set<number>();
    const colIndexes = new Set<number>();

    for (let i = 0; i < chainLocs.length; i += 2) {
      rowIndexes.add(chainLocs[i].row);
      colIndexes.add(chainLocs[i].col);
    }

    if (rowIndexes.size != 1 && colIndexes.size != 1) return false;

    const cellLocSet = new LocSet();
    const kropkiLocSet = new LocSet();

    const cellIndexesList = [];
    const kropkiIndexesList = [];

    for (let i = 0; i < chainLocs.length; i++)
      if (i % 2 == 0) {
        cellLocSet.add(chainLocs[i]);
        cellIndexesList.push(i);
      } else {
        kropkiLocSet.add(chainLocs[i]);
        kropkiIndexesList.push(i);
      }

    // Find locs attached to tail.

    const tail = chainLocs[chainLocs.length - 1];

    const upInter = tail.up();
    const downInter = tail.down();
    const leftInter = tail.left();
    const rightInter = tail.right();

    const upCell = upInter.up();
    const downCell = downInter.down();
    const leftCell = leftInter.left();
    const rightCell = rightInter.right();

    let edited = false;

    if (upCell.isValidKropkiLoc(this.length) && !cellLocSet.has(upCell)) {
      const newChain: Loc[] = [...chainLocs, upInter, upCell];

      edited = this.solveCellIntersectionChain(...newChain) || edited;
    }

    if (downCell.isValidKropkiLoc(this.length) && !cellLocSet.has(downCell)) {
      const newChain: Loc[] = [...chainLocs, downInter, downCell];

      edited = this.solveCellIntersectionChain(...newChain) || edited;
    }

    if (rightCell.isValidKropkiLoc(this.length) && !cellLocSet.has(rightCell)) {
      const newChain: Loc[] = [...chainLocs, rightInter, rightCell];

      edited = this.solveCellIntersectionChain(...newChain) || edited;
    }

    if (leftCell.isValidKropkiLoc(this.length) && !cellLocSet.has(leftCell)) {
      const newChain: Loc[] = [...chainLocs, leftInter, leftCell];

      edited = this.solveCellIntersectionChain(...newChain) || edited;
    }

    let str = "";

    for (const index of kropkiIndexesList)
      str += this.getCellString(chainLocs[index]);

    switch (str) {
      case "w":
        break;
      case "b":
        // if(this.getCellSet(chainLocs[0]))

        break;
      case ".":
        break;
      case "ww":
      case "www":
        edited =
          this.solveConsecutiveWhites(chainLocs, cellIndexesList, cellLocSet) ||
          edited;
        break;
      case "bb":
        edited = new KropkiChain_BB().solve(this, chainLocs) || edited;
        break;
      case "wb":
      case "bw":
        edited = new KropkiChain_BW().solve(this, chainLocs) || edited;
        break;
      case "bwwbb":
        break;
      case "bwwbb":
        break;
      case "wbb":
        break;
      case "wwb":
        break;
      case "bww":
        break;
      case "bbw":
        break;
      case "wwbb":
        break;
      case "bbww":
        break;
      case "bwwb":
        break;
      case "bbwwb":
        break;
      case "wbw":
        break;
      case "bwb":
        break;
      case "bwbw":
        break;

      case "wwbw":
        break;
      case "wbwb":
        break;
      case "wbww":
        break;
      default:
        console.log(`Unknown kropki chain '${str}' in ${this.id}`);
        break;
    }

    // console.log(str);

    // if (leftCell.isValidKropkiLoc(this.length)&& !cellLocSet.has(leftCell))
    //   edited = this.solveCellIntersectionChain(loc, leftInter, leftCell) || edited;

    // if (rightCell.isValidKropkiLoc(this.length))
    //   edited = this.solveCellIntersectionChain(loc, rightInter, rightCell) || edited;

    return edited;

    // console.log(chainLocs[0].toString() + " " + chainLocs[1].toString());
    // console.log([...kropkiIndexes]);
  }

  solveExplicitNextTo(loc: Loc): boolean {
    let edited = false;

    const candidates = this.getCellCandidates(loc);

    if (KropkiString.isSubset([1, 2, 3, 4], candidates))
      edited = this.removeUpDownLeftRight(loc, 2) || edited;

    return edited;
  }

  solveConsecutiveWhiteRange(cells: Loc[]): boolean {
    let edited = false;

    // one way.

    const cellSets: Set<number>[] = cells.map((loc) => this.getCellSet(loc));

    for (const candidate of this.getCellCandidates(cells[0])) {
      let item = candidate;

      if (cellSets.every((cellSet) => cellSet.has(item++))) continue;

      item = candidate;

      if (cellSets.every((cellSet) => cellSet.has(item--))) continue;

      edited = this.removeCandidate(cells[0], candidate) || edited;
    }

    return edited;
  }

  private kropkiDiamondWeee(
    rightValue: string,
    topValue: string,
    downValue: string,
    leftValue: string,
    tlSet: Set<number>,
    trSet: Set<number>,
    drSet: Set<number>,
    edited: boolean,
    downInt: Loc
  ) {
    if (
      rightValue == "w" &&
      topValue == "." &&
      downValue == "." &&
      leftValue == "."
    ) {
      if (
        KropkiString.equalSets([1, 2, 6, 8], [...tlSet]) ||
        KropkiString.equalSets([3, 4, 5], [...trSet]) ||
        KropkiString.equalSets([2, 4, 5], [...drSet])
      )
        edited = this.removeCandidate(downInt.left(), 3) || edited;
    }
    return edited;
  }

  private kropkiDiamondEweb(
    rightValue: string,
    topValue: string,
    downValue: string,
    leftValue: string,
    tlSet: Set<number>,
    trSet: Set<number>,
    dlSet: Set<number>,
    edited: boolean,
    downInt: Loc
  ) {
    if (
      rightValue == "w" &&
      topValue == "." &&
      downValue == "." &&
      leftValue == "b"
    ) {
      if (
        KropkiString.equalSets([1, 2, 4, 6, 8], [...tlSet]) ||
        KropkiString.equalSets([2, 4, 6, 8], [...trSet]) ||
        KropkiString.equalSets([1, 3, 6], [...dlSet])
      )
        edited = this.removeCandidate(downInt.right(), 3) || edited;
    }
    return edited;
  }

  private kropkiDiamondEweb1(
    rightValue: string,
    topValue: string,
    downValue: string,
    leftValue: string,
    drSet: Set<number>,
    trSet: Set<number>,
    dlSet: Set<number>,
    edited: boolean,
    topInt: Loc
  ) {
    if (
      rightValue == "w" &&
      topValue == "." &&
      downValue == "." &&
      leftValue == "b"
    ) {
      if (
        KropkiString.equalSets([1, 5, 7, 9], [...drSet]) ||
        KropkiString.equalSets([2, 4, 8], [...trSet]) ||
        KropkiString.equalSets([3, 6], [...dlSet])
      )
        edited = this.removeCandidate(topInt.left(), 3) || edited;
    }
    return edited;
  }

  private kropkiDiamondWbww(
    rightValue: string,
    topValue: string,
    downValue: string,
    leftValue: string,
    edited: boolean,
    topInt: Loc,
    downInt: Loc,
    diamondString: string,
    rightInt: Loc,
    leftInt: Loc
  ) {
    if (
      rightValue == "b" &&
      topValue == "w" &&
      downValue == "w" &&
      leftValue == "w"
    ) {
      edited = this.removeCandidate(topInt.right(), 4) || edited;
      edited = this.removeCandidate(downInt.right(), 4) || edited;
    }

    switch (diamondString) {
      case ".www":
      case "w.ww":
      case "ww.w":
      case "www.":
        // create chain
        //intersection cell intersection cell
        const diamond = [
          topInt,
          topInt.right(),
          rightInt,
          rightInt.down(),
          downInt,
          downInt.left(),
          leftInt,
          leftInt.up(),
        ];

        edited = new KropkiDiamondWwwe().solve(this, diamond) || edited;
        break;
    }
    return edited;
  }

  private kropkiDiamondWewb(
    topValue: string,
    rightValue: string,
    downValue: string,
    leftValue: string,
    edited: boolean,
    leftInt: Loc
  ) {
    if (
      topValue == "w" &&
      rightValue == "." &&
      downValue == "w" &&
      leftValue == "b"
    ) {
      // 123456789 w 123456789    _23456789 w 12_456789
      //     b           .     ->     b           .
      // 123456789 w 123456789    _23456789 w 123456789
      edited = this.removeCandidate(leftInt.up(), 1) || edited;
      edited = this.removeCandidate(leftInt.down(), 1) || edited;
    }
    return edited;
  }

  solveDiamondIntersections(topLeftCell: Loc): boolean {
    // if (this.length != 9) return false;

    if (
      topLeftCell.row == this.length * 2 - 2 ||
      topLeftCell.col == this.length * 2 - 2
    )
      return false;

    let edited = false;

    const topInt = topLeftCell.right();
    const leftInt = topLeftCell.down();
    const rightInt = leftInt.right().right();
    const downInt = topInt.down().down();

    const topValue = this.getCellString(topInt);
    const leftValue = this.getCellString(leftInt);
    const rightValue = this.getCellString(rightInt);
    const downValue = this.getCellString(downInt);

    const drCell = downInt.right();
    const dlCell = downInt.left();
    const trCell = topInt.right();
    const tlCell = topInt.left();

    const drSet = this.getCellSet(downInt.right());
    const dlSet = this.getCellSet(downInt.left());
    const trSet = this.getCellSet(topInt.right());
    const tlSet = this.getCellSet(topInt.left());

    const diamond = [
      topInt,
      topInt.right(),
      rightInt,
      rightInt.down(),
      downInt,
      downInt.left(),
      leftInt,
      leftInt.up(),
    ];

    // clockwise
    const diamondString = `${topValue}${rightValue}${downValue}${leftValue}`;

    edited = this.kropkiDiamondWeee(
      rightValue,
      topValue,
      downValue,
      leftValue,
      tlSet,
      trSet,
      drSet,
      edited,
      downInt
    );

    edited = this.kropkiDiamondEweb(
      rightValue,
      topValue,
      downValue,
      leftValue,
      tlSet,
      trSet,
      dlSet,
      edited,
      downInt
    );

    edited = this.kropkiDiamondEweb1(
      rightValue,
      topValue,
      downValue,
      leftValue,
      drSet,
      trSet,
      dlSet,
      edited,
      topInt
    );

    edited = this.kropkiDiamondWbww(
      rightValue,
      topValue,
      downValue,
      leftValue,
      edited,
      topInt,
      downInt,
      diamondString,
      rightInt,
      leftInt
    );

    edited = this.kropkiDiamondWewb(
      topValue,
      rightValue,
      downValue,
      leftValue,
      edited,
      leftInt
    );

    // edited =
    //   Tech.kropkiDiamondWeww1(
    //     this,
    //     topValue,
    //     rightValue,
    //     downValue,
    //     leftValue,
    //     topInt,
    //     downInt
    //   ) || edited;

    // edited =
    //   Tech.kropkiDiamondWeww0(
    //     this,
    //     topValue,
    //     rightValue,
    //     downValue,
    //     leftValue,
    //     topInt,
    //     downInt
    //   ) || edited;

    // edited =
    //   Tech.kropkiDiamondWwew0(
    //     this,
    //     rightValue,
    //     topValue,
    //     downValue,
    //     leftValue,
    //     downInt
    //   ) || edited;

    // edited =
    //   Tech.kropkiDiamondWwew6(
    //     this,
    //     rightValue,
    //     topValue,
    //     downValue,
    //     leftValue,
    //     downInt
    //   ) || edited;

    // if (
    //   rightValue == "w" &&
    //   topValue == "w" &&
    //   downValue == "." &&
    //   leftValue == "w"
    // )
    //   edited =
    //     Tech.kropkiDiamondWwew(this, downInt.left(), downInt.right()) || edited;

    if (
      topValue == "w" &&
      rightValue == "w" &&
      downValue == "." &&
      leftValue == "w"
    )
      edited =
        this.kropkiDiamondWwew4(
          downInt.left(),
          downInt.right(),
          topInt.right(),
          topInt.left()
        ) || edited;

    return edited;
  }

  private kropkiDiamondWwew4(
    removeDL: Loc,
    removeDR: Loc,
    cornerTR: Loc,
    cornerTL: Loc
  ): boolean {
    let edited = false;

    if (!this.getCellSet(cornerTR).has(2) && !this.getCellSet(cornerTL).has(4))
      edited = this.removeCandidate(removeDR, 3) || edited;

    if (!this.getCellSet(cornerTL).has(4) && !this.getCellSet(cornerTR).has(2))
      edited = this.removeCandidate(removeDL, 3) || edited;

    return edited;
  }
}

// 1207
