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
        <span className='text-violet-500 tracking-widest  min-w-[80px] md:min-w-[105px] xl:min-w-[150px]'>
          <Counter from={0} to={year} />
        </span>
        years
      </AgeSection>
      <AgeSection>
        <span className='text-violet-500 tracking-widest  min-w-[80px] md:min-w-[105px] xl:min-w-[150px]'>
          <Counter from={0} to={month} />
        </span>
        months
      </AgeSection>
      <AgeSection>
        <span className='text-violet-500 tracking-widest min-w-[80px]  md:min-w-[105px] xl:min-w-[150px]'>
          <Counter from={0} to={day} />
        </span>
        days
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
      className='text-[54px] md:text-7xl xl:text-8xl flex items-start justify-start italic'
    >
      <h3 className='flex'>{children}</h3>
    </motion.section>
  )
}
