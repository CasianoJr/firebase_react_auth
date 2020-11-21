import React from 'react'
import { Redirect, Route } from 'react-router-dom';
import { useAuth } from '../authentication/AuthProvider';


export function RoutesLoginRequired({ component: Component, ...rest}) {
    const { currentUser } = useAuth()
    return (
        <Route {...rest} render={ props => 
            currentUser ? <Component {...props}/> : <Redirect exact to="/login" /> 
        }
         />
    )
}
export function RoutesIsLoginAlready({ component: Component, ...rest}) {
    const { currentUser } = useAuth()
    return (
        <Route {...rest} render={ props => 
            {return(<>
                {currentUser.email ? <Component {...props}/> : <Redirect exact to="/" /> }
            </>)} 
        }
         />
    )
}
