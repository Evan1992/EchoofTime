import { useContext } from 'react';

import AuthContext from '../../store/auth-context'
import classes from './StartingPageContent.module.css';

const StartingPageContent =  () => {
    const authCtx = useContext(AuthContext);
    const isLoggedIn = authCtx.isLoggedIn;
    
    return(
        <section className={classes.starting}>
            <h1> Login to Start </h1>
        </section>
    )
}

export default StartingPageContent