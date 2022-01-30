/**
 * Represents an error resulting from user input
 * @author Itay Schechner
 * @version 2022.0.0
 * @extends Error
 */
export class InputError extends Error {
  static get errorName() {
    return 'Input Error';
  }
  constructor(message?: string) {
    super(message);
    this.name = InputError.errorName;
  }
}
