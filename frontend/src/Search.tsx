import './App.css'
import { useEffect, useRef } from 'react'

interface SearchProps {
  onSearch: (msg: string) => void
}

const Search = ({ onSearch }: SearchProps) => {

  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  return (
    <input
      ref={inputRef}
      className='input-bar'
      type='text'
      onChange={(e) => onSearch(e.target.value)}
    >
    </input>
  )
}

export default Search

