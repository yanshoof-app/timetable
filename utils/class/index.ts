import { IscoolClassLookup } from '@yanshoof/iscool'
import { HEBREW_GRADES } from '..'
import { IClassLookup } from '../../interfaces'

/**
 * Class Lookup: a lookup object used in both frontend and backend.
 * @author Itay Schechner
 * @version 2022.0.0
 * @implements IClassLookup, that sets the method of the object.
 */
export class ClassLookup implements IClassLookup {
  static readonly CLASS_NOT_FOUND = IscoolClassLookup.CLASS_NOT_FOUND
  classIds: number[][]
  grades: number[]

  /**
   * Constructs a class lookup object from existing values
   * @param grades the grade array
   * @param classIds the class id matrix
   */
  constructor(grades: number[], classIds: number[][]) {
    this.grades = grades
    this.classIds = classIds
  }

  /**
   * Returns the identifier of the class for future fetches of data.
   * @param grade the garde number of the specified class, a number between 1 and 12
   * @param classNum the class number of the specified class, a number between 1 and _maxGrade
   * @returns the id of the class, -1 if not available
   */
  getId(grade: number, classNum: number): number {
    const gradeIndex = this.grades.indexOf(grade)
    if (
      gradeIndex >= 0 &&
      classNum > 0 &&
      classNum < this.classIds[gradeIndex].length
    )
      return this.classIds[gradeIndex][classNum - 1]
    return IscoolClassLookup.CLASS_NOT_FOUND
  }

  /**
   * Converts a glass number to its hebrew representation
   * @param grade the grade number, a number between 1 and 12
   * @returns the hebrew format of the grade
   */
  public static getFormattedGradeName(grade: number): string {
    return HEBREW_GRADES[grade]
  }
}
