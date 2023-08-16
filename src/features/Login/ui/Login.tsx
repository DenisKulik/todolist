import { FormikHelpers, useFormik } from 'formik'
import styled from 'styled-components'
import { Navigate } from 'react-router-dom'
import Grid from '@mui/material/Grid'
import Checkbox from '@mui/material/Checkbox'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormGroup from '@mui/material/FormGroup'
import FormLabel from '@mui/material/FormLabel'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { useAppDispatch, useAppSelector } from 'common/hooks'
import { authThunks } from 'features/Login/model/auth.reducer'
import { LoginArgType } from 'features/Login/api/auth.api'
import { ResponseType } from 'common/types'

export const Login = () => {
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
    const dispatch = useAppDispatch()

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false,
        },
        validate: values => {
            const errors: FormikErrorType = {}

            if (!values.email) {
                errors.email = 'Required'
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address'
            }

            if (!values.password) {
                errors.password = 'Required'
            } else if (values.password?.trim().length < 3) {
                errors.password = 'Password must be at least 3 characters long'
            }

            return errors
        },
        onSubmit: (values, formikHelpers: FormikHelpers<LoginArgType>) => {
            dispatch(authThunks.login(values))
                .unwrap()
                .catch((data: ResponseType) => {
                    data.fieldsErrors?.forEach(fieldError => {
                        formikHelpers.setFieldError(fieldError.field, fieldError.error)
                    })
                })
        },
    })

    const isEmailError = formik.touched.email && formik.errors.email
    const isPasswordError = formik.touched.password && formik.errors.password

    if (isLoggedIn) return <Navigate to="/" />

    return (
        <Grid container justifyContent={'center'}>
            <Grid item justifyContent={'center'}>
                <FormControl>
                    <FormLabel>
                        <p>
                            To log in get registered
                            <Link
                                href="https://social-network.samuraijs.com/"
                                target="_blank"
                                rel="noreferrer"
                            >
                                here
                            </Link>
                        </p>
                        <p>or use common test account credentials:</p>
                        <p>Email: free@samuraijs.com</p>
                        <p>Password: free</p>
                    </FormLabel>
                    <form onSubmit={formik.handleSubmit}>
                        <FormGroup>
                            <TextField
                                label="Email"
                                margin="normal"
                                {...formik.getFieldProps('email')}
                            />
                            {isEmailError && (
                                <div style={{ color: 'red' }}>{formik.errors.email}</div>
                            )}
                            <TextField
                                type="password"
                                label="Password"
                                margin="normal"
                                {...formik.getFieldProps('password')}
                            />
                            {isPasswordError && (
                                <div style={{ color: 'red' }}>{formik.errors.password}</div>
                            )}
                            <FormControlLabel
                                label="Remember me"
                                checked={formik.values.rememberMe}
                                control={<Checkbox {...formik.getFieldProps('rememberMe')} />}
                            />
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                disabled={!!isEmailError || !!isPasswordError}
                            >
                                Login
                            </Button>
                        </FormGroup>
                    </form>
                </FormControl>
            </Grid>
        </Grid>
    )
}

// styles
const Link = styled('a')`
    margin-left: 5px;
`

// types
type FormikErrorType = Partial<Omit<LoginArgType, 'captcha'>>
