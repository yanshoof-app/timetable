import LoadingScreen from '.'

const FETCHING_LESSONS = 'שיעורים'

export default function FetchingTimetable() {
  return <LoadingScreen label={FETCHING_LESSONS} />
}
