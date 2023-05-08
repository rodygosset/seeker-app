
import React from "react";

// Context API configuration

export interface SearchContext {
    query: string;
    artistName?: string;
    setQuery: (data: string) => void
    setArtistName: (data: string) => void
}

export const initContext: SearchContext = {
    query: '',
    setQuery: () => { },
    artistName: '',
    setArtistName: () => { }
}

export const Context = React.createContext(initContext)