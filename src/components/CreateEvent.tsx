// Render Prop
import { Formik, Form, Field } from 'formik';
import { jsonRequest } from '../utils';
import { BACKEND_URL } from '../constants';
import { FormControl, FormLabel, Input, FormErrorMessage, Button, Heading, Select } from '@chakra-ui/react';
import { DatePickerField } from './DatePicker';
import { useAuthState } from '../context';
import { CreateEventSchema } from '../schemas'

export const CreateEvent = () => {

    const userDetails = useAuthState();
    return (
        <div>
            <Heading>Create a new event</Heading>
            <br />
            <Formik
                initialValues={{
                    date: '',
                    description: '',
                    userId: userDetails?.user.id,
                    tags: '',
                    type: '',
                    location: '',
                    name: ''
                }}
                validationSchema={CreateEventSchema}
                onSubmit={(values, { setSubmitting }) => {
                    setSubmitting(true);
                    jsonRequest('POST', `${BACKEND_URL}/events`, userDetails?.token, values).then(e => {
                        setSubmitting(false);
                    });
                }}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <FormControl>
                            <FormLabel htmlFor="published-date">Date</FormLabel>
                            <DatePickerField name="date" />
                        </FormControl>
                        <Field type="text" name="description">
                        {({ field, form }: {field:any, form:any}) => (
                            <FormControl isInvalid={form.errors.description && form.touched.description}>
                            <FormLabel htmlFor="description">Description</FormLabel>
                            <Input {...field} id="description" placeholder="description" />
                            <FormErrorMessage>{form.errors.description}</FormErrorMessage>
                            </FormControl>
                        )}
                        </Field>
                        <Field type="hidden" className="fuck" name="userId" />
                        <Field type="text" name="tags">
                        {({ field, form }: {field:any, form:any}) => (
                            <FormControl isInvalid={form.errors.tags && form.touched.tags}>
                            <FormLabel htmlFor="tags">Tags</FormLabel>
                            <Input {...field} id="tags" placeholder="tags" />
                            <FormErrorMessage>{form.errors.date}</FormErrorMessage>
                            </FormControl>
                        )}
                        </Field>
                        <Field type="select" name="type">
                        {({ field, form }: {field:any, form:any}) => (
                            <FormControl isInvalid={form.errors.type && form.touched.type}>
                            <FormLabel htmlFor="type">Type</FormLabel>
                            <Select {...field} placeholder="Select option">
                                <option value="public">Public</option>
                                <option value="private">Private</option>
                            </Select>
                            <FormErrorMessage>{form.errors.date}</FormErrorMessage>
                            </FormControl>
                        )}
                        </Field>
                        <Field type="text" name="location">
                        {({ field, form }: {field:any, form:any}) => (
                            <FormControl isInvalid={form.errors.location && form.touched.location}>
                            <FormLabel htmlFor="location">Location</FormLabel>
                            <Input {...field} id="location" placeholder="location" />
                            <FormErrorMessage>{form.errors.date}</FormErrorMessage>
                            </FormControl>
                        )}
                        </Field>
                        <Field type="text" name="name">
                        {({ field, form }: {field:any, form:any}) => (
                            <FormControl isInvalid={form.errors.name && form.touched.name}>
                            <FormLabel htmlFor="name">Name</FormLabel>
                            <Input {...field} id="name" placeholder="name" />
                            <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                            </FormControl>
                        )}
                        </Field>
                        <Button variant="solid" mt={3} type="submit" disabled={isSubmitting}>
                            Submit
                        </Button>
                    </Form>
                )}
            </Formik>
        </div>
    );
}

export default CreateEvent;
