import { Loc } from "./Loc";
import { LocSet } from "./LocSet";
import { cellCandidates, LOC, solveSudokuCrossHatch } from "./PuzzleString";

export class Techniques {
  static solveSkyscrapersHouse(
    _gridString: string[][],
    length: number,
    houseLocs: Loc[],
    scraper: number | undefined
  ) {
    const candidates = [];

    for (let i = 1; i <= length; i++) candidates.push(i);

    if (!scraper) return;

    if (scraper == 1)
      if (houseLocs.length == length) {
        const max = Math.max(...candidates);

        const loc = houseLocs[0];

        for (const candidate of candidates) {
          if (candidate == max) continue;

          _gridString[loc.row][loc.col] = _gridString[loc.row][loc.col].replace(
            `${candidate}`,
            "_"
          );
        }
      }

    if (houseLocs.length == length && scraper == houseLocs.length) {
      let allCandidates: number[] = [];

      for (const loc of houseLocs) {
        const cell = _gridString[loc.row][loc.col];

        allCandidates.push(...cellCandidates(cell));
      }

      allCandidates = [...new Set<number>(allCandidates)];

      allCandidates.sort((a, b) => a - b);

      for (let i = 0; i < length; i++) {
        const candidate = allCandidates[i];

        const hash = new Set<number>(allCandidates);

        hash.delete(candidate);

        const loc = houseLocs[i];

        for (const c of hash)
          _gridString[loc.row][loc.col] = _gridString[loc.row][loc.col].replace(
            `${c}`,
            "_"
          );
      }
    }
  }

  // static isValidKropkiBlack():boolean{}

  static kropkiBlack(_gridString: string[][], loc0: Loc, loc1: Loc) {
    for (const strCandidate of _gridString[loc0.row][loc0.col]) {
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

      for (const otherCandidate of _gridString[loc1.row][loc1.col]) {
        const other = +otherCandidate;

        if (candidate * 2 == other) isValid = true;

        if (candidate / 2 == other) isValid = true;
      }

      if (isValid) continue;

      _gridString[loc0.row][loc0.col] = _gridString[loc0.row][loc0.col].replace(
        strCandidate,
        "_"
      );
    }
  }

  static kropkiWhite(_gridString: string[][], loc0: Loc, loc1: Loc) {
    for (const strCandidate of _gridString[loc0.row][loc0.col]) {
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

      for (const otherCandidate of _gridString[loc1.row][loc1.col]) {
        const other = +otherCandidate;

        if (candidate + 1 == other) isValid = true;

        if (candidate - 1 == other) isValid = true;
      }

      if (isValid) continue;

      _gridString[loc0.row][loc0.col] = _gridString[loc0.row][loc0.col].replace(
        strCandidate,
        "_"
      );
    }
  }

  static kropkiEmpty(_gridString: string[][], loc0: Loc, loc1: Loc) {
    // return cell0;

    const cell = cellCandidates(_gridString[loc1.row][loc1.col]);

    if (cell.length != 1) return;

    const solved = cell[0];

    if (solved - 1 >= -1)
      _gridString[loc0.row][loc0.col] = _gridString[loc0.row][loc0.col].replace(
        `${solved - 1}`,
        "_"
      );

    if (solved + 1 <= 9)
      _gridString[loc0.row][loc0.col] = _gridString[loc0.row][loc0.col].replace(
        `${solved + 1}`,
        "_"
      );

    if (solved % 2 == 0 && solved / 2 >= -1)
      _gridString[loc0.row][loc0.col] = _gridString[loc0.row][loc0.col].replace(
        `${solved / 2}`,
        "_"
      );

    if (solved * 2 < 10)
      _gridString[loc0.row][loc0.col] = _gridString[loc0.row][loc0.col].replace(
        `${solved * 2}`,
        "_"
      );
  }

  static gridStringToStringPowerGrid(
    gridString: string[][],
    length: number
  ): string {
    let str = "";

    for (let r = 0; r < length + 1; r++) {
      for (let c = 0; c < length + 1; c++)
        switch (gridString[r][c]) {
          case ".p":
            str += `.p `;
            continue;
          case "_p":
          case "p":
            str += `p  `;
            continue;
          case "._":
          case ".":
            str += `.  `;
            continue;
          case "1":
          case "2":
          case "3":
          case "4":
          case "5":
          case "6":
          case "7":
          case "8":
          case "?":
          case "$":
            if (r == length) str += `${gridString[r][c]}  `;
            else str += `${gridString[r][c]} `;
            continue;
          default:
            throw Error(`Unknown candidate '${gridString[r][c]}'`);
        }

      str += "\n";
    }

    return str;
  }

  static solveSudokuNakedPair(length: number, house: string[]) {
    for (let i = 0; i < length; i++)
      for (let ii = 0; ii < length; ii++) {
        const indexes = new Set<number>([i, ii]);

        if (indexes.size != 2) continue;

        const candidates = [];

        candidates.push(...cellCandidates(house[i]));

        candidates.push(...cellCandidates(house[ii]));

        const hash = new Set<number>(candidates);

        if (hash.size != 2) continue;

        Techniques.removeNakedCandidates(house, length, indexes, hash);
      }
  }

  static removeNakedCandidates(
    house: string[],
    length: number,
    indexes: Set<number>,
    hash: Set<number>
  ) {
    for (const candidate of hash)
      for (let j = 0; j < length; j++) {
        if (indexes.has(j)) continue;

        house[j] = house[j].replace(`${candidate}`, "_");
      }
  }

  static nakedPair(_gridString: string[][], _length: number, locs: LOC[]) {
    const powerLocs: LOC[] = [];
    const unfilledLocs: LOC[] = [];
    const emptyLocs: LOC[] = [];
    for (let k = 0; k < locs.length; k++) {
      const loc = locs[k];

      switch (_gridString[loc[0]][loc[1]]) {
        case ".":
          emptyLocs.push(loc);
          continue;
        case "_":
          unfilledLocs.push(loc);
          continue;
        case "p":
          powerLocs.push(loc);
          continue;
      }
    }

    if (unfilledLocs.length == 2 && powerLocs.length == 0) {
      _gridString[unfilledLocs[0][0]][unfilledLocs[0][1]] = "p";
      _gridString[unfilledLocs[1][0]][unfilledLocs[1][1]] = "p";
    }

    if (
      unfilledLocs.length == 1 &&
      powerLocs.length == 1 &&
      emptyLocs.length == _length - 2
    ) {
      _gridString[unfilledLocs[0][0]][unfilledLocs[0][1]] = "p";
    }

    if (
      unfilledLocs.length == 1 &&
      powerLocs.length == 1 &&
      emptyLocs.length == _length - 2
    )
      _gridString[unfilledLocs[0][0]][unfilledLocs[0][1]] = "p";
  }

