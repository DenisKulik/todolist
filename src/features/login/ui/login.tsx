import styled from 'styled-components'
import { Navigate } from 'react-router-dom'
import Grid from '@mui/material/Grid'
import Checkbox from '@mui/material/Checkbox'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormGroup from '@mui/material/FormGroup'
import FormLabel from '@mui/material/FormLabel'
import TextField from '@mui/material/TextField'

import { useAppSelector, useLogin } from 'common/hooks'
import { CustomButton } from 'common/components/custom-button'

export const Login = () => {
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
    const captchaUrl = useAppSelector(state => state.auth.captchaUrl)
    const { formik } = useLogin()

    const isEmailError = formik.touched.email && formik.errors.email
    const isPasswordError = formik.touched.password && formik.errors.password

    if (isLoggedIn) return <Navigate to="/" />

    return (
        <Grid container justifyContent="center" sx={{ paddingTop: '25px' }}>
            <Grid item justifyContent="center">
                <FormControl>
                    <FormLabel sx={{ textAlign: 'center' }}>
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
                            {captchaUrl && <img src={captchaUrl} alt="captcha" />}
                            {captchaUrl && (
                                <TextField
                                    label="captcha"
                                    margin="normal"
                                    {...formik.getFieldProps('captcha')}
                                />
                            )}
                            <CustomButton
                                title="Login"
                                type="submit"
                                variant="contained"
                                color="primary"
                                disabled={!!isEmailError || !!isPasswordError}
                            />
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
    color: #2424ff;
`
