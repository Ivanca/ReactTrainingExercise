import CreateEvent from './CreateEvent';
import Login from './Login';
import EventsFeed from './EventsFeed';
import SignUp from './SignUp';
import { BrowserRouter, Redirect, Route } from 'react-router-dom'
import { Box } from '@chakra-ui/react';
import Header from './Header';
import { useAuthState } from '../context';

 
function Site () {
    const eventsRedirect = <Redirect to="/events" />;
    const userDetails = useAuthState();
    const loggedIn = !!userDetails?.token;
    console.log("loggedIn", loggedIn)
    return (
        <BrowserRouter>
            <Box maxW="xl" margin="auto">
                <Header />
                <Box>
                    <Route exact path="/">{eventsRedirect}</Route>
                    <Route path="/events" component={EventsFeed} />
                    <Route path="/login" render={() => 
                        loggedIn ? eventsRedirect : <Login />
                    } />
                    <Route path="/signup" render={() =>
                        loggedIn ? eventsRedirect : <SignUp />
                    } />
                    <Route path="/favorited" render={() =>
                        loggedIn ? <EventsFeed favoritesOnly={true} /> : eventsRedirect
                    } />
                    <Route path="/create-event" render={() => 
                        loggedIn ? <CreateEvent /> : eventsRedirect
                    } />
                </Box>
            </Box>
        </BrowserRouter>
    )
}

export default Site