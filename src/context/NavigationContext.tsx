import React, { createContext } from 'react';

export const NavigationContext = createContext(null);
export const NavigationProvider = ({children}) => {
    const navigationRef = React.createRef();

    return (
        <NavigationContext.Provider value={{navigationRef}}>
            {children}
        </NavigationContext.Provider>
    );
}