  static solveSudokuNakedTriple(length: number, house: string[]) {
    for (let i = 0; i < length; i++)
      for (let ii = 0; ii < length; ii++)
        for (let iii = 0; iii < length; iii++) {
          const indexes = new Set<number>([i, ii, iii]);

          if (indexes.size != 3) continue;

          const candidates = [];

          candidates.push(...cellCandidates(house[i]));

          candidates.push(...cellCandidates(house[ii]));

          candidates.push(...cellCandidates(house[iii]));

          const hash = new Set<number>(candidates);

          if (hash.size != 3) continue;

          for (const candidate of hash)
            for (let j = 0; j < length; j++) {
              if (indexes.has(j)) continue;

              house[j] = house[j].replace(`${candidate}`, "_");
            }
        }
  }

  static solveSudokuQuadTriple(length: number, house: string[]) {
    for (let i = 0; i < length; i++)
      for (let ii = 0; ii < length; ii++)
        for (let iii = 0; iii < length; iii++)
          for (let iiii = 0; iiii < length; iiii++) {
            const indexes = new Set<number>([i, ii, iii, iiii]);

            if (indexes.size != 4) continue;

            const candidates = [];

            candidates.push(...cellCandidates(house[i]));

            candidates.push(...cellCandidates(house[ii]));

            candidates.push(...cellCandidates(house[iii]));

            candidates.push(...cellCandidates(house[iiii]));

            const hash = new Set<number>(candidates);

            if (hash.size != 4) continue;

            for (const candidate of hash)
              for (let j = 0; j < length; j++) {
                if (indexes.has(j)) continue;

                house[j] = house[j].replace(`${candidate}`, "_");
              }
          }
  }

  static hiddenPair(_gridString: string[][], locs: LOC[]) {
    const powerLocs: LOC[] = [];
    const unfilledLocs: LOC[] = [];
    const emptyLocs: LOC[] = [];
    for (let k = 0; k < locs.length; k++) {
      const loc = locs[k];

      switch (_gridString[loc[0]][loc[1]]) {
        case ".":
          emptyLocs.push(loc);
          continue;
        case "_":
          unfilledLocs.push(loc);
          continue;
        case "p":
          powerLocs.push(loc);
          continue;
      }
    }

    if (powerLocs.length != 2) return;

    for (const loc of unfilledLocs) _gridString[loc[0]][loc[1]] = ".";
  }

  static solveSudokuHiddenSingle(length: number, house: string[]) {
    switch (length) {
      case 3:
        for (const candidate of [1, 2, 3]) {
          const strCandidate = `${candidate}`;

          const indexes = [];

          for (let i = 0; i < length; i++) {
            if (house[i].includes(strCandidate)) indexes.push(i);
          }

          if (indexes.length > 1) continue;

          for (const other of [1, 2, 3]) {
            if (other == candidate) continue;

            house[indexes[0]] = house[indexes[0]].replace(`${other}`, "_");
          }
        }

        break;
      case 4:
        for (const candidate of [1, 2, 3, 4]) {
          const strCandidate = `${candidate}`;

          const indexes = [];

          for (let i = 0; i < length; i++) {
            if (house[i].includes(strCandidate)) indexes.push(i);
          }

          if (indexes.length > 1) continue;

          for (const other of [1, 2, 3, 4]) {
            if (other == candidate) continue;

            house[indexes[0]] = house[indexes[0]].replace(`${other}`, "_");
          }
        }

        break;
      case 5:
        for (const candidate of [1, 2, 3, 4, 5]) {
          const strCandidate = `${candidate}`;

          const indexes = [];

          for (let i = 0; i < length; i++) {
            if (house[i].includes(strCandidate)) indexes.push(i);
          }

          if (indexes.length > 1) continue;

          for (const other of [1, 2, 3, 4, 5]) {
            if (other == candidate) continue;

            house[indexes[0]] = house[indexes[0]].replace(`${other}`, "_");
          }
        }

        break;
      case 6:
        for (const candidate of [1, 2, 3, 4, 5, 6]) {
          const strCandidate = `${candidate}`;

          const indexes = [];

          for (let i = 0; i < length; i++) {
            if (house[i].includes(strCandidate)) indexes.push(i);
          }

          if (indexes.length > 1) continue;

          for (const other of [1, 2, 3, 4, 5, 6]) {
            if (other == candidate) continue;

            house[indexes[0]] = house[indexes[0]].replace(`${other}`, "_");
          }
        }

        break;

      case 7:
        for (const candidate of [1, 2, 3, 4, 5, 6, 7]) {
          const strCandidate = `${candidate}`;

          const indexes = [];

          for (let i = 0; i < length; i++) {
            if (house[i].includes(strCandidate)) indexes.push(i);
          }

          if (indexes.length > 1) continue;

          for (const other of [1, 2, 3, 4, 5, 6, 7]) {
            if (other == candidate) continue;

            house[indexes[0]] = house[indexes[0]].replace(`${other}`, "_");
          }
        }

        break;

      case 8:
        for (const candidate of [1, 2, 3, 4, 5, 6, 7, 8]) {
          const strCandidate = `${candidate}`;

          const indexes = [];

          for (let i = 0; i < length; i++) {
            if (house[i].includes(strCandidate)) indexes.push(i);
          }

          if (indexes.length > 1) continue;

          for (const other of [1, 2, 3, 4, 5, 6, 7, 8]) {
            if (other == candidate) continue;

            house[indexes[0]] = house[indexes[0]].replace(`${other}`, "_");
          }
        }

        break;

      case 9:
        for (const candidate of [1, 2, 3, 4, 5, 6, 7, 8, 9]) {
          const strCandidate = `${candidate}`;

          const indexes = [];

          for (let i = 0; i < length; i++) {
            if (house[i].includes(strCandidate)) indexes.push(i);
          }

          if (indexes.length > 0) continue;

          for (const other of [1, 2, 3, 4, 5, 6, 7, 8, 9]) {
            if (other == candidate) continue;

            // try {
            house[indexes[0]] = house[indexes[0]].replace(`${other}`, "_");
            // } catch (err) {
            //   console.log("////////////////");

            //   console.log(`Error:`);
            //   console.log(`Candidate:'${other}'`);
            //   console.log(`House:'${house}'`);
            //   console.log(`Indexes:'${indexes}'`);
            //   console.log("////////////////");
            // }
          }
        }

        break;
      default:
        throw Error(`Unknown length for Sudoku Hidden Single '${length}'`);
    }
  }

