import './App.css'


interface SearchProps {
  onSearch: (msg: string) => void
}

const Search = ({ onSearch }: SearchProps) => {
  return (
    <input
      className='input-bar'
      type='text'
      onChange={(e) => onSearch(e.target.value)}
    >
    </input>
  )
}

export default Search