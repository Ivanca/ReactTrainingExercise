import { Formik, Form, Field, ErrorMessage } from "formik"
import ImageInput from './ImageInput'
import { jsonRequest } from "../utils";
import { BACKEND_URL } from "../constants";
import { FormControl, FormLabel, Input, FormErrorMessage, Button } from "@chakra-ui/react";
import { DatePickerField } from "./DatePicker";
import { useHistory } from "react-router-dom";
import { useAuthDispatch, loginUser } from "../context";
import { Box, Heading } from '@chakra-ui/react';
import { SignupSchema } from '../schemas'


const SignUp = () => {

  const history = useHistory();
  const dispatch = useAuthDispatch() //get the dispatch method from the useDispatch custom hook

  const login = async (credentials: { email: string, password: string }) => {
    return await loginUser(dispatch, credentials);
  }

  return (
    <Box>
      <Heading as="h3">Register!</Heading>
      <Formik
        initialValues={({ email: '', password: '', avatar: '' } as any)}
        validationSchema={SignupSchema}
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(true);
          delete values.confirmPassword;
          jsonRequest('POST', `${BACKEND_URL}/users`, '', values).then(data => {
            return login({email: values.email, password: values.password})
          }).then(e => {
            setSubmitting(false);
            history.push("/");
          });
        }}
      >
        {({ isSubmitting, setFieldValue, touched, errors, handleBlur }) => (
          <Form>
            <Field type="text" name="email">
            {({ field, form }: {field:any, form:any}) => (
              <FormControl isInvalid={form.errors.email && form.touched.email}>
                <FormLabel htmlFor="email">Email</FormLabel>
                <Input {...field} id="email" placeholder="" />
                <FormErrorMessage>{form.errors.email}</FormErrorMessage>
              </FormControl>
            )}
            </Field>
            <Field type="text" name="firstName">
            {({ field, form }: {field:any, form:any}) => (
              <FormControl isInvalid={form.errors.firstName && form.touched.firstName}>
                <FormLabel htmlFor="firstName">First Name</FormLabel>
                <Input {...field} id="firstName" placeholder="" />
                <FormErrorMessage>{form.errors.firstName}</FormErrorMessage>
              </FormControl>
            )}
            </Field>
            <Field type="text" name="lastName">
            {({ field, form }: {field:any, form:any}) => (
              <FormControl isInvalid={form.errors.lastName && form.touched.lastName}>
                <FormLabel htmlFor="lastName">Last Name</FormLabel>
                <Input {...field} id="lastName" placeholder="" />
                <FormErrorMessage>{form.errors.email}</FormErrorMessage>
              </FormControl>
            )}
            </Field>
            <FormControl>
              <FormLabel htmlFor="avatar">Avatar:</FormLabel>
              <Field name="avatar" component={ImageInput} />
              <ErrorMessage name="avatar" component="div" />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="birthday">Date</FormLabel>
              <DatePickerField name="birthday" />
            </FormControl>
            <Field type="password" name="password">
            {({ field, form }: {field:any, form:any}) => (
              <FormControl isInvalid={form.errors.password && form.touched.password}>
                <FormLabel htmlFor="password">Password</FormLabel>
                <Input type="password" {...field} id="password" placeholder="" />
                <FormErrorMessage>{form.errors.password}</FormErrorMessage>
              </FormControl>
            )}
            </Field>
            <Field type="password" name="confirmPassword">
            {({ field, form }: {field:any, form:any}) => (
              <FormControl isInvalid={form.errors.confirmPassword && form.touched.confirmPassword}>
                <FormLabel htmlFor="confirmPassword">Confirm Password</FormLabel>
                <Input type="password" {...field} id="confirmPassword" placeholder="" />
                <FormErrorMessage>{form.errors.confirmPassword}</FormErrorMessage>
              </FormControl>
            )}
            </Field>
            <Button variant="solid" type="submit" disabled={isSubmitting}>
              Submit
            </Button>
          </Form>
        )}
      </Formik>
    </Box>
  )
}

export default SignUp;
