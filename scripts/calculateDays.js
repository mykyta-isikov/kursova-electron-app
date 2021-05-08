function calculateDays (date1, date2) {
  return moment(date2).diff(moment(date1), 'days')
}
