/**
 * Represents an error resulting from user input
 * @author Itay Schechner
 * @version 2022.0.0
 * @extends Error
 */
export class InputError extends Error {
  static get errorName() {
    return 'Input Error'
  }
  constructor(message?: string) {
    super(message)
    this.name = InputError.errorName
  }
}

/**
 * Represents an error resulting from an HTTP request
 */
export class HTTPError extends Error {
  static get errorName() {
    return 'HTTP Error'
  }

  static isHTTPError(err: Error): err is HTTPError {
    return err.name == HTTPError.errorName && 'code' in err
  }

  readonly code
  constructor(code: number, message?: string) {
    super(message)
    this.code = code
    this.name = HTTPError.errorName
  }
}
