import { createContext, useState, useContext } from 'react';


interface Pokemon {
    name: string;
    id: number;
    types: string[];
}

type MyContextType = {
    value: Array<Pokemon> | undefined;
    setValue: (value: Array<Pokemon>) => void;
};

const MyContext = createContext<MyContextType | undefined>(undefined);

export const useMyContext = () => {
    const context = useContext(MyContext);
    if (context === undefined) {
        throw new Error('useMyContext must be used within a MyContextProvider');
    }
    return context;
};

export const MyContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [value, setValue] = useState<Array<Pokemon>>();

    return (
        <MyContext.Provider value={{ value, setValue }}>
            {children}
        </MyContext.Provider>
    );
};