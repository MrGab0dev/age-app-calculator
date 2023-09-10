import { useDate } from '../store/date'
import { motion } from 'framer-motion'
import { type FieldOptions } from '../types'

export const DateForm = () => {
  const { getDay, getMonth, getYear, isValidDay, isValidMonth, isValidYear } =
    useDate((state) => ({
      getDay: state.getDay,
      getMonth: state.getMonth,
      getYear: state.getYear,
      isValidDay: state.isValidDay,
      isValidMonth: state.isValidMonth,
      isValidYear: state.isValidYear
    }))

  return (
    <form className='flex items-start gap-8 min-h-[160px] md:min-h-[120px]'>
      <DateField dateType='day' getValue={getDay} isValid={isValidDay} />
      <DateField dateType='month' getValue={getMonth} isValid={isValidMonth} />
      <DateField dateType='year' getValue={getYear} isValid={isValidYear} />
    </form>
  )
}

interface DateFieldProps {
  dateType: string
  getValue: (value: number) => void
  isValid: boolean
}

const inputPlaceHolder: FieldOptions = {
  day: {
    placeholder: 'DD',
    error: 'Must be a valid day'
  },
  month: {
    placeholder: 'MM',
    error: 'Must be a valid month'
  },
  year: {
    placeholder: 'YYYY',
    error: 'Must be in the past'
  }
}

const DateField: React.FC<DateFieldProps> = ({
  dateType,
  getValue,
  isValid
}) => {
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue: number = parseInt(e.target.value)
    getValue(newValue)
  }

  const { isEmpty, isValidDate } = useDate((state) => ({
    isEmpty: state.isEmpty,
    isValidDate: state.isValidDate
  }))
  const { placeholder, error } = inputPlaceHolder[dateType]

  return (
    <label
      htmlFor={dateType}
      className='flex flex-col min-w-[80px] max-w-[160px] cursor-pointer gap-4 xl:gap-[7px]'
    >
      <span
        className={`uppercase  text-sm tracking-[0.2em] ${
          !isValid || isEmpty || !isValidDate
            ? 'text-red-400'
            : 'text-stone-500'
        }`}
      >
        {dateType}
      </span>
      <input
        name={dateType}
        type='number'
        placeholder={placeholder}
        onChange={handleInput}
        className={`min-w-full cursor-pointer border-2 border-neutral-300 rounded-lg p-4 md:px-6 md:py-3 text-xl md:text-2xl xl:text-3xl focus:outline-none focus:border-purple-600 ${
          (!isValid || isEmpty || !isValidDate) &&
          'focus:border-red-400 border-red-400'
        }`}
      />
      <motion.span
        initial={{
          y: -100,
          opacity: 0
        }}
        animate={{
          y: 0,
          opacity: 1
        }}
        transition={{
          type: 'spring',
          delay: 0.5
        }}
        className='text-red-400 font-normal text-sm italic'
      >
        {!isValid ? error : ''}
        {isEmpty && 'This field is required'}
        {!isValidDate && placeholder === 'DD' ? 'Must be a valid date' : null}
      </motion.span>
    </label>
  )
}