  static solveMathraxCells(
    cell0: string,
    mathraxOp: string,
    cell1: string
  ): string {
    const cell0Candidates = cellCandidates(cell0);

    const cell1Candidates = cellCandidates(cell1);

    switch (mathraxOp) {
      case "..":
        return cell0;
      case "2+":
      case "3+":
      case "4+":
      case "5+":
      case "6+":
      case "7+":
      case "8+":
      case "9+":
      case "10+":
      case "11+":
        for (const c0 of cell0Candidates) {
          let isValid = false;

          for (const c1 of cell1Candidates)
            isValid = c0 + c1 == +`${mathraxOp}`.replace("+", "") || isValid;

          if (isValid) continue;

          cell0 = cell0.replace(`${c0}`, "_");
        }

        return cell0;
      case "0-":
        return cell0;
      case "1-":
      case "2-":
      case "3-":
      case "4-":
      case "5-": {
        const mathNumber = +`${mathraxOp}`.replace("-", "");

        for (const c0 of cell0Candidates) {
          let isValid = false;

          const min = c0 - mathNumber;

          const max = c0 + mathNumber;

          if (min > 0 && cell1.includes(`${min}`)) isValid = true;

          if (cell1.includes(`${max}`)) isValid = true;

          if (isValid) continue;

          cell0 = cell0.replace(`${c0}`, "_");
        }

        return cell0;
      }

      case "2/": {
        for (const c0 of cell0Candidates) {
          switch (c0) {
            case 5:
            case 7:
              cell0 = cell0.replace(`${c0}`, "_");
              continue;
            case 4:
              if (
                cell1Candidates.indexOf(2) < 0 &&
                cell1Candidates.indexOf(8) < 0
              )
                cell0 = cell0.replace(`${c0}`, "_");

              continue;

            case 6:
              if (cell1Candidates.indexOf(3) < 0)
                cell0 = cell0.replace(`${c0}`, "_");

              continue;

            // default:
            //   console.log(`Unknown candidate for division ${c0}`);
            //   continue;
          }
        }

        return cell0;
      }

      case "3/": {
        for (const c0 of cell0Candidates) {
          switch (c0) {
            case 4:
            case 5:
            case 7:
              cell0 = cell0.replace(`${c0}`, "_");
              continue;
            case 2:
              if (!cell1.includes("6")) cell0 = cell0.replace(`${c0}`, "_");
              continue;
          }
        }

        return cell0;
      }
      case "4x":
        for (const c0 of cell0Candidates) {
          let isValid = false;

          for (const c1 of cell1Candidates) isValid = c0 * c1 == 4 || isValid;

          if (isValid) continue;

          cell0 = cell0.replace(`${c0}`, "_");
        }

        return cell0;
      case "6x":
        for (const c0 of cell0Candidates) {
          let isValid = false;

          for (const c1 of cell1Candidates) isValid = c0 * c1 == 6 || isValid;

          if (isValid) continue;

          cell0 = cell0.replace(`${c0}`, "_");
        }

        return cell0;

      case "12x":
        for (const c0 of cell0Candidates) {
          let isValid = false;

          for (const c1 of cell1Candidates) isValid = c0 * c1 == 12 || isValid;

          if (isValid) continue;

          cell0 = cell0.replace(`${c0}`, "_");
        }

        return cell0;
      case "oo":
      case "OO":
        for (const candidate of cell0Candidates) {
          if (candidate % 2 != 0) continue;

          cell0 = cell0.replace(`${candidate}`, "_");
        }

        return cell0;

      case "ee":
      case "EE":
        for (const candidate of cell0Candidates) {
          if (candidate % 2 == 0) continue;

          cell0 = cell0.replace(`${candidate}`, "_");
        }

        return cell0;

      default:
        console.log(`Unknown mathrax op: '${mathraxOp}'`);
        return cell0;
    }
  }

  static isMathraxIntersectionSolved(
    cell0: string,
    mathraxOp: string,
    cell1: string
  ): boolean {
    const cell0Candidates = cellCandidates(cell0);

    const cell1Candidates = cellCandidates(cell1);

    if (cell0Candidates.length != 1 || cell1Candidates.length != 1)
      return false;

    const c0 = cell0Candidates[0];

    const c1 = cell1Candidates[0];

    switch (mathraxOp) {
      case "..":
        return true;
      case "2+":
      case "3+":
      case "4+":
      case "5+":
      case "6+":
      case "7+":
      case "8+":
      case "9+":
      case "10+":
      case "11+":
        return c0 + c1 == +`${mathraxOp}`.replace("+", "");
      case "0-":
        return c0 == c1;
      case "1-":
      case "2-":
      case "3-":
      case "4-":
      case "5-": {
        const mathNumber = +`${mathraxOp}`.replace("-", "");
        return c0 - c1 == mathNumber || c1 - c0 == mathNumber;
      }
      case "2/":
      case "3/": {
        const mathNumber = +`${mathraxOp}`.replace("/", "");
        return c0 / c1 == mathNumber || c1 / c0 == mathNumber;
      }
      case "4x":
      case "6x":
      case "12x": {
        const mathNumber = +`${mathraxOp}`.replace("x", "");
        return c0 * c1 == mathNumber;
      }
      case "oo":
      case "OO":
        return c0 % 2 != 0 && c1 % 2 != 0;

      case "ee":
      case "EE":
        return c0 % 2 == 0 && c1 % 2 == 0;

      default:
        console.log(`Unknown mathrax op: '${mathraxOp}'`);
        return false;
    }
  }

  static solveSudokuCrossHatchLocs(
    _gridString: string[][],
    _length: number,
    locs: Loc[]
  ) {
    const house = Loc.getHouseFromLocs(_gridString, locs);

    solveSudokuCrossHatch(_length, house);

    for (let j = 0; j < _length; j++) {
      const loc = locs[j];

      _gridString[loc.row][loc.col] = house[j];
    }
  }

  static solveSudokuNakedTripleLocs(
    _gridString: string[][],
    _length: number,
    locs: Loc[]
  ) {
    const house = Loc.getHouseFromLocs(_gridString, locs);

    Techniques.solveSudokuNakedTriple(_length, house);

    for (let j = 0; j < _length; j++) {
      const loc = locs[j];

      _gridString[loc.row][loc.col] = house[j];
    }
  }

  static solveSudokuNakedQuadLocs(
    _gridString: string[][],
    _length: number,
    locs: Loc[]
  ) {
    const house = Loc.getHouseFromLocs(_gridString, locs);

    Techniques.solveSudokuQuadTriple(_length, house);

    for (let j = 0; j < _length; j++) {
      const loc = locs[j];

      _gridString[loc.row][loc.col] = house[j];
    }
  }

