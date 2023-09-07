import { useDate } from '../store/date'
import { Counter } from './Counter'
import { motion, Variants } from 'framer-motion'

export const DisplayAge = () => {
  const {
    age: { day, month, year }
  } = useDate((state) => ({
    age: state.age
  }))

  return (
    <>
      <AgeSection>
        <h3>years</h3>
        <span className='text-violet-500 tracking-widest'>
          <Counter from={0} to={year} />
        </span>
      </AgeSection>
      <AgeSection>
        <h3>months</h3>
        <span className='text-violet-500 tracking-widest'>
          <Counter from={0} to={month} />
        </span>
      </AgeSection>
      <AgeSection>
        <h3>days</h3>
        <span className='text-violet-500 tracking-widest'>
          <Counter from={0} to={day} />
        </span>
      </AgeSection>
    </>
  )
}

type ChildrenType = React.ReactNode

const variants: Variants = {
  initial: {
    y: 10,
    opacity: 0
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring'
    }
  }
}

const AgeSection = ({ children }: { children: ChildrenType }): JSX.Element => {
  return (
    <motion.section
      initial='initial'
      animate='animate'
      variants={variants}
      className='text-[54px] md:text-7xl xl:text-8xl flex flex-row-reverse items-end justify-end italic'
    >
      {children}
    </motion.section>
  )
}
