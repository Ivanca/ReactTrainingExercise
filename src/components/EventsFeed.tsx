import { useQuery } from 'react-query'
import { BACKEND_URL } from "../constants";
import { jsonRequest } from '../utils';
import { Event, FavData } from '../types'
import React from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import useToken from '../useToken';
import { FormControl, FormLabel, Input, FormErrorMessage, Heading, Box, HStack, Radio, RadioGroup, Stack, Button } from '@chakra-ui/react';
import EventCard from './EventCard';

type EventsFeedProps = {
  favoritesOnly: boolean,
  userId: number,
  token: string
} & typeof defaultProps;

const defaultProps = {
  favoritesOnly: false,
  userId: -1
};

const EventsFeed = ({token, userId, favoritesOnly}: EventsFeedProps) => {

  const [filters, setFilters] = React.useState({
    type: "",
    host: "",
    location: "",
    date: ""
  });

  const { isLoading, error, data } = useQuery(['eventsData', {filters}], () => {
    var paramsObj: {[key: string] : string} = Object.assign({}, filters);
    for (const [key, value] of Object.entries(paramsObj)) {
      if (!value) {
        delete paramsObj[key];
      }
    }
    if (favoritesOnly) {
      return (async () => {
        const favs: FavData[] = await jsonRequest('GET', `${BACKEND_URL}/favoriteEvents?userId=${userId}`);
        const onlyFavsQuery = favs.map((entry) => 'id=' + entry.eventId).join('&');
        return jsonRequest('GET', `${BACKEND_URL}/events?${onlyFavsQuery}`);
      })()
    }
    return jsonRequest('GET', `${BACKEND_URL}/events?${new URLSearchParams(paramsObj)}`);
  })

  if (isLoading) return (<div>'Loading...'</div>);
 
  if (error) return (<div>'An error has occurred: ' + (error as any).message</div>);

  const addToFavorites = (eventId: number) => {
    jsonRequest('POST', `${BACKEND_URL}/favoriteEvents`, token, {
      "id": Date.now(),
      "userId": userId,
      "eventId": eventId
    });
  }
    
  var html = (data || []).map((event: Event) => 
    <EventCard event={event} addToFavorites={addToFavorites.bind(this, event.id)} loggedIn={!!token} />
  )

  return (
    <div>
      <div className="filters">
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
           {({ field, form }: {field:any, form:any}) => (
                

              <FormControl isInvalid={form.errors.type && form.touched.type}>
                  <RadioGroup >
                  <Stack direction="column">
                    <Radio {...field} value="public">Public</Radio>
                    <Radio {...field} value="private">Private</Radio>
                  </Stack>
                </RadioGroup>
                <FormErrorMessage>{form.errors.type}</FormErrorMessage>
              </FormControl>
            )}
            </Field>
            
           <Field type="text" name="date">
           {({ field, form }: {field:any, form:any}) => (
              <FormControl isInvalid={form.errors.date && form.touched.date}>
                <FormLabel htmlFor="date">Date</FormLabel>
                <Input {...field} id="date" placeholder="date" />
                <FormErrorMessage>{form.errors.date}</FormErrorMessage>
              </FormControl>
            )}
            </Field>
           <Field type="text" name="host">
           {({ field, form }: {field:any, form:any}) => (
              <FormControl isInvalid={form.errors.host && form.touched.host}>
                <FormLabel htmlFor="host">Host</FormLabel>
                <Input {...field} id="host" placeholder="host" />
                <FormErrorMessage>{form.errors.host}</FormErrorMessage>
              </FormControl>
            )}
            </Field>
           <Field type="text" name="location">
           {({ field, form }: {field:any, form:any}) => (
              <FormControl isInvalid={form.errors.location && form.touched.location}>
                <FormLabel htmlFor="location">Location</FormLabel>
                <Input {...field} id="location" placeholder="location" />
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
      </div>
      {html}
    </div>
  )
}

EventsFeed.defaultProps = defaultProps;

export default EventsFeed;