import { Calendar, LightBulb, Settings } from '../../icons'
import NavLink from './NavLink'

const MY_SCHEDULE = 'המערכת שלי'
const BY_TEACHER = 'לפי מורה'
const SETTINGS = 'הגדרות'

const Navbar = () => (
  <nav className="flex justify-between items-center h-14 px-10 bg-white absolute bottom-0 inset-x-0">
    <NavLink to="/" label={MY_SCHEDULE} icon={Calendar} />
    <NavLink to="/teachers" label={BY_TEACHER} icon={LightBulb} />
    <NavLink to="/settings" label={SETTINGS} icon={Settings} />
  </nav>
)

export default Navbar
