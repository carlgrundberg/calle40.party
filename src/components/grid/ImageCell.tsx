import classnames from 'classnames'

type Props = {
  isSelected?: boolean
  image?: string
  onClick?: () => void
}

export const ImageCell = ({
  isSelected,
  image,
  onClick,
}: Props) => {
  let backgroundImage = ''

  if(image) {
    backgroundImage = `url(${image})`
  }

  const classes = classnames(
    'w-24 md:w-32 h-24 md:h-32 border-solid border-2 rounded bg-cover bg-center border-black dark:border-slate-100 cursor-pointer',
    {
      'opacity-30': isSelected,
    }
  )

  return (
    <div className={classes} style={{ backgroundImage }} onClick={onClick}>
    </div>
  )
}
