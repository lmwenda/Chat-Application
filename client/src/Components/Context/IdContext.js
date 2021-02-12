import React, { useState, createContext } from "react";

export const IdContext = createContext('');

export function IdProvider(props){
    const [id, setId] = useState('');
    return(
        <IdContext.Provider value={[id, setId]}>
            {props.children}
        </IdContext.Provider>
    );
}