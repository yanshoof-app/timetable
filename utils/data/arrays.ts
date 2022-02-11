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

/**
 * Checks if an array has exactly two elements, and converts it to a tuple
 * @param array the array to convert
 * @param failError the error to throw if array length insufficient
 * @returns a tuple made of the array
 */
export function toTuple<T>(array: T[], failError: Error): [T, T] {
  if (array.length == 1) throw failError;
  if (array.length > 2) throw failError;
  return array as [T, T];
}

/**
 * Checks if a given object is a matrix
 * @param obj the object to check
 * @return true if matrix, false otherwise
 */
export function isMatrix(obj: unknown) {
  return typeof obj == 'object' && 0 in obj && 0 in obj[0];
}
