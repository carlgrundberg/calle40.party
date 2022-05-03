import { useState, useEffect } from 'react'
import { Grid } from './components/grid/Grid'
import { Keyboard } from './components/keyboard/Keyboard'
import { InfoModal } from './components/modals/InfoModal'
// import { StatsModal } from './components/modals/StatsModal'
// import { SettingsModal } from './components/modals/SettingsModal'
import {
  // WIN_MESSAGES,
  // GAME_COPIED_MESSAGE,
  NOT_ENOUGH_LETTERS_MESSAGE,
  // WORD_NOT_FOUND_MESSAGE,
  // CORRECT_WORD_MESSAGE,
} from './constants/strings'
import {
  // MAX_WORD_LENGTH,
  MAX_CHALLENGES,
  REVEAL_TIME_MS,
  // GAME_LOST_INFO_DELAY,
  // WELCOME_INFO_MODAL_MS,
} from './constants/settings'
import {
  // isWordInWordList,
  // isWinningWord,
  // solution,
  // findFirstUnusedReveal,
  unicodeLength,
} from './lib/words'
// import { addStatsForCompletedGame, loadStats } from './lib/stats'
import // loadGameStateFromLocalStorage,
// saveGameStateToLocalStorage,
'./lib/localStorage'
import { default as GraphemeSplitter } from 'grapheme-splitter'

import { AlertContainer } from './components/alerts/AlertContainer'
import { useAlert } from './context/AlertContext'
import { InformationCircleIcon } from '@heroicons/react/outline'
// import { getGuessStatuses } from './lib/statuses'

type Props = {
  solution: string
  onSuccess: () => void
}

