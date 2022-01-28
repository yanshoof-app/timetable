export function initMatrix<T>(
  dim1: number,
  dim2: number,
  defaultValue: any = {}
): T[][] {
  const result: T[][] = new Array<T[]>(dim1);
  for (let i = 0; i < dim1; i++) {
    result[i] = new Array<T>(dim2);
    for (let j = 0; j < dim2; j++) {
      result[i][j] = defaultValue as T;
    }
  }
  return result;
}
