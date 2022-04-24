import { useStorage } from '../../../contexts/Storage'
import useChanges from '../../../hooks/useChanges'
import { ILesson } from '../../../interfaces'
import { timetable_example } from '../../../timetable_sample'
import { Calendar, LightBulb, List, Settings } from '../../icons'
import NavLink from './NavLink'

const MY_SCHEDULE = 'המערכת שלי'
const CHANGES = 'שינויים'
const BY_TEACHER = 'לפי מורה'
const SETTINGS = 'הגדרות'

const Navbar = () => {
  const { numOfChanges } = useChanges()

  return (
    <nav className="grid grid-cols-4 items-center w-full h-14 bg-white dark:bg-slate-900 fixed bottom-0 inset-x-0 z-10 border-gray-200 dark:border-slate-700 border-t-[1px]">
      <NavLink to="/" label={MY_SCHEDULE} icon={Calendar} />
      <NavLink
        to="/changes"
        label={CHANGES}
        icon={List}
        update={numOfChanges}
      />
      <NavLink to="/teachers" label={BY_TEACHER} icon={LightBulb} />
      <NavLink to="/settings" label={SETTINGS} icon={Settings} />
    </nav>
  )
}

export default Navbar
