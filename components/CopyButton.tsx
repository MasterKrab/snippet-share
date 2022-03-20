import { useState } from 'react'
import copyToClipboard from 'utils/copyToClipboard'
import resetButton from 'styles/resetButton'
import button from 'styles/button'
import sleep from 'utils/sleep'

interface CopyButtonProps {
  textToCopy: string
  label?: string
}

const CopyButton = ({ textToCopy, label = 'Copy' }: CopyButtonProps) => {
  const [copyText, setCopyText] = useState('')

  const handleClick = () => {
    copyToClipboard(textToCopy)
      .then(async () => {
        setCopyText('Copied!')
        await sleep(2000)
        setCopyText('')
      })
      .catch(() => setCopyText('Failed to copy!'))
  }

  return (
    <>
      <button onClick={handleClick}>{copyText || label}</button>
      <style jsx>{resetButton}</style>
      <style jsx>{button}</style>
    </>
  )
}

export default CopyButton
