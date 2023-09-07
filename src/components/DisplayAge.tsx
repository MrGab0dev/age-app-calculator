import { useDate } from '../store/date'
import { Counter } from './Counter'

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

const AgeSection = ({ children }: { children: ChildrenType }): JSX.Element => {
  return (
    <section className='text-[54px] md:text-7xl xl:text-8xl flex flex-row-reverse items-end justify-end italic'>
      {children}
    </section>
  )
}
