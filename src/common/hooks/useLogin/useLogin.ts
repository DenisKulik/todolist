import { useActions } from 'common/hooks/useActions/useActions'
import { authThunks } from 'features/login/model/auth.slice'
import { FormikHelpers, useFormik } from 'formik'
import { LoginArgType } from 'features/login/api/auth.api'
import { ResponseType } from 'common/types'

export const useLogin = () => {
    const { login } = useActions(authThunks)

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
            login(values)
                .unwrap()
                .catch((data: ResponseType) => {
                    data.fieldsErrors?.forEach(fieldError => {
                        formikHelpers.setFieldError(fieldError.field, fieldError.error)
                    })
                })
        },
    })

    return { formik }
}

type FormikErrorType = Partial<Omit<LoginArgType, 'captcha'>>
