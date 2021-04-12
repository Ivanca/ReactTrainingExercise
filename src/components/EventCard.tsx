
import { Box, Button, Heading } from '@chakra-ui/react';
import { Event } from '../types';


type EventCardProps = {
    event: Event,
    loggedIn: boolean,
    addToFavorites?: () => void
}

const EventCard = ({event, loggedIn, addToFavorites}: EventCardProps) => {
    return (
        <Box 
            className="event"
            bg="#ffffff"
            rounded="lg"
            border="1px solid lightgrey"
            p={7}
            mx="auto"
            mt={5}
            >
            <Heading as="h3" size="lg">{event.name}</Heading>
            <p className="location">Location: {event.location}</p>
            <p className="description">{event.description}</p>
            <p className="host">Host: {event.user.firstName} {event.user.lastName}</p>
            <p className="tags">{event.tags}</p>
            {loggedIn && addToFavorites && <Button onClick={addToFavorites}>Favorite</Button>}
        </Box>
    )
}

export default EventCard;
