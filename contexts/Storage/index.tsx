// the context responsible for handling storage

import { Component, createContext } from 'react'
import { Wrapper } from '../../components/types'
import { DayOfWeek, HourOfDay } from '../../interfaces'
import { createUseContextHook } from '../utils'
import {
  IStorage,
  IStorageContext,
  IStorageValues,
  ThemePreference,
  UpdateTimePreference,
} from './types'

export const StorageContext = createContext<IStorageContext>(
  {} as IStorageContext
)

export const useStorage = createUseContextHook(StorageContext)

export * from './wrappers'

export class StorageProvider
  extends Component<Wrapper, IStorageValues>
  implements IStorage
{
  constructor(props: Wrapper) {
    super(props)
    this.state = {
      school: localStorage.getItem('school'),
      classId: localStorage.getItem('classId'),
      scheduleSettings: JSON.parse(localStorage.getItem('settings')),
      theme: (localStorage.getItem('theme') || 'system') as ThemePreference,
      updateTime: (Number(localStorage.getItem('updateTime')) ||
        24) as UpdateTimePreference,
    }
  }
  setSchool(newValue?: string): void {
    this.setState({ school: newValue })
  }
  setClassId(newValue?: string): void {
    this.setState({ classId: newValue })
  }
  setTheme(newValue: 'system' | 'light' | 'dark' = 'system'): void {
    this.setState({ theme: newValue })
  }
  setUpdateTime(newValue: number = 24): void {
    this.setState({ updateTime: newValue })
  }
  setOthersChangesPreference(newValue: boolean = true): void {
    this.setState({
      scheduleSettings: {
        ...this.state.scheduleSettings,
        showOthersChanges: newValue,
      },
    })
  }
  appendScheduleSetting([day, hour, subject, teacher]: [
    DayOfWeek,
    HourOfDay,
    string,
    string
  ]): void {
    let studyGroupIndex = this.state.scheduleSettings.studyGroups.findIndex(
      ([s, t]) => s == subject && t == teacher
    )
    let newStudyGroupArr = [...this.state.scheduleSettings.studyGroups]
    if (studyGroupIndex == -1) {
      studyGroupIndex = newStudyGroupArr.length
      newStudyGroupArr.push([subject, teacher])
    }
    const newStudyGroupMap = new Map(
      this.state.scheduleSettings.studyGroupMap.set(
        `${day},${hour}`,
        newStudyGroupArr.length
      )
    )
    this.setState({
      scheduleSettings: {
        ...this.state.scheduleSettings,
        studyGroupMap: newStudyGroupMap,
        studyGroups: newStudyGroupArr,
      },
    })
  }
  render() {
    return (
      <StorageContext.Provider
        value={{
          ...this.state,
          setSchool: this.setSchool,
          setClassId: this.setClassId,
          setTheme: this.setTheme,
          setUpdateTime: this.setUpdateTime,
          setOthersChangesPreference: this.setOthersChangesPreference,
          appendScheduleSetting: this.appendScheduleSetting,
        }}
      >
        {this.props.children}
      </StorageContext.Provider>
    )
  }
  save() {}
  componentWillUnmount(): void {}
}
