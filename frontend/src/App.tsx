import { useEffect, useState } from 'react';
import './App.css';
import Search from './Search';
import { useTheme } from './ThemeContext';
import Comment from './class/Comment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';
function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<Comment[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const { isDarkMode } = useTheme();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      await fetch("https://jsonplaceholder.typicode.com/comments")
        .then(response => response.json())
        .then(actual_json => {
          setData(actual_json);
          setTimeout(() => setIsLoading(false), 1000);
        })
        .catch(onrejected => console.log('Error fetching data :', onrejected));
    };
    fetchData();
  }, []);

  // useEffect(() => {
  //   const rootElement = document.getElementById('root');
  //   if (rootElement) {
  //     rootElement.className = isDarkMode ? 'dark-mode' : 'light-mode';
  //   }
  // }, [isDarkMode]);

  const filteredItems = data.filter(item => item.body.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className={isDarkMode ? 'dark-mode' : 'light-mode'}>
      <ToggleThemeButton />
      <div className="app-container">
        <Search onSearch={setSearchTerm} />
        <div className='list-container'>
          {isLoading ? (
            <div className='loader'></div>
          ) : (
            filteredItems.map((item, index) =>
              <p className='list-item' key={index}>
                {item.body}
              </p>
            )
          )}
        </div>
      </div>
    </div>
  );
}

const ToggleThemeButton = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const className = 'toggle-button-' + (isDarkMode ? 'dark' : 'light');

  return (
    <button className={className} onClick={toggleTheme}>
      <FontAwesomeIcon icon={isDarkMode ? faSun : faMoon} />
    </button>
  );
};

export default App;