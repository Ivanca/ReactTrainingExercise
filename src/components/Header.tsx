
import React from "react";
import { Link, Box, Flex, Text, Button, Stack } from "@chakra-ui/react";
import { Link as RouterLink, useHistory } from "react-router-dom";
import { logout, useAuthDispatch, useAuthState } from "../context";

const Header = () => {

  const dispatch = useAuthDispatch();
  const history = useHistory();
  const userDetails = useAuthState();
  const loggedIn = !!userDetails?.token;
  
  const handleLogout = () => {  
    logout(dispatch) //call the logout action
    history.push('/login') //navigate to logout page on logout
  }

  return (
    <NavBarContainer>
        <Flex flex={{ base: 1 }} justify={{ base: 'center', md: 'start' }}>
            <Link as={RouterLink} to="/">
              <Text fontSize="lg" fontWeight="bold">
                EventBright
              </Text>
            </Link>
            <Flex display={{ base: 'none', md: 'flex' }} ml={3}>
              <Link as={RouterLink} to="/events" mr={3}><Button>Events</Button></Link>
              {loggedIn && <Link as={RouterLink} to="/favorited" mr={3}><Button>Favorite Events</Button></Link>}
              {loggedIn && <Link as={RouterLink} to="/create-event" mr={3}><Button>Create Event</Button></Link>}
              {loggedIn && <Link mr={3} onClick={handleLogout}><Button>Log out</Button></Link>}
              {!loggedIn && <Link as={RouterLink} to="/signup" mr={3}><Button>Sign Up</Button></Link>}
              {!loggedIn && <Link as={RouterLink} to="/login" mr={3}><Button>Login</Button></Link>}
            </Flex>
        </Flex>
    </NavBarContainer>
  );
}

const NavBarContainer = ({ children, ...props }: {children: any}) => {
    return (
      <Flex
        as="nav"
        align="center"
        justify="space-between"
        wrap="wrap"
        w="100%"
        py={8}
        {...props}
      >
        {children}
      </Flex>
    );
};

export default Header;