function Wordle({ solution, onSuccess }: Props) {
  const { showError: showErrorAlert } = useAlert()
  const [currentGuess, setCurrentGuess] = useState('')
  const [isGameWon, setIsGameWon] = useState(false)
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false)
  // const [isStatsModalOpen, setIsStatsModalOpen] = useState(false)
  // const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false)
  const [currentRowClass, setCurrentRowClass] = useState('')
  const [isGameLost, setIsGameLost] = useState(false)
  const [isRevealing, setIsRevealing] = useState(false)
  const [guesses, setGuesses] = useState<string[]>([])
  // const [guesses, setGuesses] = useState<string[]>(() => {
  //   const loaded = loadGameStateFromLocalStorage()
  //   if (loaded?.solution !== solution) {
  //     return []
  //   }
  //   const gameWasWon = loaded.guesses.includes(solution)
  //   if (gameWasWon) {
  //     setIsGameWon(true)
  //   }
  //   if (loaded.guesses.length === MAX_CHALLENGES && !gameWasWon) {
  //     setIsGameLost(true)
  //     // showErrorAlert(CORRECT_WORD_MESSAGE(solution), {
  //     //   persist: true,
  //     // })
  //   }
  //   return loaded.guesses
  // })

  // const [stats, setStats] = useState(() => loadStats())

  // const [isHardMode, setIsHardMode] = useState(
  //   localStorage.getItem('gameMode')
  //     ? localStorage.getItem('gameMode') === 'hard'
  //     : false
  // )

  // useEffect(() => {
  //   // if no game state on load,
  //   // show the user the how-to info modal
  //   if (!loadGameStateFromLocalStorage()) {
  //     setTimeout(() => {
  //       setIsInfoModalOpen(true)
  //     }, WELCOME_INFO_MODAL_MS)
  //   }
  // }, [])

  // useEffect(() => {
  //   if (isDarkMode) {
  //     document.documentElement.classList.add('dark')
  //   } else {
  //     document.documentElement.classList.remove('dark')
  //   }
  // }, [isDarkMode, isHighContrastMode])

  // const handleDarkMode = (isDark: boolean) => {
  //   setIsDarkMode(isDark)
  //   localStorage.setItem('theme', isDark ? 'dark' : 'light')
  // }

  // const handleHardMode = (isHard: boolean) => {
  //   if (guesses.length === 0 || localStorage.getItem('gameMode') === 'hard') {
  //     setIsHardMode(isHard)
  //     localStorage.setItem('gameMode', isHard ? 'hard' : 'normal')
  //   } else {
  //     showErrorAlert(HARD_MODE_ALERT_MESSAGE)
  //   }
  // }

  // const handleHighContrastMode = (isHighContrast: boolean) => {
  //   setIsHighContrastMode(isHighContrast)
  //   setStoredIsHighContrastMode(isHighContrast)
  // }

  const clearCurrentRowClass = () => {
    setCurrentRowClass('')
  }

  const reset = () => {
    setIsGameLost(false)
    setIsGameWon(false)
    setGuesses([])
    setCurrentGuess('')
  }

  useEffect(reset, [solution])
  // useEffect(() => {
  //   saveGameStateToLocalStorage({ guesses, solution })
  // }, [guesses, solution])

  // useEffect(() => {
  //   if (isGameWon) {
  //     const winMessage =
  //       WIN_MESSAGES[Math.floor(Math.random() * WIN_MESSAGES.length)]
  //     const delayMs = REVEAL_TIME_MS * solution.length

  //     showSuccessAlert(winMessage, {
  //       delayMs,
  //       // onClose: () => setIsStatsModalOpen(true),
  //     })
  //   }

  //   // if (isGameLost) {
  //   //   setTimeout(() => {
  //   //     setIsStatsModalOpen(true)
  //   //   }, GAME_LOST_INFO_DELAY)
  //   // }
  // }, [isGameWon, isGameLost, showSuccessAlert])

  const onChar = (value: string) => {
    if (
      unicodeLength(`${currentGuess}${value}`) <= solution.length &&
      guesses.length < MAX_CHALLENGES &&
      !isGameWon
    ) {
      setCurrentGuess(`${currentGuess}${value}`)
    }
  }

  const onDelete = () => {
    setCurrentGuess(
      new GraphemeSplitter().splitGraphemes(currentGuess).slice(0, -1).join('')
    )
  }

  const onEnter = () => {
    if (isGameWon || isGameLost) {
      return
    }

    if (!(unicodeLength(currentGuess) === solution.length)) {
      setCurrentRowClass('jiggle')
      return showErrorAlert(NOT_ENOUGH_LETTERS_MESSAGE, {
        onClose: clearCurrentRowClass,
      })
    }

    // if (!isWordInWordList(currentGuess)) {
    //   setCurrentRowClass('jiggle')
    //   return showErrorAlert(WORD_NOT_FOUND_MESSAGE, {
    //     onClose: clearCurrentRowClass,
    //   })
    // }

    // enforce hard mode - all guesses must contain all previously revealed letters
    // if (isHardMode) {
    //   const firstMissingReveal = findFirstUnusedReveal(currentGuess, guesses)
    //   if (firstMissingReveal) {
    //     setCurrentRowClass('jiggle')
    //     return showErrorAlert(firstMissingReveal, {
    //       onClose: clearCurrentRowClass,
    //     })
    //   }
    // }

    setIsRevealing(true)
    // turn this back off after all
    // chars have been revealed
    setTimeout(() => {
      setIsRevealing(false)
    }, REVEAL_TIME_MS * solution.length)

    const winningWord = currentGuess === solution

    if (
      unicodeLength(currentGuess) === solution.length &&
      guesses.length < MAX_CHALLENGES &&
      !isGameWon
    ) {
      setGuesses([...guesses, currentGuess])
      setCurrentGuess('')

      if (winningWord) {
        // setStats(addStatsForCompletedGame(stats, guesses.length))
        setTimeout(() => {
          setIsGameWon(true)
        }, REVEAL_TIME_MS * solution.length)
        return
      }

      if (guesses.length === MAX_CHALLENGES - 1) {
        // setStats(addStatsForCompletedGame(stats, guesses.length + 1))
        setTimeout(() => {
          setIsGameLost(true)
        }, REVEAL_TIME_MS * solution.length)

        // showErrorAlert(CORRECT_WORD_MESSAGE(solution), {
        //   persist: true,
        //   delayMs: REVEAL_TIME_MS * solution.length + 1,
        // })
      }
    }
  }

  return (
    <>
      <div className="pt-2 md:max-w-7xl w-full mx-auto sm:px-6 lg:px-8 flex flex-col grow">
        <div className="pb-6 grow flex flex-col">
          <Grid
            guesses={guesses}
            currentGuess={currentGuess}
            isRevealing={isRevealing}
            currentRowClassName={currentRowClass}
            solution={solution}
          />
          <InformationCircleIcon
            className="h-6 w-6 cursor-pointer dark:stroke-white absolute top-4 right-4"
            onClick={() => setIsInfoModalOpen(true)}
          />
        </div>
        {!isGameLost && !isGameWon && (
          <Keyboard
            onChar={onChar}
            onDelete={onDelete}
            onEnter={onEnter}
            guesses={guesses}
            isRevealing={isRevealing}
            solution={solution}
          />
        )}
        {isGameWon && (
          <div className="mx-auto max-w-sm text-center">
            <p>Grattis du klarade det!</p>
            <button
              className="mt-4 py-2 px-4 bg-indigo-600 rounded"
              onClick={onSuccess}
            >
              Gå vidare
            </button>
          </div>
        )}
        {isGameLost && (
          <div className="mx-auto max-w-sm text-center">
            <p>Tyvärr klarade du inte utmaningen.</p>
            <button
              className="mt-4 py-2 px-4 bg-indigo-600 rounded"
              onClick={reset}
            >
              Prova igen
            </button>
          </div>
        )}
        <InfoModal
          isOpen={isInfoModalOpen}
          handleClose={() => setIsInfoModalOpen(false)}
        />
        {/* <StatsModal
          isOpen={isStatsModalOpen}
          handleClose={() => setIsStatsModalOpen(false)}
          guesses={guesses}
          gameStats={stats}
          isGameLost={isGameLost}
          isGameWon={isGameWon}
          handleShareToClipboard={() => showSuccessAlert(GAME_COPIED_MESSAGE)}
          isHardMode={isHardMode}
          isDarkMode={isDarkMode}
          isHighContrastMode={isHighContrastMode}
          numberOfGuessesMade={guesses.length}
        /> */}
        {/* <SettingsModal
            isOpen={isSettingsModalOpen}
            handleClose={() => setIsSettingsModalOpen(false)}
            isHardMode={isHardMode}
            handleHardMode={handleHardMode}
            isDarkMode={isDarkMode}
            handleDarkMode={handleDarkMode}
            isHighContrastMode={isHighContrastMode}
            handleHighContrastMode={handleHighContrastMode}
          /> */}
        <AlertContainer />
      </div>
    </>
  )
}

export default Wordle
