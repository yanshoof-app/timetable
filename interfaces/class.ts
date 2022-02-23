/**
 * Represents the methods we want of a class lookup to have
 */
export interface IClassLookup {
  getId(grade: number, classNum: number): number
  getFormattedGradeName(grade: number): string
  get classIds(): number[][]
  get grades(): number[]
}
