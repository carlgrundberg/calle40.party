import { useEffect, useState } from 'react'
import { ImageCell } from './ImageCell'

type Props = {
  images: string[]
  solution: number[]
  onSuccess: () => void
}

export const ImageGrid = ({
  images,
  solution,
  onSuccess,
}: Props) => {
  const [currentGuess, setCurrentGuess] = useState([] as number[])

  useEffect(() => {
    if(currentGuess.length === solution.length && currentGuess.every(g => solution.includes(g))) {
      onSuccess();
    }
  }, [currentGuess, solution, onSuccess])

  return (
    <div className="grid grid-cols-3 gap-4">
      {images.map((img, i) => (
        <ImageCell
          key={i}
          image={img}
          isSelected={currentGuess.includes(i)}
          onClick={() => {
            if(currentGuess.includes(i)) {
              setCurrentGuess(currentGuess.filter(g => g !== i))
            } else {
              setCurrentGuess([...currentGuess, i])
            }
          }}
        />
      ))}
    </div>
  )
}
