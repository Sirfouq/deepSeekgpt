import {  ReactNode, useState } from "react";
import { createContext,useContext } from "react";

const ThemeContext = createContext<ThemeContextType>({isDarkMode:false,toggleTheme:()=>{}});

export interface ThemeContextType {
    isDarkMode:boolean;
    toggleTheme:()=>void;
}

interface ThemeProviderProps{
    children:ReactNode;
}


export const useTheme =()=>{
    const context = useContext(ThemeContext);
    if(!context){
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
}


export const ThemeProvider =({children}:ThemeProviderProps)=>{
    const [isDarkMode,setIsDarkMode] = useState(false);
    const toggleTheme =()=>{
        setIsDarkMode(!isDarkMode);
        console.log('Theme changed');

    }
    return(
        <ThemeContext.Provider value ={{isDarkMode,toggleTheme}}>
            {children}
        </ThemeContext.Provider>
    )
}



