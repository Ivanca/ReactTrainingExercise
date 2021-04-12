import { Form, Field } from "formik"
import { Formik } from "formik";
import { Link as RouterLink, useHistory } from "react-router-dom";
import { Link, Box, Heading, Button, FormControl, FormErrorMessage, FormLabel, Input } from "@chakra-ui/react";
import { loginUser, useAuthDispatch } from "../context";
import { LoginSchema } from '../schemas'


export default function Login() {

  const history = useHistory();
  const dispatch = useAuthDispatch() //get the dispatch method from the useDispatch custom hook

  const login = async (credentials: { email: string, password: string }) => {
    return await loginUser(dispatch, credentials);
  }

  return (
    <Box>
      <Heading as="h3">Register!</Heading>
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={LoginSchema}
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(true);
          login(values).then(() => {
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
      <Link as={RouterLink} to="/signup"><Button mt={3}>New user, sign up!</Button></Link>
    </Box>

  )
}
