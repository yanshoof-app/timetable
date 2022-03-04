import { HEBREW_GRADES } from '..'
import { IClassIscool, IClassLookup, isIscoolClass } from '../../interfaces'
import { isArray } from '../data/arrays'

/**
 * Class Lookup: a lookup object used in both frontend and backend.
 * @author Itay Schechner
 * @version 2022.0.0
 * @implements IClassLookup, that sets the method of the object.
 */
export class ClassLookup implements IClassLookup {
  static readonly CLASS_NOT_FOUND = -1
  private gradeMap: Map<number, number[]>

  /**
   * Initialize a class lookup from Iscool classes
   * @param classes the array of Iscool classes to create a class lookup from
   * @example
   * const classLookup = new ClassLookup(Classes)
   */
  constructor(classes: IClassIscool[])

  /**
   * Initialize a class lookup from existing values
   * @param gradeMap the existing map of grade to classIds
   * @example
   * const classLookup = new ClassLookup(gradeMap)
   */
  constructor(gradeMap: Map<number, number[]>)

  constructor(...args: unknown[]) {
    const [classes] = args
    if (isArray(classes) && isIscoolClass(classes[0]))
      this.fromIscool(classes as IClassIscool[])
    else if (classes instanceof Map) {
      this.gradeMap = classes
    } else throw new Error('Invalid values in constructor')
  }

  /**
   * Write Iscool classes into object
   * @param classes the classes
   */
  private fromIscool(classes: IClassIscool[]) {
    let grades = classes.map(({ Grade }) => Grade)
    const classNums = classes.map(({ Number: classNum }) => classNum)

    grades = [...new Set(grades)] // unique values only
    const maxClassNum = Math.max(...classNums)
    this.gradeMap = new Map(
      grades.map((grd) => [
        grd,
        new Array(maxClassNum).fill(ClassLookup.CLASS_NOT_FOUND),
      ])
    )
    classes.forEach(({ Grade, Number: classNum, Id }) =>
      this.setId(Grade, classNum, Id)
    )
  }

  /**
   * Returns the identifier of the class for future fetches of data.
   * @param grade the garde number of the specified class, a number between 1 and 12
   * @param classNum the class number of the specified class, a number between 1 and _maxGrade
   * @returns the id of the class, -1 if not available
   */
  getId(grade: number, classNum: number): number {
    if (!this.gradeMap.has(grade)) return ClassLookup.CLASS_NOT_FOUND
    return this.gradeMap.get(grade)[classNum - 1]
  }

  private setId(grade: number, classNum: number, id: number) {
    this.gradeMap.get(grade)[classNum - 1] = id
  }

  /**
   * Converts a glass number to its hebrew representation
   * @param grade the grade number, a number between 1 and 12
   * @returns the hebrew format of the grade
   */
  public static getFormattedGradeName(grade: number): string {
    return HEBREW_GRADES[grade]
  }

  get classIds(): number[][] {
    let arr: number[][] = []
    for (let [, classIds] of this.gradeMap) arr.push(classIds)
    return arr
  }

  get grades(): number[] {
    return [...this.gradeMap.keys()]
  }
}
