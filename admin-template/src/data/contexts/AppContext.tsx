import { createContext, useEffect, useState } from "react";

type Theme = 'dark' | '';

interface AppContextProps {
    theme: string;
    changeTheme: () => void;
}

export const AppContext = createContext<AppContextProps>({} as AppContextProps);

export function AppContextProvider({children}) {
    const [theme, setTheme] = useState<Theme>('');

    function changeTheme() {
        setTheme(theme === 'dark' ? '' : 'dark');
        localStorage.setItem('theme', theme === 'dark' ? '' : 'dark')
    }

    useEffect(() => {
        if (localStorage.getItem('theme')){
            const localTheme = localStorage.getItem('theme');
            if(localTheme === 'dark' || localTheme ===''){
                setTheme(localTheme)
            }
        }
    },[])

    return (
        <AppContext.Provider value={{
            theme,
            changeTheme,
        }}>
            {children}
        </AppContext.Provider>
    )
}