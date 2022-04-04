import { Calendar, LightBulb, Settings } from '../../icons'
import NavLink from './NavLink'

const MY_SCHEDULE = 'המערכת שלי'
const BY_TEACHER = 'לפי מורה'
const SETTINGS = 'הגדרות'

const Navbar = () => (
  <nav className="grid grid-cols-3 items-center w-full h-14 bg-white fixed bottom-0 inset-x-0 z-10 border-gray-200 border-t-[1px]">
    <NavLink to="/" label={MY_SCHEDULE} icon={Calendar} />
    <NavLink to="/teachers" label={BY_TEACHER} icon={LightBulb} />
    <NavLink to="/settings" label={SETTINGS} icon={Settings} />
  </nav>
)

export default Navbar
