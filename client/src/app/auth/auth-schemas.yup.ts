import * as yup from 'yup';

export const schemaSignIn = yup
    .object()
    .shape({
        email: yup.string().email('Invalid email').required('Email is a required field'),
        password: yup
            .string()
            .required('Password is a required field')
            .min(5, 'Min 5 symbols')
            .matches(/^[0-9a-zA-Z]{5,}$/, 'Password incorrect'),
    })
    .required();

export const schemaSignUp = yup
    .object()
    .shape({
        name: yup.string().required('Name is a required field'),
        email: yup.string().email('Invalid email').required('Email is a required field'),
        password: yup
            .string()
            .required('Password is a required field')
            .min(5, 'Min 5 symbols')
            .matches(/^[0-9a-zA-Z]{5,}$/, 'Password incorrect'),
        confirmPassword: yup
            .string()
            .oneOf([yup.ref('password')], 'Passwords must match')
    })
    .required();