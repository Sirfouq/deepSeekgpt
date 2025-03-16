import { ReactNode, useState } from "react";
import { createContext, useContext } from "react";

const ThemeContext = createContext<ThemeContextType>({ isDarkMode: false, toggleTheme: () => { } });

export interface ThemeContextType {
    isDarkMode: boolean;
    toggleTheme: () => void;
}

interface ThemeProviderProps {
    children: ReactNode;
}


export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
}


export const ThemeProvider = ({ children }: ThemeProviderProps) => {
    const [isDarkMode, setIsDarkMode] = useState(() => {
        try {
            const savedTheme = localStorage.getItem('isDarkMode');
            return savedTheme === 'true' ? true : false;
        } catch (error) {
            console.log('Error loading theme');
            return false;
        }

    });

    const toggleTheme = () => {
        setIsDarkMode(!isDarkMode);
        const savedTheme = !isDarkMode;
        try {
            localStorage.setItem('isDarkMode', JSON.stringify(savedTheme));
        } catch (error) {
            console.log('Error saving theme');
        }
        console.log('Theme changed');

    }
    return (
        <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}



