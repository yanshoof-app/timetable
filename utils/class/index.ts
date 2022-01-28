import { initMatrix } from '..';
import { HEBREW_GRADES } from '..';
import { IClassIscool, IClassLookup, isIscoolClass } from './types';

/**
 * Class Lookup: a lookup object used in both frontend and backend.
 * @author Itay Schechner
 * @version 2022.0.0
 * @implements IClassLookup, that sets the method of the object.
 */
export class ClassLookup implements IClassLookup {
  static readonly CLASS_NOT_FOUND = -1;
  private _classIds: number[][];
  private _minGrade: number;
  private _maxGrade: number;
  private _maxClassNumber: number;

  /**
   * Initialize a class lookup object in one of the following ways:
   * @example // for backend
   * const classLookup = new ClassLookup(Schedule)
   * @example // for frontend
   * const classLookup = new ClassLookup(_classIds, _minGrade, _maxGrade, _maxClassNumber)
   * @param classes an array of Iscool classes, or a matrix of class ids
   * @param minGrade the minimum grade, a number between 1 and 12.
   * @param maxGrade the maximum grade, a number between 1 and 12.
   * @param maxClassNumber the highest of numbers of classes in each grade.
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

  /**
   * Write Iscool classes into object
   * @param classes the classes
   */
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

  /**
   * Returns the identifier of the class for future fetches of data.
   * @param grade the garde number of the specified class, a number between 1 and 12
   * @param classNum the class number of the specified class, a number between 1 and _maxGrade
   * @returns the id of the class, -1 if not available
   */
  getId(grade: number, classNum: number): number {
    return this._classIds[grade - this._minGrade][classNum - 1];
  }

  private setId(grade: number, classNum: number, id: number) {
    this._classIds[grade - this._minGrade][classNum - 1] = id;
  }

  /**
   * Converts a glass number to its hebrew representation
   * @param grade the grade number, a number between 1 and 12
   * @returns the hebrew format of the grade
   */
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
