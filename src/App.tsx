import { useState } from 'react'
import './App.css'
import Wordle from './Wordle'

// const Step3 = ({nextStep}: StepProps) => (
//   <div className="p-4 md:max-w-7xl w-full mx-auto sm:px-6 lg:px-8 flex flex-col text-center">
//   <h1 className="mb-4 text-4xl">Test 3</h1>
//   <p className="my-2">Lite nyttig information om festen. Fyll i de saknade ordet för att komma vidare.</p>
//   <p className="my-2">Välkommen på fest i ____ lördagen den ____.</p>
// </div>
// )

// const Step4 = ({nextStep}: StepProps) => (
//   <div className="p-4 md:max-w-7xl w-full mx-auto sm:px-6 lg:px-8 flex flex-col text-center">
//   <h1 className="mb-4 text-4xl">Test 4</h1>
//   <p className="my-2">För att säkerställa att du inte är en robot så klicka på bilderna som föreställer Calle.</p>
// </div>
// )

// const Step5 = ({nextStep}: StepProps) => (
//   <div className="p-4 md:max-w-7xl w-full mx-auto sm:px-6 lg:px-8 flex flex-col text-center">
//   <h1 className="mb-4 text-4xl">Grattis, du klarade alla tester</h1>
//   <p className="my-2">Fyll i informationen nedan för att anmäla dig.</p>
// </div>
// )

const steps = [
  {
    title: 'Calle 40',
    content: (
      <>
        <p className="my-2">
          Jasså du har hört att jag fyller 40, och nu vill du gå på kalas?
        </p>
        <p className="my-2">
          Ja! Det blir ett kalas men för att få komma så måste du klara ett par
          utmaningar så jag vet att du verkligen vill.
        </p>
      </>
    ),
    next: 'Starta test',
  },
  {
    title: 'Utmaning 1',
    content: (
      <>
        <p className="my-2">
          Vi börjar med en enkel.
          <br />
          Lista ut vilket ord som saknas för att komma vidare.
        </p>
        <p className="my-2">Världens bästa hockeylag heter ____.</p>
      </>
    ),
    solution: 'MODO',
  },
  {
    title: 'Utmaning 2',
    content: (
      <>
        <p className="my-2">
          Lite nyttig information om festen. Fyll i de saknade ordet för att
          komma vidare.
        </p>
        <p className="my-2">Välkommen på fest i ______ lördagen den 30 juli.</p>
      </>
    ),
    solution: 'VITTSJÖ',
  },
  {
    title: 'Utmaning 3',
    content: (
      <>
        <p className="my-2">
          För att säkerställa att du inte är en robot så klicka på bilderna som
          föreställer Calle.
        </p>
      </>
    ),
  },
  {
    title: 'Grattis, du klarade alla tester',
    content: (
      <p className="my-2">Fyll i informationen nedan för att anmäla dig.</p>
    ),
  },
]

function App() {
  const [step, setStep] = useState(1)
  const { title, content, solution, next } = steps[step]

  const nextStep = () => {
    setStep(step + 1)
  }

  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <h1 className="m-4 text-4xl">{title}</h1>
      {content}
      {solution && <Wordle solution={solution} onSuccess={nextStep} />}
      {next && (
        <button
          className="mt-4 py-2 px-4 bg-indigo-600 rounded"
          onClick={nextStep}
        >
          {next}
        </button>
      )}
    </div>
  )
}

export default App
