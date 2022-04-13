import { useCallback, useEffect, useMemo } from 'react'
import { useClassLookup } from '../../contexts/ClassLookup'
import { useStorage } from '../../contexts/Storage'
import useClassPick from '../../hooks/useClassPick'
import { ClassLookup } from '../../utils'
import Button from '../forms/Button'
import DropdownPick from '../forms/DropdownPick'
import { Edit } from '../icons'
import LoadingScreen from '../ui/LoadingScreens'
import { SettingsComponent } from './types'

export interface IClassSetting {
  classId: string
  grade: number
  classNum: number
}

export interface IClassSettingProps {
  onSchoolEditClick(): unknown
}

const ClassSetting: SettingsComponent<IClassSetting, IClassSettingProps> = ({
  value: { grade, classNum },
  onChange,
  save,
  onSchoolEditClick,
}) => {
  const { schoolName } = useStorage()
  const { isLoadingClasses } = useClassLookup()
  const {
    gradeOptions,
    gradeIndex,
    onGradeIndexChange,
    classNumOptions,
    onClassNumIndexChange,
  } = useClassPick({ grade, classNum, onChange })

  if (isLoadingClasses) return <LoadingScreen label="כיתות" />

  return (
    <div className="flex flex-col justify-center items-center gap-5">
      <div className="flex flex-col gap-2 justify-center items-center">
        <div className="flex justify-center items-center gap-1">
          <p className="font-bold text-4xl">{schoolName}</p>
          <button onClick={onSchoolEditClick}>
            <Edit width={24} height={24}></Edit>
          </button>
        </div>
        <p className="font-bold text-2xl">באיזו כיתה אתם לומדים?</p>
      </div>
      <div className="flex gap-4 justify-center">
        <DropdownPick
          options={gradeOptions}
          onIndexChange={onGradeIndexChange}
          indexOfValue={gradeIndex}
        />
        <DropdownPick
          options={classNumOptions}
          onIndexChange={onClassNumIndexChange}
          indexOfValue={classNum ? classNum - 1 : 0}
        />
        <Button className="w-20" onClick={save}>
          הבא
        </Button>
      </div>
    </div>
  )
}

export default ClassSetting