  static isFutoshikiRowsIntersectionsSolved(
    _gridString: string[][],
    _length: number
  ) {
    for (let r = 0; r < _length; r++)
      for (let c = 1; c < _length * 2 - 1; c += 2) {
        const cell0 = cellCandidates(_gridString[r * 2][c - 1]);

        const cell1 = cellCandidates(_gridString[r * 2][c + 1]);

        const c0 = cell0[0];

        const c1 = cell1[0];

        switch (_gridString[r * 2][c]) {
          case "<":
            if (c0 < c1) continue;
            return false;
          case ">":
            if (c0 > c1) continue;
            return false;
          case ".":
            continue;
          default:
            console.log(`unknown candidate '${_gridString[r][c]}'`);
            return false;
        }
      }

    return true;
  }

  static isKropkiRowsIntersectionsSolved(
    _gridString: string[][],
    _length: number
  ): boolean {
    for (let r = 0; r < _length; r++)
      for (let c = 1; c < _length * 2 - 1; c += 2) {
        const cell0 = cellCandidates(_gridString[r * 2][c - 1]);

        const cell1 = cellCandidates(_gridString[r * 2][c + 1]);

        const c0 = cell0[0];

        const c1 = cell1[0];

        if (
          !Techniques.isKropkiIntersectionSolved(c0, _gridString[r * 2][c], c1)
        )
          return false;
      }

    return true;
  }

  static isKropkiColsIntersectionsSolved(
    _gridString: string[][],
    _length: number
  ): boolean {
    for (let c = 0; c < _length; c++)
      for (let r = 1; r < _length * 2 - 1; r += 2) {
        const cell0 = cellCandidates(_gridString[r - 1][c * 2]);
        const cell1 = cellCandidates(_gridString[r + 1][c * 2]);

        const c0 = cell0[0];

        const c1 = cell1[0];

        if (
          !Techniques.isKropkiIntersectionSolved(c0, _gridString[r][c * 2], c1)
        )
          return false;
      }

    return true;
  }

  static isOneUpOneDownIntersectionSolved(
    c0: number,
    kropki: string,
    c1: number
  ): boolean {
    switch (kropki) {
      case "+":
        return c0 + 1 == c1;
      case "-":
        return c0 - 1 == c1;
      case ".":
        return c0 + 1 != c1 && c0 - 1 != c1;
      default:
        console.log(`unknown intersection for oneuponedown '${kropki}'`);
        return false;
    }
  }

  static solveMathraxIntersections(_gridString: string[][], _length: number) {
    for (let r = 0; r < _length - 1; r++)
      for (let c = 0; c < _length - 1; c++) {
        const tl = new Loc(r * 2, c);
        const tr = new Loc(r * 2, c + 1);

        const bl = new Loc((r + 1) * 2, c);
        const br = new Loc((r + 1) * 2, c + 1);

        const math = _gridString[r * 2 + 1][c];

        let result = Techniques.solveMathraxCells(
          _gridString[tl.row][tl.col],
          math,
          _gridString[br.row][br.col]
        );

        _gridString[tl.row][tl.col] = result;

        result = Techniques.solveMathraxCells(
          _gridString[br.row][br.col],
          math,
          _gridString[tl.row][tl.col]
        );

        _gridString[br.row][br.col] = result;

        result = Techniques.solveMathraxCells(
          _gridString[tr.row][tr.col],
          math,
          _gridString[bl.row][bl.col]
        );

        _gridString[tr.row][tr.col] = result;

        result = Techniques.solveMathraxCells(
          _gridString[bl.row][bl.col],
          math,
          _gridString[tr.row][tr.col]
        );

        _gridString[bl.row][bl.col] = result;

        if (math == "4+") {
          const row0 = tl.row;
          const row1 = br.row;

          const col0 = tl.col;
          const col1 = br.col;

          const row0HouseLocs = Loc.getMathraxCellRowHouseLocs(
            _length,
            row0 / 2
          );
          const row1HouseLocs = Loc.getMathraxCellRowHouseLocs(
            _length,
            row1 / 2
          );

          const col0HouseLocs = Loc.getMathraxCellColHouseLocs(_length, col0);
          const col1HouseLocs = Loc.getMathraxCellColHouseLocs(_length, col1);

          const allLocs = [];

          allLocs.push(...row0HouseLocs);
          allLocs.push(...row1HouseLocs);
          allLocs.push(...col0HouseLocs);
          allLocs.push(...col1HouseLocs);

          for (const loc of allLocs) {
            if (
              loc.equals(tl) ||
              loc.equals(tr) ||
              loc.equals(bl) ||
              loc.equals(br)
            )
              continue;

            _gridString[loc.row][loc.col] = _gridString[loc.row][
              loc.col
            ].replace("2", "_");
          }
        }
      }
  }

  static isMathraxIntersections(
    _gridString: string[][],
    _length: number
  ): boolean {
    for (let r = 0; r < _length - 1; r++)
      for (let c = 0; c < _length - 1; c++) {
        const tl = new Loc(r * 2, c);
        const tr = new Loc(r * 2, c + 1);

        const bl = new Loc((r + 1) * 2, c);
        const br = new Loc((r + 1) * 2, c + 1);

        const math = _gridString[r * 2 + 1][c];

        if (
          !Techniques.isMathraxIntersectionSolved(
            _gridString[tl.row][tl.col],
            math,
            _gridString[br.row][br.col]
          )
        )
          return false;

        if (
          !Techniques.isMathraxIntersectionSolved(
            _gridString[br.row][br.col],
            math,
            _gridString[tl.row][tl.col]
          )
        )
          return false;

        if (
          !Techniques.isMathraxIntersectionSolved(
            _gridString[tr.row][tr.col],
            math,
            _gridString[bl.row][bl.col]
          )
        )
          return false;

        if (
          !Techniques.isMathraxIntersectionSolved(
            _gridString[bl.row][bl.col],
            math,
            _gridString[tr.row][tr.col]
          )
        )
          return false;
      }

    return true;
  }

