import useToken from '../useToken';
import CreateEvent from './CreateEvent';
import Login from './Login';
import EventsFeed from './EventsFeed';
import React from 'react';
import SignUp from './SignUp';
import logo from './logo.svg';
import { BrowserRouter, Redirect, Route } from 'react-router-dom'
import { Box } from '@chakra-ui/react';
import Header from './Header';

 
function Site () {
    const { token, setToken, userId } = useToken();
    const eventsRedirect = <Redirect to="/events" />;

    return (
        <BrowserRouter>
            <Box maxW="xl" margin="auto">
                <Header token={token} />
                <Box>
                    <Route exact path="/">{eventsRedirect}</Route>
                    <Route path="/events" render={() =>
                        <EventsFeed userId={userId} token={token} /> 
                    } />
                    <Route path="/login" render={() => 
                        token ? eventsRedirect : <Login setToken={setToken} />
                    } />
                    <Route path="/signup" render={() =>
                        token ? eventsRedirect : <SignUp setToken={setToken} />
                    } />
                    <Route path="/favorited" render={() =>
                        token ? <EventsFeed favoritesOnly={true} userId={userId} token={token}/> : eventsRedirect
                    } />
                    <Route path="/create-event" render={() => 
                        token ? <CreateEvent  userId={userId} token={token} /> : eventsRedirect
                    } />
                </Box>
            </Box>
        </BrowserRouter>
    )
}

export default Site