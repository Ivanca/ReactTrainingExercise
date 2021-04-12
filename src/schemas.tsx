
import * as Yup from "yup";

const MAX_FILE_SIZE = 160 * 1024;
const SUPPORTED_AVATAR_FILE_FORMATS = ["image/jpg", "image/jpeg", "image/gif", "image/png"];

export const SignupSchema = Yup.object().shape({
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
  
export const CreateEventSchema = Yup.object().shape({
    date: Yup.date().required('Required'),
    description: Yup.string().required('Required'),
    userId: Yup.number().required('Required'),
    tags: Yup.string(),
    type: Yup.string().required('Required'),
    location: Yup.string().required('Required'),
    name: Yup.string().required('Required')
});  

export const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string()
    .min(8, 'Too Short!')
    .required('Required')
});
