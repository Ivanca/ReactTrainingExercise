import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup";
import ImageInput from './ImageInput'
import { jsonRequest } from "../utils";
import { BACKEND_URL } from "../constants";
import useToken from "../useToken";
import React from "react";
import { FormControl, FormLabel, Input, FormErrorMessage, Button } from "@chakra-ui/react";
import { DatePickerField } from "./DatePicker";

const MAX_FILE_SIZE = 160 * 1024;
const SUPPORTED_AVATAR_FILE_FORMATS = ["image/jpg", "image/jpeg", "image/gif", "image/png"];

const SignupSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  lastName: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string()
    .min(8, 'Too Short!')
    .matches(/[0-9]/, 'Password needs at least one number')
    .matches(
      /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/,
      'Password needs at least one special character, e.g. !@#$%^&*?+-<>{}[]()',
    )
    .required('Required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Password confirm is required'),
  birthday: Yup.date().required('Required'),
  avatar: Yup.mixed()
    .test('fileSize', "File Size is too large", (value) => {
      return value && value.size <= MAX_FILE_SIZE
    })
    .test('fileType', "Unsupported File Format", value => value && SUPPORTED_AVATAR_FILE_FORMATS.includes(value.type))
});

type SignUpProps = {
  setToken: (userToken: { [key: string]: string; }) => void
};

const SignUp = ({ setToken }: SignUpProps) => {

  return (
    <div>
      <h1>Register!</h1>
      <Formik
        initialValues={{ email: '', password: '', avatar: '' }}
        validationSchema={SignupSchema}
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(true);
          jsonRequest('POST', `${BACKEND_URL}/users`, '', values).then(data => {
            setToken(data.accessToken);
            setSubmitting(false);
          });
        }}
      >
        {({ isSubmitting, setFieldValue, touched, errors, handleBlur }) => (
          <Form>
            <Field type="text" name="email">
            {({ field, form }: {field:any, form:any}) => (
              <FormControl isInvalid={form.errors.email && form.touched.email}>
                <FormLabel htmlFor="email">Email</FormLabel>
                <Input {...field} id="email" placeholder="email" />
                <FormErrorMessage>{form.errors.email}</FormErrorMessage>
              </FormControl>
            )}
            </Field>
            <Field type="text" name="firstName">
            {({ field, form }: {field:any, form:any}) => (
              <FormControl isInvalid={form.errors.firstName && form.touched.firstName}>
                <FormLabel htmlFor="firstName">First Name</FormLabel>
                <Input {...field} id="firstName" placeholder="firstName" />
                <FormErrorMessage>{form.errors.firstName}</FormErrorMessage>
              </FormControl>
            )}
            </Field>
            <Field type="text" name="lastName">
            {({ field, form }: {field:any, form:any}) => (
              <FormControl isInvalid={form.errors.lastName && form.touched.lastName}>
                <FormLabel htmlFor="lastName">Last Name</FormLabel>
                <Input {...field} id="lastName" placeholder="lastName" />
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
                <FormLabel htmlFor="password">Oassword</FormLabel>
                <Input {...field} id="password" placeholder="password" />
                <FormErrorMessage>{form.errors.password}</FormErrorMessage>
              </FormControl>
            )}
            </Field>
            <Field type="password" name="confirmPassword">
            {({ field, form }: {field:any, form:any}) => (
              <FormControl isInvalid={form.errors.confirmPassword && form.touched.confirmPassword}>
                <FormLabel htmlFor="confirmPassword">Confirm Password</FormLabel>
                <Input {...field} id="confirmPassword" placeholder="confirmPassword" />
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
    </div>
  )
}

export default SignUp;
