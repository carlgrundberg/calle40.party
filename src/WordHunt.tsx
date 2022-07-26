import { useEffect, useState } from 'react'
import { Cell } from './components/grid/Cell'
import { ClueModal } from './components/modals/ClueModal'

const solution = 'GÖRUIRTSMNSM'.split('')
const clues = ['Nära ett av tomtens fyra, bra att klättra i.']
const passwords = [
  'gkgsmfdhch',
  'zavlyannyj',
  'mhuudxaocc',
  'vrtpxzrnne',
  'rwrlfodnvx',
  'zmxpkwpbva',
  'ciergwlbpz',
  'esktqwmvjc',
  'giyadombwa',
  'tybemqpywa',
  'suehotnmhx',
  'flsaejkgle',
]

function WordHunt() {
  const [letters, setLetters] = useState(
    JSON.parse(localStorage.getItem('letters') || '[]')
  )
  const [help, setHelp] = useState('')

  const query = window.location.search.substring(1)

  useEffect(() => {
    localStorage.setItem('letters', JSON.stringify(letters))
  }, [letters])

  useEffect(() => {
    const pos = passwords.indexOf(query)
    if (pos >= 0 && !letters[pos]) {
      const newLetters = [...letters]
      newLetters[pos] = solution[pos]
      setLetters(newLetters)
    }
  }, [letters, query])

  return (
    <div className="absolute inset-0 flex flex-col justify-center items-center p-4">
      <h1 className="m-4 text-4xl text-center">Ordjakt</h1>
      <p>
        Lås upp bokstäverna nedan genom att läsa av QR-koderna som finns gömd på
        tomten.
      </p>
      <p>
        Klicka på bokstaven för att få en ledtråd om var just den kan finnas.
      </p>
      <p>
        När du listat ut vilket ord som bokstäverna bildar så får du ett pris.
      </p>
      <div className="flex justify-center p-4 flex-wrap gap-2">
        {solution.map((_, i) => (
          <Cell
            key={i}
            value={letters[i] ? solution[i] : '?'}
            onClick={() => setHelp(clues[0])}
            status={letters[i] ? 'correct' : 'absent'}
          />
        ))}
      </div>
      <ClueModal
        isOpen={help !== ''}
        handleClose={() => setHelp('')}
        clue={help}
      />
    </div>
  )
}

export default WordHunt
