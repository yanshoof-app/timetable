/**
 * Represents the class type as given by iscool
 */
export interface IClassIscool {
  Id: number;
  Grade: number;
  Number: number;
  //Name: string;
}

/**
 * Checks if a given object is an instance of IClassIscool
 * @param obj the object to check
 * @returns true if all fields of the IClassIscool interface are present in the object
 */
export function isIscoolClass(obj: any): obj is IClassIscool {
  return 'Id' in obj && 'Grade' in obj && 'Number' in obj;
}

/**
 * Represents the methods we want of a class lookup to have
 */
export interface IClassLookup {
  getId(grade: number, classNum: number): number;
  getFormattedGradeName(grade: number): string;
  get classIds(): number[][];
  get minGrade(): number;
  get maxGrade(): number;
  get maxClassNumber(): number;
}

/**
 * The response received from Iscool when fetching for classes
 */
export interface IClassesResponse {
  ClassId: number; // why tho??
  Classes: IClassIscool[];
  Status: string;
}
