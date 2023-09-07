import { useDate } from '../store/date'
import { motion } from 'framer-motion'

export const CalculateButton = () => {
  const {
    isValidDay,
    isValidMonth,
    isValidYear,
    isEmpty,
    isValidDate,
    calculateAge
  } = useDate((state) => ({
    isValidDay: state.isValidDay,
    isValidMonth: state.isValidMonth,
    isValidYear: state.isValidYear,
    isEmpty: state.isEmpty,
    isValidDate: state.isValidDate,
    calculateAge: state.calculateAge
  }))

  const isAllNotValidate =
    isEmpty || !isValidDay || !isValidMonth || !isValidYear || !isValidDate

  return (
    <div className='w-full h-24 flex relative items-center justify-center'>
      <div className='h-[1px] w-full absolute md:static z-0 md:flex-1 bg-neutral-200'></div>
      <motion.button
        className='w-16 h-16 md:w-24 md:h-24 bg-violet-500 hover:bg-black cursor-pointer rounded-full z-10 flex items-center justify-center'
        onClick={calculateAge}
        whileHover={{ scale: 1.15 }}
        whileTap={{ scale: 0.9 }}
        disabled={isAllNotValidate}
      >
        <ButtonSvg />
      </motion.button>
    </div>
  )
}

const ButtonSvg = () => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='46'
      height='44'
      viewBox='0 0 46 44'
      className='w-6 h-6 md:w-11 md:h-11'
    >
      <path
        fill='none'
        stroke='#FFF'
        strokeWidth='2'
        d='M1 22.019C8.333 21.686 23 25.616 23 44m0 0V0m22 22.019C37.667 21.686 23 25.616 23 44'
      ></path>
    </svg>
  )
}
