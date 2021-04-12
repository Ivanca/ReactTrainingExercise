import { useQuery } from 'react-query'
import { BACKEND_URL } from "../constants";
import { jsonRequest } from '../utils';
import { Event, FavData, User } from '../types'
import React from 'react';
import { Field, Form, Formik } from 'formik';
import { FormControl, FormLabel, Input, FormErrorMessage, Box, HStack, Radio, RadioGroup, Stack, Button, Text } from '@chakra-ui/react';
import EventCard from './EventCard';
import { useAuthState } from '../context';

type EventsFeedProps = {
  favoritesOnly: boolean,
} & typeof defaultProps;

const defaultProps = {
  favoritesOnly: false,
};

const EventsFeed = ({ favoritesOnly }: EventsFeedProps) => {

  const [filters, setFilters] = React.useState({
    type: "",
    host: "",
    location: "",
    date: ""
  });

  const userDetails = useAuthState();

  const { isLoading, error, data } = useQuery(['eventsData', { filters }], async () => {
    let paramsObj: { [key: string]: string } = Object.assign({'_expand': 'user'}, filters);
    let parameters = ['expand=user'];
    if (favoritesOnly) {
      const url = `${BACKEND_URL}/favoriteEvents?userId=${userDetails?.user.id}`;
      const favs: FavData[] = await jsonRequest('GET', url);
      const onlyFavsQuery = favs.map((entry) => 'id=' + entry.eventId).join('&');
      return jsonRequest('GET', `${BACKEND_URL}/events?${onlyFavsQuery}&_expand=user`);
    }
    for (const [key, value] of Object.entries(paramsObj)) {
      if (value) {
        if (key === 'host') {
          const url = `${BACKEND_URL}/users?firstName_like=${encodeURIComponent(value)}`;
          const users = await jsonRequest('GET', url);
          if (!users.length) {
            return [];
          }
          const userIds = users.map((user: User) => `userId=${user.id}`);
          parameters = [...parameters, ...userIds];
        } else {
          parameters.push(`${key}=${encodeURIComponent(value)}`)
        }
      }
    }
    return jsonRequest('GET', `${BACKEND_URL}/events?${parameters.join('&')}`);
  });

  if (error) return (<div>'An error has occurred: ' + {(error as any).message}</div>);

  const addToFavorites = (eventId: number) => {
    jsonRequest('POST', `${BACKEND_URL}/favoriteEvents`, userDetails?.token, {
      "id": Date.now(),
      "userId": userDetails?.user.id,
      "eventId": eventId
    });
  }

  var events:JSX.Element[] = [];
  if (data) {
    events = data.map((event: Event) =>
      <EventCard
        key={event.id}
        event={event}
        addToFavorites={!favoritesOnly ? addToFavorites.bind(this, event.id) : undefined}
        loggedIn={!!userDetails?.token} />
    )
  }
  return (
    <Box>
      <Box className="filters">
        <Formik
          initialValues={{ date: '', type: '', host: '', location: '' }}
          onSubmit={(values, { setSubmitting }) => {
            setFilters(values);
            setSubmitting(false);
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <HStack spacing={7}>
                <Field type="text" name="type">
                  {({ field, form }: { field: any, form: any }) => (
                    <FormControl isInvalid={form.errors.type && form.touched.type}>
                      <RadioGroup >
                        <Stack direction="column">
                          <Radio {...field} value="public">Public</Radio>
                          <Radio {...field} value="private">Private</Radio>
                          <Radio {...field} value="">All</Radio>
                        </Stack>
                      </RadioGroup>
                      <FormErrorMessage>{form.errors.type}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                <Field type="text" name="date">
                  {({ field, form }: { field: any, form: any }) => (
                    <FormControl isInvalid={form.errors.date && form.touched.date}>
                      <FormLabel htmlFor="date">Date</FormLabel>
                      <Input {...field} id="date" placeholder="" />
                      <FormErrorMessage>{form.errors.date}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                <Field type="text" name="host">
                  {({ field, form }: { field: any, form: any }) => (
                    <FormControl isInvalid={form.errors.host && form.touched.host}>
                      <FormLabel htmlFor="host">Host name</FormLabel>
                      <Input {...field} id="host" placeholder="" />
                      <FormErrorMessage>{form.errors.host}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                <Field type="text" name="location">
                  {({ field, form }: { field: any, form: any }) => (
                    <FormControl isInvalid={form.errors.location && form.touched.location}>
                      <FormLabel htmlFor="location">Location</FormLabel>
                      <Input {...field} id="location" placeholder="" />
                      <FormErrorMessage>{form.errors.location}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
              </HStack>
              <Button variant="solid" type="submit" disabled={isSubmitting}>
                Search
           </Button>
            </Form>
          )}
        </Formik>
      </Box>
      {isLoading ? <Text>Is Loading</Text>: events}
    </Box>
  )
}

EventsFeed.defaultProps = defaultProps;

export default EventsFeed;