  static isKropkiIntersectionSolved(
    c0: number,
    kropki: string,
    c1: number
  ): boolean {
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

  static isFutoshikiColsIntersectionsSolved(
    _gridString: string[][],
    _length: number
  ) {
    for (let c = 0; c < _length; c++)
      for (let r = 1; r < _length * 2 - 1; r += 2) {
        const cell0 = cellCandidates(_gridString[r - 1][c * 2]);
        const cell1 = cellCandidates(_gridString[r + 1][c * 2]);

        const c0 = cell0[0];

        const c1 = cell1[0];

        switch (_gridString[r][c]) {
          case "v":
          case "V":
            if (c0 > c1) continue;
            return false;
          case "^":
            if (c0 < c1) continue;
            return false;
          case ".":
            continue;
          default:
            console.log(`unknown candidate '${_gridString[r][c]}'`);
            return false;
        }
      }

    return true;
  }

  static solveSudokuHiddenSingleLocs(
    _gridString: string[][],
    _length: number,
    locs: Loc[]
  ) {
    const house = Loc.getHouseFromLocs(_gridString, locs);

    Techniques.solveSudokuHiddenSingle(_length, house);

    for (let j = 0; j < _length; j++) {
      const loc = locs[j];

      _gridString[loc.row][loc.col] = house[j];
    }
  }

  static solveSudokuNakedPairLocs(
    _gridString: string[][],
    _length: number,
    locs: Loc[]
  ) {
    const house = Loc.getHouseFromLocs(_gridString, locs);

    Techniques.solveSudokuNakedPair(_length, house);

    for (let j = 0; j < _length; j++) {
      const loc = locs[j];

      _gridString[loc.row][loc.col] = house[j];
    }
  }

  static solveSudokuLocs(
    _gridString: string[][],
    _length: number,
    locs: Loc[]
  ) {
    if (_length != locs.length)
      throw new Error(`Invalid number of locs vs length`);

    Techniques.solveSudokuCrossHatchLocs(_gridString, _length, locs);

    Techniques.solveSudokuNakedPairLocs(_gridString, _length, locs);

    Techniques.solveSudokuHiddenSingleLocs(_gridString, _length, locs);

    Techniques.solveSudokuNakedTripleLocs(_gridString, _length, locs);

    Techniques.solveSudokuNakedQuadLocs(_gridString, _length, locs);
  }

  static solveGreaterThan(_gridString: string[][], loc1: Loc, loc0: Loc) {
    const cell1Candidates = cellCandidates(_gridString[loc1.row][loc1.col]);

    cell1Candidates.sort((a, b) => a - b);

    const max1 = cell1Candidates[cell1Candidates.length - 1];

    const cell0Candidates = cellCandidates(_gridString[loc0.row][loc0.col]);

    for (const candidate of cell0Candidates) {
      if (candidate < max1) continue;

      Techniques.removeCandidate(_gridString, loc0, candidate);
    }
  }

  static solveLessThan(_gridString: string[][], loc0: Loc, loc1: Loc) {
    const cell0Candidates = cellCandidates(_gridString[loc0.row][loc0.col]);

    cell0Candidates.sort((a, b) => a - b);

    const min0 = cell0Candidates[0];

    const cell1Candidates = cellCandidates(_gridString[loc1.row][loc1.col]);

    for (const candidate of cell1Candidates) {
      if (candidate > min0) continue;
      Techniques.removeCandidate(_gridString, loc1, candidate);
    }
  }

  static solveFutoshikiRowIntersections(
    _gridString: string[][],
    rowLocs: Loc[]
  ) {
    for (let j = 0; j < rowLocs.length - 1; j++) {
      const loc0 = rowLocs[j];
      const loc1 = rowLocs[j + 1];

      const futoshikiOp = _gridString[loc0.row][loc0.col + 1];

      switch (futoshikiOp) {
        case ".":
          continue;
        case "<":
          Techniques.solveLessThan(_gridString, loc0, loc1);

          Techniques.solveGreaterThan(_gridString, loc1, loc0);

          continue;
        case ">":
          Techniques.solveLessThan(_gridString, loc1, loc0);

          Techniques.solveGreaterThan(_gridString, loc0, loc1);

          continue;
      }
    }
  }

  static solveFutoshikiColIntersections(
    _gridString: string[][],
    colLocs: Loc[]
  ) {
    for (let c = 0; c < colLocs.length; c++)
      for (let r = 1; r < colLocs.length * 2 - 1; r += 2) {
        const loc0 = new Loc(r - 1, c * 2);
        const loc1 = new Loc(r + 1, c * 2);

        switch (_gridString[r][c]) {
          case "v":
          case "V":
            Techniques.solveLessThan(_gridString, loc1, loc0);

            Techniques.solveGreaterThan(_gridString, loc0, loc1);
            continue;
          case "^":
            Techniques.solveLessThan(_gridString, loc0, loc1);

            Techniques.solveGreaterThan(_gridString, loc1, loc0);
            continue;
          case ".":
            continue;
        }
      }
  }

  static solveKropkiRowIntersections(_gridString: string[][], rowLocs: Loc[]) {
    for (let j = 0; j < rowLocs.length - 1; j++) {
      const loc0 = rowLocs[j];
      const loc1 = rowLocs[j + 1];

      const futoshikiOp = _gridString[loc0.row][loc0.col + 1];

      switch (futoshikiOp) {
        case ".":
          Techniques.kropkiEmpty(_gridString, loc0, loc1);

          Techniques.kropkiEmpty(_gridString, loc1, loc0);
          continue;
        case "b":
          Techniques.kropkiBlack(_gridString, loc0, loc1);

          Techniques.kropkiBlack(_gridString, loc1, loc0);

          continue;
        case "w":
          Techniques.kropkiWhite(_gridString, loc1, loc0);

          Techniques.kropkiWhite(_gridString, loc0, loc1);

          continue;
        default:
          console.log(`unknown intersection for Kropki '${futoshikiOp}'`);
          continue;
      }
    }

    for (let i = 0; i < rowLocs.length - 2; i++) {
      const loc0 = rowLocs[i];
      const loc1 = rowLocs[i + 1];
      const loc2 = rowLocs[i + 2];

      const kropkiOp0 = _gridString[loc0.row][loc0.col + 1];
      const kropkiOp1 = _gridString[loc0.row][loc0.col + 3];

      switch (kropkiOp0 + kropkiOp1) {
        case "ww":
        case "bw":
        case "wb":
          Techniques.removeCandidate(_gridString, loc1, 1);

          Techniques.removeCandidate(_gridString, loc1, 9);

          continue;
        case "bb":
          Techniques.removeCandidate(_gridString, loc0, 3);

          Techniques.removeCandidate(_gridString, loc0, 6);

          Techniques.removeCandidate(_gridString, loc1, 3);

          Techniques.removeCandidate(_gridString, loc1, 6);

          Techniques.removeCandidate(_gridString, loc2, 3);

          Techniques.removeCandidate(_gridString, loc2, 6);

          Techniques.removeCandidate(_gridString, loc1, 1);

          Techniques.removeCandidate(_gridString, loc1, 8);

          for (let k = 0; k < rowLocs.length; k++) {
            if (
              rowLocs[k].col == loc0.col ||
              rowLocs[k].col == loc1.col ||
              rowLocs[k].col == loc2.col
            )
              continue;

            const loc = new Loc(rowLocs[0].row, rowLocs[k].col);

            Techniques.removeCandidate(_gridString, loc, 2);

            Techniques.removeCandidate(_gridString, loc, 4);
          }

          continue;
      }
    }
  }

  static solveKropkiColIntersections(_gridString: string[][], rowLocs: Loc[]) {
    for (let j = 0; j < rowLocs.length - 1; j++) {
      const loc0 = rowLocs[j];
      const loc1 = rowLocs[j + 1];

      const futoshikiOp = _gridString[loc0.row + 1][loc0.col];

      switch (futoshikiOp) {
        case ".":
          Techniques.kropkiEmpty(_gridString, loc0, loc1);

          Techniques.kropkiEmpty(_gridString, loc1, loc0);
          continue;
        case "b":
          Techniques.kropkiBlack(_gridString, loc0, loc1);

          Techniques.kropkiBlack(_gridString, loc1, loc0);

          continue;
        case "w":
          Techniques.kropkiWhite(_gridString, loc1, loc0);

          Techniques.kropkiWhite(_gridString, loc0, loc1);

          continue;
        default:
          console.log(`unknown intersection for Kropki '${futoshikiOp}'`);
          continue;
      }
    }

    for (let i = 0; i < rowLocs.length - 2; i++) {
      const loc0 = rowLocs[i];
      const loc1 = rowLocs[i + 1];
      const loc2 = rowLocs[i + 2];

      const kropkiOp0 = _gridString[loc0.row + 1][loc0.col];
      const kropkiOp1 = _gridString[loc0.row + 3][loc0.col];

      switch (kropkiOp0 + kropkiOp1) {
        case "ww":
        case "bw":
        case "wb":
          Techniques.removeCandidate(_gridString, loc1, 1);

          Techniques.removeCandidate(_gridString, loc1, 9);

          continue;
        case "bb":
          Techniques.removeCandidate(_gridString, loc0, 3);

          Techniques.removeCandidate(_gridString, loc0, 6);

          Techniques.removeCandidate(_gridString, loc1, 3);

          Techniques.removeCandidate(_gridString, loc1, 6);

          Techniques.removeCandidate(_gridString, loc2, 3);

          Techniques.removeCandidate(_gridString, loc2, 6);

          Techniques.removeCandidate(_gridString, loc1, 1);

          Techniques.removeCandidate(_gridString, loc1, 8);

          for (let k = 0; k < rowLocs.length; k++) {
            if (
              rowLocs[k].row == loc0.row ||
              rowLocs[k].row == loc1.row ||
              rowLocs[k].row == loc2.row
            )
              continue;

            const loc = new Loc(rowLocs[k].row, rowLocs[0].col);

            Techniques.removeCandidate(_gridString, loc, 2);

            Techniques.removeCandidate(_gridString, loc, 4);
          }

          continue;
      }
    }
  }

  // static solveKropkiColIntersections(_gridString: string[][], colLocs: Loc[]) {
  //   for (let c = 0; c < colLocs.length; c++)
  //     for (let r = 1; r < colLocs.length * 2 - 1; r += 2) {
  //       const loc0 = new Loc(r - 1, c * 2);
  //       const loc1 = new Loc(r + 1, c * 2);

  //       switch (_gridString[r][c]) {
  //         case ".":
  //           Techniques.kropkiEmpty(_gridString, loc1, loc0);

  //           Techniques.kropkiEmpty(_gridString, loc0, loc1);
  //           continue;
  //         case "b":
  //           Techniques.kropkiBlack(_gridString, loc0, loc1);

  //           Techniques.kropkiBlack(_gridString, loc1, loc0);
  //           continue;
  //         case "w":
  //           Techniques.kropkiWhite(_gridString, loc0, loc1);

  //           Techniques.kropkiWhite(_gridString, loc1, loc0);
  //           continue;
  //         default:
  //           console.log(
  //             `unknown intersection for Kropki '${_gridString[r][c]}'`
  //           );
  //           continue;
  //       }
  //     }

  //   for (let c = 0; c < colLocs.length; c++)
  //     for (let r = 1; r < colLocs.length * 2 - 3; r += 2) {
  //       const loc0 = new Loc(r - 1, c * 2);
  //       const loc1 = new Loc(r + 1, c * 2);
  //       const loc2 = new Loc(r + 3, c * 2);

  //       const kropkiLoc0 = new Loc(r, c);
  //       const kropkiLoc1 = new Loc(r + 2, c);

  //       const kropkiOp0 = _gridString[kropkiLoc0.row][kropkiLoc0.col];
  //       const kropkiOp1 = _gridString[kropkiLoc1.row][kropkiLoc1.col];

  //       switch (kropkiOp0 + kropkiOp1) {
  //         case "ww":
  //         case "bw":
  //         case "wb":
  //           Techniques.removeCandidate(_gridString, loc1, 1);

  //           Techniques.removeCandidate(_gridString, loc1, 9);
  //           continue;
  //         case "bb":
  //           if (colLocs.length != 9) continue;

  //           Techniques.removeCandidate(_gridString, loc0, 3);

  //           Techniques.removeCandidate(_gridString, loc0, 6);

  //           Techniques.removeCandidate(_gridString, loc1, 3);

  //           Techniques.removeCandidate(_gridString, loc1, 6);

  //           Techniques.removeCandidate(_gridString, loc2, 3);

  //           Techniques.removeCandidate(_gridString, loc2, 6);

  //           Techniques.removeCandidate(_gridString, loc1, 1);

  //           Techniques.removeCandidate(_gridString, loc1, 8);

  //           const column = c * 2;

  //           for (let k = 0; k < colLocs.length; k++) {
  //             const row = k * 2;

  //             if (row == loc0.row || row == loc1.row || row == loc2.row)
  //               continue;

  //             const loc = new Loc(k * 2, column);

  //             Techniques.removeCandidate(_gridString, loc, 2);

  //             Techniques.removeCandidate(_gridString, loc, 4);
  //           }

  //           continue;
  //       }
  //     }
  // }

  static removeCandidate(_gridString: string[][], loc: Loc, candidate: number) {
    _gridString[loc.row][loc.col] = _gridString[loc.row][loc.col].replace(
      `${candidate}`,
      "_"
    );
  }

  static oneUpOneDownPlus(_gridString: string[][], loc0: Loc, loc1: Loc) {
    const cell0 = _gridString[loc0.row][loc0.col];
    const cell1 = _gridString[loc1.row][loc1.col];

    const cell0Candidates = new Set<number>(cellCandidates(cell0));
    const cell1Candidates = new Set<number>(cellCandidates(cell1));

    for (const c0 of cell0Candidates) {
      if (cell1Candidates.has(c0 + 1)) continue;

      _gridString[loc0.row][loc0.col] = _gridString[loc0.row][loc0.col].replace(
        `${c0}`,
        "_"
      );
    }

    for (const c1 of cell1Candidates) {
      if (cell0Candidates.has(c1 - 1)) continue;

      _gridString[loc1.row][loc1.col] = _gridString[loc1.row][loc1.col].replace(
        `${c1}`,
        "_"
      );
    }
  }

  static oneUpOneDownEmpty(_gridString: string[][], loc0: Loc, loc1: Loc) {
    const cell0 = _gridString[loc0.row][loc0.col];
    const cell1 = _gridString[loc1.row][loc1.col];

    const cell0Candidates = new Set<number>(cellCandidates(cell0));
    const cell1Candidates = new Set<number>(cellCandidates(cell1));

    if (cell0Candidates.size == 1 && cell1Candidates.size == 1) return;

    switch (cell0Candidates.size) {
      case 1:
        {
          const candidate0 = [...cell0Candidates][0];

          _gridString[loc1.row][loc1.col] = _gridString[loc1.row][
            loc1.col
          ].replace(`${candidate0 + 1}`, "_");

          _gridString[loc1.row][loc1.col] = _gridString[loc1.row][
            loc1.col
          ].replace(`${candidate0 - 1}`, "_");
        }
        return;
      // case 2:
      //   {
      //     const hash = [...cell0Candidates].sort((a, b) => a - b);

      //     const c0 = hash[0];

      //     const c1 = hash[1];

      //     if (c0 + 1 == c1) {
      //       _gridString[loc1.row][loc1.col] = _gridString[loc1.row][
      //         loc1.col
      //       ].replace(`${c0}`, "_");

      //       _gridString[loc1.row][loc1.col] = _gridString[loc1.row][
      //         loc1.col
      //       ].replace(`${c1}`, "_");
      //     }
      //   }
      //   return;
      // case 3:
      //   {
      //     const hash = [...cell0Candidates].sort((a, b) => a - b);

      //     // console.log(hash);

      //     const c0 = hash[0];

      //     const c1 = hash[1];

      //     const c2 = hash[2];

      //     if (c0 + 1 == c1 && c1 + 1 == c2) {
      //       // console.log(hash + " " + c1);

      //       // console.log(cell0 + " " + cell1);

      //       _gridString[loc1.row][loc1.col] = _gridString[loc1.row][
      //         loc1.col
      //       ].replace(`${c1}`, "_");
      //     }

      //     // if (c0 + 1 == c1) {

      //     //   _gridString[loc1.row][loc1.col] = _gridString[loc1.row][
      //     //     loc1.col
      //     //   ].replace(`${c1}`, "_");
      //     // }
      //   }
      // return;
    }
  }

  static oneUpOneDownMinus(_gridString: string[][], loc0: Loc, loc1: Loc) {
    const cell0 = _gridString[loc0.row][loc0.col];
    const cell1 = _gridString[loc1.row][loc1.col];

    const cell0Candidates = new Set<number>(cellCandidates(cell0));
    const cell1Candidates = new Set<number>(cellCandidates(cell1));

    for (const c0 of cell0Candidates) {
      if (cell1Candidates.has(c0 - 1)) continue;

      _gridString[loc0.row][loc0.col] = _gridString[loc0.row][loc0.col].replace(
        `${c0}`,
        "_"
      );
    }

    for (const c1 of cell1Candidates) {
      if (cell0Candidates.has(c1 + 1)) continue;

      _gridString[loc1.row][loc1.col] = _gridString[loc1.row][loc1.col].replace(
        `${c1}`,
        "_"
      );
    }
  }

  static solveOneUpOneDownRowIntersections(
    _gridString: string[][],
    rowLocs: Loc[]
  ) {
    for (let j = 0; j < rowLocs.length - 1; j++) {
      const loc0 = rowLocs[j];
      const loc1 = rowLocs[j + 1];

      switch (_gridString[loc0.row][loc0.col + 1]) {
        case ".":
          Techniques.oneUpOneDownEmpty(_gridString, loc0, loc1);
          Techniques.oneUpOneDownEmpty(_gridString, loc1, loc0);
          continue;
        case "+":
          Techniques.oneUpOneDownPlus(_gridString, loc0, loc1);
          continue;
        case "-":
          Techniques.oneUpOneDownMinus(_gridString, loc0, loc1);
          continue;
        default:
          console.log(
            `unknown intersection for OneUpOneDown '${
              _gridString[loc0.row][loc0.col + 1]
            }'`
          );
          continue;
      }
    }
  }

  static solveOneUpOneDownColIntersections(
    _gridString: string[][],
    colLocs: Loc[]
  ) {
    for (let c = 0; c < colLocs.length; c++)
      for (let r = 1; r < colLocs.length * 2 - 1; r += 2) {
        const loc0 = new Loc(r - 1, c * 2);
        const loc1 = new Loc(r + 1, c * 2);

        switch (_gridString[r][c]) {
          case ".":
            Techniques.oneUpOneDownEmpty(_gridString, loc0, loc1);
            Techniques.oneUpOneDownEmpty(_gridString, loc1, loc0);
            continue;
          case "+":
            Techniques.oneUpOneDownPlus(_gridString, loc0, loc1);

            continue;
          case "-":
            Techniques.oneUpOneDownMinus(_gridString, loc0, loc1);
            continue;
          default:
            console.log(
              `unknown intersection for OneUpOneDown '${_gridString[r][c]}'`
            );
            continue;
        }
      }
  }

  static isOneUpOneDownRowsIntersectionsSolved(
    _gridString: string[][],
    _length: number
  ): boolean {
    for (let r = 0; r < _length; r++)
      for (let c = 1; c < _length * 2 - 1; c += 2) {
        if (
          !Techniques.isOneUpOneDownIntersectionSolved(
            cellCandidates(_gridString[r * 2][c - 1])[0],
            _gridString[r * 2][c],
            cellCandidates(_gridString[r * 2][c + 1])[0]
          )
        )
          return false;
      }

    return true;
  }

  static isOneUpOneDownColsIntersectionsSolved(
    _gridString: string[][],
    _length: number
  ): boolean {
    for (let c = 0; c < _length; c++)
      for (let r = 1; r < _length * 2 - 1; r += 2) {
        const cell0 = cellCandidates(_gridString[r - 1][c * 2]);
        const cell1 = cellCandidates(_gridString[r + 1][c * 2]);

        const c0 = cell0[0];

        const c1 = cell1[0];

        if (
          !Techniques.isOneUpOneDownIntersectionSolved(
            c0,
            _gridString[r][c],
            c1
          )
        )
          return false;
      }

    return true;
  }

  static touchingParksTree(_gridString: string[][], length: number) {
    for (const loc of Loc.getSudokuLocs(length))
      if (!_gridString[loc.row][loc.col].includes("."))
        for (const other of loc.getSurroundingLocs(length))
          _gridString[other.row][other.col] = _gridString[other.row][
            other.col
          ].replace("+", "_");
  }

  static solveParks1Locs(_gridString: string[][], length: number, locs: Loc[]) {
    const emptyLocs = locs.filter((loc) => {
      return !_gridString[loc.row][loc.col].includes("+");
    });

    const treeLocs = locs.filter((loc) => {
      return !_gridString[loc.row][loc.col].includes(".");
    });

    const unfilledLocs = locs.filter((loc) => {
      return (
        _gridString[loc.row][loc.col].includes(".") &&
        _gridString[loc.row][loc.col].includes("+")
      );
    });

    if (
      emptyLocs.length == 0 &&
      treeLocs.length == 0 &&
      unfilledLocs.length == 1
    ) {
      _gridString[unfilledLocs[0].row][unfilledLocs[0].col] = _gridString[
        unfilledLocs[0].row
      ][unfilledLocs[0].col].replace(".", "_");

      return;
    }

    if (treeLocs.length == 1) {
      for (const loc of new LocSet(locs).difference(treeLocs).values)
        _gridString[loc.row][loc.col] = _gridString[loc.row][loc.col].replace(
          "+",
          "_"
        );

      return;
    }

    if (treeLocs.length == 0 && unfilledLocs.length == 1) {
      _gridString[unfilledLocs[0].row][unfilledLocs[0].col] = _gridString[
        unfilledLocs[0].row
      ][unfilledLocs[0].col].replace(".", "_");

      return;
    }

    if (
      treeLocs.length == 0 &&
      unfilledLocs.length == 2 &&
      unfilledLocs[0].isNextTo(unfilledLocs[1])
    ) {
      Techniques.requireParkTree(_gridString, length, unfilledLocs);

      return;
    }
  }

  static removePark(_gridString: string[][], loc: Loc) {
    _gridString[loc.row][loc.col] = _gridString[loc.row][loc.col].replace(
      "+",
      "_"
    );
  }

  static requireParkTree(_gridString: string[][], length: number, locs: Loc[]) {
    if (locs.length == 2) {
      const r0 = locs[0].row;
      const c0 = locs[0].col;

      const r1 = locs[1].row;
      const c1 = locs[1].col;

      if (locs[0].inSameRow(locs[1])) {
        const r0Up = r0 - 1;
        const r0Down = r0 + 1;
        if (r0Up >= 0) {
          Techniques.removePark(_gridString, new Loc(r0Up, c0));

          Techniques.removePark(_gridString, new Loc(r0Up, c1));
        }

        if (r0Down < length) {
          Techniques.removePark(_gridString, new Loc(r0Down, c0));

          Techniques.removePark(_gridString, new Loc(r0Down, c1));
        }

        for (let c = 0; c < length; c++) {
          if (c == c0 || c == c1) continue;
          Techniques.removePark(_gridString, new Loc(r0, c));
        }
      }

      if (locs[0].inSameCol(locs[1])) {
        const c0Left = c0 - 1;
        const c0Right = c0 + 1;
        if (c0Left >= 0) {
          Techniques.removePark(_gridString, new Loc(r0, c0Left));

          Techniques.removePark(_gridString, new Loc(r1, c0Left));
        }
        if (c0Right < length) {
          Techniques.removePark(_gridString, new Loc(r0, c0Right));
          Techniques.removePark(_gridString, new Loc(r1, c0Right));
        }

        for (let r = 0; r < length; r++) {
          if (r == r0 || r == r1) continue;
          Techniques.removePark(_gridString, new Loc(r, c0));
        }
      }
    }

    if (locs.length == 3) {
      const l0 = locs[0];
      const l1 = locs[1];
      const l2 = locs[2];

      console.log("heheheheheheh");

      if (l0.isNextTo(l1) && l1.isNextTo(l2))
        Techniques.solveParks1Pivot3(_gridString, length, l0, l1, l2);

      if (l0.isNextTo(l2) && l2.isNextTo(l1))
        Techniques.solveParks1Pivot3(_gridString, length, l0, l2, l1);

      if (l0.isNextTo(l1) && l0.isNextTo(l2))
        Techniques.solveParks1Pivot3(_gridString, length, l1, l0, l2);
    }
  }

  static solveParks1Pivot3(
    _gridString: string[][],
    length: number,
    loc0: Loc,
    pivot: Loc,
    loc1: Loc
  ) {
    if (pivot.otherIsBelow(loc0) && pivot.otherIsRight(loc1)) {
      console.log("here");
    }

    if (pivot.otherIsBelow(loc1) && pivot.otherIsRight(loc0)) {
      console.log("here");
    }
  }

  static isParks1HouseLocsSolved(_gridString: string[][], locs: Loc[]) {
    const unfilledLocs = locs.filter((loc) => {
      return (
        _gridString[loc.row][loc.col].includes("+") &&
        _gridString[loc.row][loc.col].includes(".")
      );
    });

    const emptyLocs = locs.filter((loc) => {
      return (
        !_gridString[loc.row][loc.col].includes("+") &&
        _gridString[loc.row][loc.col].includes(".")
      );
    });

    const parksLocs = locs.filter((loc) => {
      return (
        _gridString[loc.row][loc.col].includes("+") &&
        !_gridString[loc.row][loc.col].includes(".")
      );
    });

    return (
      parksLocs.length == 1 &&
      unfilledLocs.length == 0 &&
      locs.length - 1 == emptyLocs.length
    );
  }

  static isTouchingParksTreeSolved(
    _gridString: string[][],
    length: number
  ): boolean {
    for (const loc of Loc.getSudokuLocs(length))
      if (!_gridString[loc.row][loc.col].includes("."))
        for (const other of loc.getSurroundingLocs(length))
          if (
            !_gridString[other.row][other.col].includes(".") &&
            _gridString[other.row][other.col].includes("+")
          )
            return false;

    return true;
  }

  static isSudokuHouseSolved(house: string[], length: number): boolean {
    const hash = new Set<number>();

    for (const cell of house) {
      const candidates = cellCandidates(cell);

      if (candidates.length != 1) return false;

      for (const candidate of candidates) hash.add(candidate);
    }

    for (let i = 1; i <= length; i++) if (!hash.has(i)) return false;

    return true;
  }
}

// 1464
