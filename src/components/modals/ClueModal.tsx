import { BaseModal } from './BaseModal'

type Props = {
  isOpen: boolean
  handleClose: () => void
  clue: string
}

export const ClueModal = ({ isOpen, handleClose, clue }: Props) => {
  return (
    <BaseModal title="Ledtråd" isOpen={isOpen} handleClose={handleClose}>
      <p className="text-sm text-gray-500 dark:text-gray-300">
        {clue}
      </p>
    </BaseModal>
  )
}
