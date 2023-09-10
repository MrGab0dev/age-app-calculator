import { create } from 'zustand'
import { type DateType } from '../types'

interface State {
  day: number
  month: number
  year: number
  age: DateType
  isValidDay: boolean
  isValidMonth: boolean
  isValidYear: boolean
  isValidDate: boolean
  isEmpty: boolean
  getDay: (day: number) => void
  getMonth: (month: number) => void
  getYear: (year: number) => void
  calculateAge: (e: React.FormEvent<HTMLButtonElement>) => void
}

const differenceOfDates = (
  currentDate: DateType,
  oldDate: DateType
): DateType => {
  const {
    day: currentDay,
    month: currentMonth,
    year: currentYear
  } = currentDate

  const { day: oldDay, month: oldMonth, year: oldYear } = oldDate
  const daysInMonth = new Date(currentYear, currentMonth, 0).getDate()
  const daysDiff = Math.abs(currentDay - oldDay)
  const monthsDiff = Math.abs(currentMonth - oldMonth)
  const yearsDiff = Math.abs(currentYear - oldYear)
  const newDiffDays = Math.abs(daysDiff - daysInMonth)
  const newYearsDiff = Math.abs(yearsDiff - 1)

  if (
    currentDay <= oldDay &&
    currentMonth <= oldMonth &&
    currentYear <= oldYear
  ) {
    return {
      day: 0,
      month: 0,
      year: 0
    }
  }
  // example: 1th <= 25th ✅
  if (currentDay <= oldDay) {
    // example: 5th < 10th ✅
    if (currentMonth <= oldMonth)
      return { day: newDiffDays, month: 12 - monthsDiff, year: newYearsDiff }

    return {
      day: newDiffDays,
      month: monthsDiff,
      year: newYearsDiff
    }
  }

  return {
    day: daysDiff,
    month: monthsDiff,
    year: yearsDiff
  }
}

// Remember that the month is 0-based so February is actually 1...
const validateDate = ({ day, month, year }: DateType): boolean => {
  const accurateMonth = month - 1
  const date = new Date(year, accurateMonth, day)

  if (
    date.getFullYear() == year &&
    date.getMonth() == month - 1 &&
    date.getDate() == day
  ) {
    return true
  }
  return false
}

export const useDate = create<State>((set, get) => ({
  day: 0,
  month: 0,
  year: 0,
  age: {
    day: 0,
    month: 0,
    year: 0
  },
  isValidDay: true,
  isValidMonth: true,
  isValidYear: true,
  isEmpty: false,
  isValidDate: true,
  getDay: (day: number) => {
    if (day > 31) return set({ isValidDay: false })
    set({ day, isValidDay: true, isEmpty: false })
  },
  getMonth: (month: number) => {
    if (month > 12) return set({ isValidMonth: false })
    set({ month, isValidMonth: true, isEmpty: false })
  },
  getYear: (year: number) => {
    const currentYear = new Date().getFullYear()
    if (year > currentYear) return set({ isValidYear: false })
    set({ year, isValidYear: true, isEmpty: false })
  },
  calculateAge: (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault()
    const { day, month, year } = get()
    const validateFields = day && month && year ? true : false

    if (!validateFields) return set({ isEmpty: true })

    const oldDate: DateType = {
      day: day,
      month: month,
      year: year
    }
    const currentDate: DateType = {
      day: new Date().getDate(),
      month: new Date().getMonth() + 1,
      year: new Date().getFullYear()
    }

    const newDate: DateType = differenceOfDates(currentDate, oldDate)
    console.log(newDate)

    const isValidDate: boolean = validateDate(oldDate)
    if (!isValidDate) return set({ isValidDate })

    set({
      age: newDate,
      isValidDate
    })
  }
}))
