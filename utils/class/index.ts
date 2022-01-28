import { initMatrix } from '..';
import { HEBREW_GRADES } from '..';
import { IClassIscool, IClassLookup, isIscoolClass } from './types';

export class ClassLookup implements IClassLookup {
  static readonly CLASS_NOT_FOUND = -1;
  private _classIds: number[][];
  private _minGrade: number;
  private _maxGrade: number;
  private _maxClassNumber: number;

  /**
   * Empty constructor
   */
  constructor(
    classes: IClassIscool[] | number[][],
    minGrade?: number,
    maxGrade?: number,
    maxClassNumber?: number
  ) {
    if (isIscoolClass(classes[0])) this.fromIscool(classes as IClassIscool[]);
    else {
      this._classIds = classes as number[][];
      if (!minGrade || !maxGrade || !maxClassNumber)
        throw new Error(
          'Expected minGrade, maxGrade and maxClassNumber in constructor'
        );
      this._minGrade = minGrade;
      this._maxGrade = maxGrade;
      this._maxClassNumber = maxClassNumber;
    }
  }

  private fromIscool(classes: IClassIscool[]) {
    const grades = classes.map(({ Grade }) => Grade);
    const classNums = classes.map(({ Number: classNum }) => classNum);
    this._minGrade = Math.min(...grades);
    this._maxGrade = Math.max(...grades);
    this._maxClassNumber = Math.max(...classNums);
    const numberOfGrades = this._maxGrade - this._minGrade + 1; // i.e 12 - 7 + 1 = 6 grades
    this._classIds = initMatrix(
      numberOfGrades,
      this._maxClassNumber,
      ClassLookup.CLASS_NOT_FOUND
    );

    classes.forEach(({ Grade, Number: classNum, Id }) =>
      this.setId(Grade, classNum, Id)
    );
  }

  getId(grade: number, classNum: number): number {
    return this._classIds[grade - this._minGrade][classNum - 1];
  }

  private setId(grade: number, classNum: number, id: number) {
    this._classIds[grade - this._minGrade][classNum - 1] = id;
  }

  getFormattedGradeName(grade: number): string {
    return HEBREW_GRADES[grade];
  }

  get classIds(): number[][] {
    return this._classIds;
  }

  get minGrade(): number {
    return this._minGrade;
  }

  get maxGrade(): number {
    return this._maxGrade;
  }

  get maxClassNumber(): number {
    return this._maxClassNumber;
  }
}
