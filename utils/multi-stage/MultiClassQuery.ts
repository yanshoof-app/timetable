import { ListenerSignature } from 'tiny-typed-emitter'
import { fetchDataSource } from '..'
import { IClassesResponse } from '../../interfaces'
import { HTTPError } from '../../interfaces/errors'
import { ClassLookup } from '../class'
import MultiStageOperation from './MultiStageOperation'
import { ErrorCode } from './types'

export abstract class MultiClassQuery<
  Success,
  T extends ListenerSignature<T>
> extends MultiStageOperation<Success, ErrorCode, T> {
  protected school: string
  private classLookup: ClassLookup
  private sleepInterval = 100 // 100 ms

  private static MAX_SLEEP_INTERVAL = 5000 // 5 seconds

  /**
   * Constrcuts a new MultiClassQuery object
   * @param school the school where the classes are located
   * @param givenClassIds the classIds as sent by the client
   * @param givenGrades the grades as sent by the client
   */
  constructor(
    school: string,
    givenClassIds: number[][],
    givenGrades: number[]
  ) {
    super()
    this.school = school
    this.classLookup = new ClassLookup(givenClassIds, givenGrades)
  }

  private async sleep() {
    return new Promise((resolve) => {
      setTimeout(resolve, this.sleepInterval)
    })
  }

  protected abstract beginWithClassLookup(): Promise<void>

  public async begin(): Promise<void> {
    try {
      const { Classes } = await fetchDataSource<IClassesResponse>(
        'classes',
        this.school,
        0
      )
      const queriedLookup = new ClassLookup(Classes)
      if (queriedLookup.gradesSize > this.classLookup.gradesSize)
        this.classLookup = queriedLookup
    } catch (err) {
      console.log(err)
      this.emitError(ErrorCode.ERROR_FETCHING_CLASSES)
    } finally {
      // continue with given classes
      await this.beginWithClassLookup()
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

  protected async fetchUntilResult<T extends {}>(
    ...args: Parameters<typeof fetchDataSource>
  ): Promise<T> {
    let hasSleptFlag = false
    while (this.sleepInterval <= MultiClassQuery.MAX_SLEEP_INTERVAL) {
      try {
        const result = await fetchDataSource<T>(...args)
        return result
      } catch (err) {
        if (HTTPError.isHTTPError(err) && err.code == 429) {
          // too many requests
          this.emitDelay()
          await this.sleep()
          if (!hasSleptFlag) hasSleptFlag = true
          else {
            this.sleepInterval *= 2
            hasSleptFlag = false
          }
        }
        // another error
        this.emitError(ErrorCode.UNEXPECTED_ERROR_DURING_CLASS_FETCH)
      }
    }
    throw new Error('Timeout exceeded')
  }
}
