export interface IClassIscool {
  Id: number;
  Grade: number;
  Number: number;
  //Name: string;
}

export function isIscoolClass(obj: any): obj is IClassIscool {
  return 'Id' in obj && 'Grade' in obj && 'Number' in obj;
}

export interface IClassLookup {
  getId(grade: number, classNum: number): number;
  getFormattedGradeName(grade: number): string;
  get classIds(): number[][];
  get minGrade(): number;
  get maxGrade(): number;
  get maxClassNumber(): number;
}

export interface IClassesResponse {
  ClassId: number; // why tho??
  Classes: IClassIscool[];
  Status: string;
}
