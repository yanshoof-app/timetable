import { ListenerSignature, TypedEmitter } from 'tiny-typed-emitter'
import { fetchDataSource } from '..'
import { IClassesResponse } from '../../interfaces'
import { ClassLookup } from '../class'
import MultiStageOperation, {
  MultiStageOperationEvents,
} from './MultiStageOperation'
import { ErrorCode } from './types'

export abstract class MultiClassQuery<
  Success,
  T extends ListenerSignature<T>
> extends MultiStageOperation<Success, ErrorCode, T> {
  protected school: string
  protected classLookup: ClassLookup

  /**
   * Constrcuts a new MultiClassQuery object
   * @param school the school where the classes are located
   */
  constructor(school: string) {
    super()
    this.school = school
    this.classLookup = null
  }

  protected abstract beginWithClassLookup(): Promise<void>

  public async begin(): Promise<void> {
    try {
      const { Classes } = await fetchDataSource<IClassesResponse>(
        'classes',
        this.school,
        0
      )
      this.classLookup = new ClassLookup(Classes)
    } catch (err) {
      this.emitError(ErrorCode.ERROR_FETCHING_CLASSES)
    }
  }

  protected async forEachClass(
    callback: (classId: number) => Promise<unknown>
  ) {
    for (let grade of this.classLookup.classIds) {
      for (let classId of grade) {
        if (classId == ClassLookup.CLASS_NOT_FOUND) continue
        await callback(classId)
      }
    }
  }
}
