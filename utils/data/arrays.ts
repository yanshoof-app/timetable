/**
 * Creates a matrix in given dimensions
 * @example
 * const schedule = initMatrix<ILesson>(7, 12)
 *
 * @param dim1 the length of the parent array
 * @param dim2 the length of the child arrays
 * @param defaultValue the value to put in all matrix elements, defaults to {}
 * @returns a matrix in the size of dim1*dim2
 */
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
