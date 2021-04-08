import { Form, Field, ErrorMessage } from "formik"
import { Formik } from "formik";
import * as Yup from "yup";
import { Link, useHistory } from "react-router-dom";
import { BACKEND_URL } from '../constants'
import { jsonRequest } from '../utils'
import useToken from '../useToken';
import React from "react";
import { Button, FormControl, FormErrorMessage, FormLabel, Input } from "@chakra-ui/react";


const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string()
    .min(8, 'Too Short!')
    .required('Required')
});

type LoginProps = {
  setToken: (userToken: { [key: string]: string; }) => void
};

export default function Login({setToken}: LoginProps) {

  const history = useHistory();

  const handleSubmit = async (credentials: { email: string, password: string }) => {
    const token = await jsonRequest('POST', `${BACKEND_URL}/login`, '', credentials);
    setToken(token);
  }

  return (
    <div>
      <h1>Any place in your app!</h1>
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={LoginSchema}
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(true);
          handleSubmit(values).then(() => {
            setSubmitting(false);
            history.push("/");
          })
        }}
      >
        {({ isSubmitting }) => (
          <Form>


            <Field type="text" name="email">
            {({ field, form }: {field:any, form:any}) => (
              <FormControl isInvalid={form.errors.email && form.touched.email}>
                <FormLabel htmlFor="email">Email</FormLabel>
                <Input {...field} id="email" placeholder="email" />
                <FormErrorMessage>{form.errors.date}</FormErrorMessage>
              </FormControl>
            )}
            </Field>
            
            <Field type="text" name="password">
            {({ field, form }: {field:any, form:any}) => (
              <FormControl isInvalid={form.errors.password && form.touched.password}>
                <FormLabel htmlFor="password">password</FormLabel>
                <Input {...field} id="password" placeholder="password" />
                <FormErrorMessage>{form.errors.date}</FormErrorMessage>
              </FormControl>
            )}
            </Field>

            <Button mt={4} variant="solid" type="submit" disabled={isSubmitting}>
              Submit
            </Button>
          </Form>
        )}
      </Formik>
      <Link to="/signup">New user, sign up!</Link>
    </div>

  )
}
