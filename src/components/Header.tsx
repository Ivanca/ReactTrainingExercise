
import React from "react";
import { Link, Box, Flex, Text, Button, Stack } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import useToken from "../useToken";

type HeaderProps = {
  token: string
} & typeof defaultProps;

const defaultProps = {
  token: ""
}

const Header = ({token, ...props}: HeaderProps) => {

  return (
    <NavBarContainer {...props}>
        <Flex flex={{ base: 1 }} justify={{ base: 'center', md: 'start' }}>
            <Link as={RouterLink} to="/">
              <Text fontSize="lg" fontWeight="bold">
                EventBright
              </Text>
            </Link>
            <Flex display={{ base: 'none', md: 'flex' }} ml={10}>
              <Link as={RouterLink} to="/events" mr={3}><Button>Events</Button></Link>
              {token && <Link as={RouterLink} to="/favorited" mr={3}><Button>Favorite Events</Button></Link>}
              {token && <Link as={RouterLink} to="/create-event" mr={3}><Button>Create Event</Button></Link>}
              {!token && <Link as={RouterLink} to="/signup" mr={3}><Button>Sign Up</Button></Link>}
              {!token && <Link as={RouterLink} to="/login" mr={3}><Button>Login</Button></Link>}
            </Flex>
        </Flex>
    </NavBarContainer>
  );
};

Header.defaultProps = defaultProps;

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
