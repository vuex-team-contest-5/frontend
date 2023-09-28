const week = {
  Dushanba: 'Du',
  Seshanba: 'Se',
  Chorshanba: 'Cho',
  Payshanba: 'Pa',
  Juma: 'Ju',
  Shanba: 'Sha',
  Yakshanba: 'Yak'
}
export const formatDays = (days) => {
  days = days
    .split(', ')
    .map((day) => week[day])
    .join(',')
  return days
}
