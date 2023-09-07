import { CalculateButton } from './components/CalculateButton'
import { DateForm } from './components/DateForm'
import { DisplayAge } from './components/DisplayAge'

const App = () => {
  return (
    <>
      <main className='bg-white py-12 px-6 md:p-14 rounded-xl rounded-br-[100px] xl:rounded-br-[200px] w-[90%] xl:w-[90%] max-w-[840px] h-[80%] max-h-[651px] font-bold'>
        <DateForm />
        <CalculateButton />
        <DisplayAge />
      </main>
    </>
  )
}

export default App
