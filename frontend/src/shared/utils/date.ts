import moment from 'moment'

export const toDjangoDateString = (date: Date | null) => {
  const targetDate = date || new Date()
  return moment(targetDate).format('YYYY-MM-DD')
}
