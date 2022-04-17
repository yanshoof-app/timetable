import { ListenerSignature, TypedEmitter } from 'tiny-typed-emitter'

/**
 * Represents events that should be emitted by any multiple stage operation
 */
export interface MultiStageOperationEvents<Success, Error> {
  ready: (result: Success) => void
  error: (err: Error) => void
  delay: () => void
}

type TypeSafeMSOE<Success, Error, T> = Omit<T, 'error' | 'ready' | 'delay'> &
  MultiStageOperationEvents<Success, Error>

/**
 * Represents an operation that takes a long time to process
 * @abstract
 * @extends TypedEmitter for the ability to emit and subscribe to events
 * @author Itay Schechner
 * @version 2022.0.1
 */
abstract class MultiStageOperation<
  Success,
  Error,
  T extends ListenerSignature<T> = ListenerSignature<unknown>
> extends TypedEmitter<TypeSafeMSOE<Success, Error, T>> {
  protected emitError(err: Error) {
    const params = [err] as Parameters<TypeSafeMSOE<Success, Error, T>['error']> // this must be [Error] type
    this.emit('error', ...params)
  }

  protected emitDelay() {
    const params = [] as Parameters<TypeSafeMSOE<Success, Error, T>['delay']> // this must be [] type
    this.emit('delay', ...params)
  }

  public abstract begin(): Promise<void>
}

export default MultiStageOperation
