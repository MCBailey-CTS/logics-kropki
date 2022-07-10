import { cellCandidates } from "./KropkiString";
import { Loc } from "./Loc";
import { LocSet } from "./LocSet";
// import { GRID } from "./Types";
// import { cellCandidates, solveSudokuCrossHatch } from "./PuzzleString";

type GRID=string[][];

export class NewTechniques {
  // static solveKropkiIntersectionChains(grid: GRID, length: number) {
  //   Loc.getKropkiColIntersectionLocs()

  // }
  // static isValidKropkiBlack():boolean{}

  static solveSudokuCrossHatch(length: number, house: string[]) {
    for (let i = 0; i < length; i++)
      for (let ii = 0; ii < length; ii++) {
        if (i == ii) continue;

        const cell = cellCandidates(house[i]);

        if (cell.length != 1) continue;

        house[ii] = house[ii].replace(`${cell[0]}`, "_");
      }
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

        NewTechniques.removeNakedCandidates(house, length, indexes, hash);
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

  static solveSudokuCrossHatchLocs(
    _grid: GRID,
    _length: number,
    locs: Loc[]
  ): boolean {
    const house = Loc.getHouseFromLocs(_grid, locs);

    NewTechniques.solveSudokuCrossHatch(_length, house);

    let edited = false;

    for (let j = 0; j < _length; j++) {
      const loc = locs[j];

      const length = cellCandidates(_grid[loc.row][loc.col]).length;

      _grid[loc.row][loc.col] = house[j];

      edited =
        length > cellCandidates(_grid[loc.row][loc.col]).length || edited;
    }

    return edited;
  }

  static solveSudokuNakedTripleLocs(
    _grid: GRID,
    _length: number,
    locs: Loc[]
  ): boolean {
    const house = Loc.getHouseFromLocs(_grid, locs);

    NewTechniques.solveSudokuNakedTriple(_length, house);

    let edited = false;

    for (let j = 0; j < _length; j++) {
      const loc = locs[j];

      const length = cellCandidates(_grid[loc.row][loc.col]).length;

      _grid[loc.row][loc.col] = house[j];

      edited =
        length > cellCandidates(_grid[loc.row][loc.col]).length || edited;
    }

    return edited;
  }

  static solveSudokuNakedQuadLocs(
    _grid: GRID,
    _length: number,
    locs: Loc[]
  ): boolean {
    const house = Loc.getHouseFromLocs(_grid, locs);

    NewTechniques.solveSudokuQuadTriple(_length, house);

    let edited = false;

    for (let j = 0; j < _length; j++) {
      const loc = locs[j];

      const length = cellCandidates(_grid[loc.row][loc.col]).length;

      _grid[loc.row][loc.col] = house[j];

      edited =
        length > cellCandidates(_grid[loc.row][loc.col]).length || edited;
    }

    return edited;
  }

  static isFutoshikiRowsIntersectionsSolved(_grid: GRID, _length: number) {
    for (let r = 0; r < _length; r++)
      for (let c = 1; c < _length * 2 - 1; c += 2) {
        const cell0 = cellCandidates(_grid[r * 2][c - 1]);

        const cell1 = cellCandidates(_grid[r * 2][c + 1]);

        const c0 = cell0[0];

        const c1 = cell1[0];

        switch (_grid[r * 2][c]) {
          case "<":
            if (c0 < c1) continue;
            return false;
          case ">":
            if (c0 > c1) continue;
            return false;
          case ".":
            continue;
          default:
            console.log(`unknown candidate '${_grid[r][c]}'`);
            return false;
        }
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

  static isFutoshikiColsIntersectionsSolved(_grid: GRID, _length: number) {
    for (let c = 0; c < _length; c++)
      for (let r = 1; r < _length * 2 - 1; r += 2) {
        const cell0 = cellCandidates(_grid[r - 1][c * 2]);
        const cell1 = cellCandidates(_grid[r + 1][c * 2]);

        const c0 = cell0[0];

        const c1 = cell1[0];

        switch (_grid[r][c]) {
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
            console.log(`unknown candidate '${_grid[r][c]}'`);
            return false;
        }
      }

    return true;
  }

  static solveSudokuHiddenSingleLocs(
    _grid: GRID,
    _length: number,
    locs: Loc[]
  ): boolean {
    const house = Loc.getHouseFromLocs(_grid, locs);

    NewTechniques.solveSudokuHiddenSingle(_length, house);

    let edited = false;

    for (let j = 0; j < _length; j++) {
      const loc = locs[j];

      const length = cellCandidates(_grid[loc.row][loc.col]).length;

      _grid[loc.row][loc.col] = house[j];

      edited =
        length > cellCandidates(_grid[loc.row][loc.col]).length || edited;
    }

    return edited;
  }

  static solveSudokuNakedPairLocs(
    _grid: GRID,
    _length: number,
    locs: Loc[]
  ): boolean {
    const house = Loc.getHouseFromLocs(_grid, locs);

    NewTechniques.solveSudokuNakedPair(_length, house);

    let edited = false;

    for (let j = 0; j < _length; j++) {
      const loc = locs[j];

      const length = cellCandidates(_grid[loc.row][loc.col]).length;

      _grid[loc.row][loc.col] = house[j];

      edited =
        length > cellCandidates(_grid[loc.row][loc.col]).length || edited;
    }

    return edited;
  }

  static solveSudokuLocs(_grid: GRID, _length: number, locs: Loc[]): boolean {
    if (_length != locs.length)
      throw new Error(`Invalid number of locs vs length`);

    if (NewTechniques.solveSudokuCrossHatchLocs(_grid, _length, locs))
      return true;

    if (NewTechniques.solveSudokuNakedPairLocs(_grid, _length, locs))
      return true;

    if (NewTechniques.solveSudokuHiddenSingleLocs(_grid, _length, locs))
      return true;

    if (NewTechniques.solveSudokuNakedTripleLocs(_grid, _length, locs))
      return true;

    if (NewTechniques.solveSudokuNakedQuadLocs(_grid, _length, locs))
      return true;

    return false;
  }

  static solveGreaterThan(_grid: GRID, loc0: Loc, loc1: Loc): boolean {
    let edited = false;

    const cell1Candidates = cellCandidates(_grid[loc0.row][loc0.col]);

    const length = cellCandidates(_grid[loc1.row][loc1.col]).length;

    cell1Candidates.sort((a, b) => a - b);

    const max1 = cell1Candidates[cell1Candidates.length - 1];

    const cell0Candidates = cellCandidates(_grid[loc1.row][loc1.col]);

    for (const candidate of cell0Candidates) {
      if (candidate < max1) continue;

      NewTechniques.removeCandidate(_grid, loc1, candidate);

      edited =
        length > cellCandidates(_grid[loc1.row][loc1.col]).length || edited;
    }

    return edited;
  }

  static solveLessThan(_grid: GRID, loc0: Loc, loc1: Loc): boolean {
    let edited = false;

    const cell0Candidates = cellCandidates(_grid[loc0.row][loc0.col]);

    const length = cellCandidates(_grid[loc1.row][loc1.col]).length;

    cell0Candidates.sort((a, b) => a - b);

    const min0 = cell0Candidates[0];

    const cell1Candidates = cellCandidates(_grid[loc1.row][loc1.col]);

    for (const candidate of cell1Candidates) {
      if (candidate > min0) continue;
      NewTechniques.removeCandidate(_grid, loc1, candidate);

      edited =
        length > cellCandidates(_grid[loc1.row][loc1.col]).length || edited;
    }

    return edited;
  }

  static solveFutoshikiRowIntersections(_grid: GRID, rowLocs: Loc[]) {
    for (let j = 0; j < rowLocs.length - 1; j++) {
      const loc0 = rowLocs[j];
      const loc1 = rowLocs[j + 1];

      const futoshikiOp = _grid[loc0.row][loc0.col + 1];

      switch (futoshikiOp) {
        case ".":
          continue;
        case "<":
          NewTechniques.solveLessThan(_grid, loc0, loc1);

          NewTechniques.solveGreaterThan(_grid, loc1, loc0);

          continue;
        case ">":
          NewTechniques.solveLessThan(_grid, loc1, loc0);

          NewTechniques.solveGreaterThan(_grid, loc0, loc1);

          continue;
      }
    }
  }

  static solveFutoshikiColIntersections(_grid: GRID, colLocs: Loc[]) {
    for (let c = 0; c < colLocs.length; c++)
      for (let r = 1; r < colLocs.length * 2 - 1; r += 2) {
        const loc0 = new Loc(r - 1, c * 2);
        const loc1 = new Loc(r + 1, c * 2);

        switch (_grid[r][c]) {
          case "v":
          case "V":
            NewTechniques.solveLessThan(_grid, loc1, loc0);

            NewTechniques.solveGreaterThan(_grid, loc0, loc1);
            continue;
          case "^":
            NewTechniques.solveLessThan(_grid, loc0, loc1);

            NewTechniques.solveGreaterThan(_grid, loc1, loc0);
            continue;
          case ".":
            continue;
        }
      }
  }

  static getKropkiIntersectionLoc(loc0: Loc, loc1: Loc): Loc {
    if (loc0.inSameRow(loc1)) {
      if (loc0.otherIsRight(loc1) && loc1.col - 2 == loc0.col)
        return new Loc(loc0.row, loc0.col + 1);

      if (!loc0.otherIsRight(loc1) && loc0.col - 2 == loc1.col)
        return new Loc(loc1.row, loc1.col + 1);
    }

    if (loc0.inSameCol(loc1)) {
      if (loc0.otherIsBelow(loc1) && loc1.row - 2 == loc0.row)
        return new Loc(loc0.row, loc0.col + 1);

      if (!loc0.otherIsBelow(loc1) && loc0.col - 2 == loc1.col)
        return new Loc(loc1.row, loc1.col + 1);
    }

    throw Error(
      `Cannot ask for kropki intersection between locs ${loc0.toString()} and ${loc1.toString()}.`
    );
  }

  static removeCandidate(_grid: GRID, loc: Loc, candidate: number) {
    _grid[loc.row][loc.col] = _grid[loc.row][loc.col].replace(
      `${candidate}`,
      "_"
    );
  }

  static oneUpOneDownPlus(_grid: GRID, loc0: Loc, loc1: Loc) {
    const cell0 = _grid[loc0.row][loc0.col];
    const cell1 = _grid[loc1.row][loc1.col];

    const cell0Candidates = new Set<number>(cellCandidates(cell0));
    const cell1Candidates = new Set<number>(cellCandidates(cell1));

    for (const c0 of cell0Candidates) {
      if (cell1Candidates.has(c0 + 1)) continue;

      _grid[loc0.row][loc0.col] = _grid[loc0.row][loc0.col].replace(
        `${c0}`,
        "_"
      );
    }

    for (const c1 of cell1Candidates) {
      if (cell0Candidates.has(c1 - 1)) continue;

      _grid[loc1.row][loc1.col] = _grid[loc1.row][loc1.col].replace(
        `${c1}`,
        "_"
      );
    }
  }

  static oneUpOneDownEmpty(_grid: GRID, loc0: Loc, loc1: Loc) {
    const cell0 = _grid[loc0.row][loc0.col];
    const cell1 = _grid[loc1.row][loc1.col];

    const cell0Candidates = new Set<number>(cellCandidates(cell0));
    const cell1Candidates = new Set<number>(cellCandidates(cell1));

    if (cell0Candidates.size == 1 && cell1Candidates.size == 1) return;

    switch (cell0Candidates.size) {
      case 1:
        {
          const candidate0 = [...cell0Candidates][0];

          _grid[loc1.row][loc1.col] = _grid[loc1.row][loc1.col].replace(
            `${candidate0 + 1}`,
            "_"
          );

          _grid[loc1.row][loc1.col] = _grid[loc1.row][loc1.col].replace(
            `${candidate0 - 1}`,
            "_"
          );
        }
        return;
    }
  }

  static oneUpOneDownMinus(_grid: GRID, loc0: Loc, loc1: Loc) {
    const cell0 = _grid[loc0.row][loc0.col];
    const cell1 = _grid[loc1.row][loc1.col];

    const cell0Candidates = new Set<number>(cellCandidates(cell0));
    const cell1Candidates = new Set<number>(cellCandidates(cell1));

    for (const c0 of cell0Candidates) {
      if (cell1Candidates.has(c0 - 1)) continue;

      _grid[loc0.row][loc0.col] = _grid[loc0.row][loc0.col].replace(
        `${c0}`,
        "_"
      );
    }

    for (const c1 of cell1Candidates) {
      if (cell0Candidates.has(c1 + 1)) continue;

      _grid[loc1.row][loc1.col] = _grid[loc1.row][loc1.col].replace(
        `${c1}`,
        "_"
      );
    }
  }

  static solveOneUpOneDownRowIntersections(_grid: GRID, rowLocs: Loc[]) {
    for (let j = 0; j < rowLocs.length - 1; j++) {
      const loc0 = rowLocs[j];
      const loc1 = rowLocs[j + 1];

      switch (_grid[loc0.row][loc0.col + 1]) {
        case ".":
          NewTechniques.oneUpOneDownEmpty(_grid, loc0, loc1);
          NewTechniques.oneUpOneDownEmpty(_grid, loc1, loc0);
          continue;
        case "+":
          NewTechniques.oneUpOneDownPlus(_grid, loc0, loc1);
          continue;
        case "-":
          NewTechniques.oneUpOneDownMinus(_grid, loc0, loc1);
          continue;
        default:
          String.fromCharCode();

          console.log(
            `unknown intersection for OneUpOneDown '${+_grid[loc0.row][
              loc0.col + 1
            ]}' ${+"-"}   `
          );
          continue;
      }
    }
  }

  static solveOneUpOneDownColIntersections(_grid: GRID, colLocs: Loc[]) {
    for (let c = 0; c < colLocs.length; c++)
      for (let r = 1; r < colLocs.length * 2 - 1; r += 2) {
        const loc0 = new Loc(r - 1, c * 2);
        const loc1 = new Loc(r + 1, c * 2);

        switch (_grid[r][c]) {
          case ".":
            NewTechniques.oneUpOneDownEmpty(_grid, loc0, loc1);
            NewTechniques.oneUpOneDownEmpty(_grid, loc1, loc0);
            continue;
          case "+":
            NewTechniques.oneUpOneDownPlus(_grid, loc0, loc1);

            continue;
          case "-":
            NewTechniques.oneUpOneDownMinus(_grid, loc0, loc1);
            continue;
          default:
            console.log(
              `unknown intersection for OneUpOneDown '${+_grid[r][c]}'  ${+"-"}`
            );
            continue;
        }
      }
  }

  static isOneUpOneDownRowsIntersectionsSolved(
    _grid: GRID,
    _length: number
  ): boolean {
    for (let r = 0; r < _length; r++)
      for (let c = 1; c < _length * 2 - 1; c += 2) {
        const cell0 = cellCandidates(_grid[r * 2][c - 1]);

        const cell1 = cellCandidates(_grid[r * 2][c + 1]);

        const c0 = cell0[0];

        const c1 = cell1[0];

        if (
          !NewTechniques.isOneUpOneDownIntersectionSolved(
            c0,
            _grid[r * 2][c],
            c1
          )
        )
          return false;
      }

    return true;
  }

  static isOneUpOneDownColsIntersectionsSolved(
    _grid: GRID,
    _length: number
  ): boolean {
    for (let c = 0; c < _length; c++)
      for (let r = 1; r < _length * 2 - 1; r += 2) {
        const cell0 = cellCandidates(_grid[r - 1][c * 2]);
        const cell1 = cellCandidates(_grid[r + 1][c * 2]);

        const c0 = cell0[0];

        const c1 = cell1[0];

        if (
          !NewTechniques.isOneUpOneDownIntersectionSolved(
            c0,
            _grid[r][c * 2],
            c1
          )
        )
          return false;
      }

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

  static isSudokuHouseLocsSolved(
    grid: GRID,
    locs: Loc[],
    length: number
  ): boolean {
    const hash = new Set<number>();

    for (const loc of locs) {
      const candidates = cellCandidates(grid[loc.row][loc.col]);

      if (candidates.length != 1) return false;

      for (const candidate of candidates) hash.add(candidate);
    }

    for (let i = 1; i <= length; i++) if (!hash.has(i)) return false;

    return true;
  }
}

// 1977
