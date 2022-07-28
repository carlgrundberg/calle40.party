import { useEffect, useState } from 'react'
import { Cell } from './components/grid/Cell'
import { ClueModal } from './components/modals/ClueModal'
import { REVEAL_TIME_MS } from './constants/settings'

const solution = 'GÖRUIRTSMNSM'.split('')
const clues = [
  'Nära ett av tomtens fyra, bra att klättra i.', // Klätterträdet
  'Snurrar så huset blir varmt.', // Luftvärmepump
  'Skyddar bilen från regn och rusk.', // Carport
  'Töms varannan vecka.', // Soptunnor
  'Ger billig värme på vintern.', // Vedboden
  'God som soppa men rör dom ej!', // Högen med brännnässlor
  'Förvarar kanske krukor eller vinterdäck?', // Soprummet
  'Skön plats en varm sommardag.', // Hängmattan
  'Fylls numera bara varannan vardag.', // Postlådan
  'Kan va bra att ha om det börjar regna.', // Partytält
  'Fylls snabbt vid en regnskur.', // Vattentunna
  'Kan det vara ett ovanligt stort blåbär?', // Blå boll
]

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
  const [isRevealing, setIsRevealing] = useState(-1)

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
      setIsRevealing(pos)
      setTimeout(() => {
        setIsRevealing(-1)
      }, REVEAL_TIME_MS)
    }
  }, [letters, query])

  console.log(isRevealing)

  return (
    <div className="absolute inset-0 flex flex-col justify-center items-center p-4">
      <h1 className="m-4 text-4xl text-center">Ordjakt</h1>
      <p>
        Lås upp bokstäverna nedan genom att läsa av QR-koderna som finns gömda
        på tomten.
      </p>
      <p>
        Klicka på en siffra för att få en ledtråd om var just den bokstaven kan
        finnas.
      </p>
      <p>
        När du listat ut vilket ord som bokstäverna bildar och kan visa att du
        låst upp alla bokstäver så får du ett pris.
      </p>
      <div className="flex justify-center p-4 flex-wrap gap-2">
        {solution.map((_, i) => (
          <Cell
            key={i}
            value={letters[i] ? solution[i] : (i + 1).toString()}
            onClick={() => setHelp(clues[i])}
            status={letters[i] ? 'correct' : 'absent'}
            isRevealing={isRevealing === i}
            isCompleted={letters[i]}
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
