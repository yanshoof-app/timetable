import { createContext } from 'react'
import { IUpdateableTimetable } from '../../hooks/useUpdateableTimetable'

export const TimetableContext = createContext({} as IUpdateableTimetable)
