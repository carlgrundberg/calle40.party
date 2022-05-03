import { useState } from 'react'
import './App.css'
import { ImageGrid } from './components/grid/ImageGrid'
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
    title: 'Calle 40!',
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
      <p className="my-2">
        Vi börjar med en enkel.
        <br />
        Vem är det som fyller år?
      </p>
    ),
    solution: 'CALLE',
  },
  {
    title: 'Utmaning 2',
    content: (
      <p className="my-2">
        Festen kommer hållas den 30 juli, men kan du lista ut var?
      </p>
    ),
    solution: 'VITTSJÖ',
  },
  {
    title: 'Utmaning 3',
    content: <p className="my-2">Vad heter världens bästa hockeylag?</p>,
    solution: 'MODO',
  },
  {
    title: 'Säkerhetsfråga',
    content: (
      <>
        <p className="my-2">
          För att säkerställa att du inte är en robot så klicka på bilderna som
          föreställer öl.
        </p>
      </>
    ),
    images: [
      'https://media.istockphoto.com/photos/cheers-picture-id475500992?b=1&k=20&m=475500992&s=170667a&w=0&h=6qdnWAUz0OYN9sonDqxaXBcMOm2eRkd86ros2OTSThA=',
      'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
      'https://media.istockphoto.com/photos/closeup-view-of-a-two-glass-of-beer-in-hand-beer-glasses-clinking-at-picture-id1300799299?b=1&k=20&m=1300799299&s=170667a&w=0&h=M1iD6XxBPQobeCUPCiDMoT1cXZfXVyfVLySNUw5pQNs=',
      'https://images.unsplash.com/photo-1608270586620-248524c67de9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8YmVlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
      'https://images.unsplash.com/photo-1614314972378-7c1acc64f747?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8OHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=60',
      'https://images.unsplash.com/photo-1651404452457-ce332063295b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MTl8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60',
      'https://images.unsplash.com/photo-1583064313769-298cb7c85852?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8Y2lkZXJ8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60',
      'https://media.istockphoto.com/photos/closeup-of-champagne-flutes-picture-id1169288490?b=1&k=20&m=1169288490&s=170667a&w=0&h=3tO2K5LoXDhpHMu5nlL5GZ9Ht_6Kcnk_eoBhRwUbmfE=',
      'https://images.unsplash.com/photo-1598883851181-8d5e42917481?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8c3RvdXR8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60',
    ],
    imagesSolution: [0, 2, 3, 8],
  },
  {
    title: 'Grattis, du är välkommen på festen den 30 juli!',
    content: (
      <>
        <p className="my-2">
          Fyll i formuläret nedan för att anmäla dig. Mer information kommer när
          det närmar sig.
        </p>
        <form
          className="w-full max-w-lg"
          data-netlify="true"
          method="POST"
          name="register"
        >
          <label className="block mt-2">
            <span>Namn</span>
            <input
              name="Namn"
              type="text"
              className="
              mt-1
              block
              w-full
              rounded-md
              text-gray-700
              border-gray-300
              shadow-sm
              focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50
            "
              placeholder=""
              autoComplete="name"
            />
          </label>
          <label className="block mt-2">
            <span>Email</span>
            <input
              name="Email"
              type="email"
              className="
              mt-1
              block
              w-full
              rounded-md
              text-gray-700
              border-gray-300
              shadow-sm
              focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50
            "
              placeholder=""
              autoComplete="email"
            />
          </label>
          <label className="block mt-2">
            <span>Telefon</span>
            <input
              name="Telefon"
              type="tel"
              className="
              mt-1
              block
              w-full
              rounded-md
              text-gray-700
              border-gray-300
              shadow-sm
              focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50
            "
              placeholder=""
              autoComplete="tel"
            />
          </label>
          <label className="block mt-2">
            <span>Antal (ta med familjen)</span>
            <input
              name="Antal"
              type="number"
              min={1}
              max={10}
              className="
              mt-1
              block
              w-full
              rounded-md
              text-gray-700
              border-gray-300
              shadow-sm
              focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50
            "
              defaultValue={1}
            />
          </label>
          <button
            className="mt-4 py-2 px-4 bg-indigo-600 rounded"
            type="submit"
          >
            Skicka
          </button>
        </form>
      </>
    ),
  },
  {
    title: 'Tack för din anmälan',
    content: <p className="my-2">Vi ses på festen den 30 juli!</p>,
  },
]

function App() {
  const [step, setStep] = useState(5)
  const { title, content, solution, images, imagesSolution, next } = steps[step]

  const nextStep = () => {
    setStep(step + 1)
  }

  return (
    <div className="h-screen flex flex-col justify-center items-center p-4">
      <h1 className="m-4 text-4xl">{title}</h1>
      {content}
      {solution && <Wordle solution={solution} onSuccess={nextStep} />}
      {images && (
        <ImageGrid
          images={images}
          solution={imagesSolution as number[]}
          onSuccess={nextStep}
        />
      )}
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
