import React, { useState } from 'react'
import styles from './Registration.module.scss'
import git from '../../shared/assets/git-icon.svg'
import google from '../../shared/assets/google-icon.svg'
import vk from '../../shared/assets/vk-icon.svg'
import AuthFormInput from '../Auth/AuthFormInput/AuthFormInput'
import { Link } from 'react-router-dom'
import { z } from 'zod'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../../shared/lib/store/store'
import { registerUser } from '../../shared/lib/store/auth/authSlice'

const userFormDataScheme = z.object({
    email: z.string().email('Введите корректный email'),
    password: z.string().min(8, 'Пароль должен содержать минимум 8 символов'),
    passwordRepeat: z.string(),
}).refine(data => data.password === data.passwordRepeat, {
    message: 'Пароли не совпадают',
    path: ['passwordRepeat'],
})

type FormData = z.infer<typeof userFormDataScheme>;
type FormDataKeys = keyof FormData;

function Registration() {

    const [userFormData, setUserFormData] = useState<FormData>({
        email: '',
        password: '',
        passwordRepeat: '',
    })
    const [hasValidationErrors, setHasValidationErrors] = useState(false)

    const dispatch = useDispatch<AppDispatch>()

    const handleInputChange = (field: FormDataKeys) => {
        return function handleField(value: string) {
            setUserFormData({
                ...userFormData,
                [field]: value,
            })
        }
    }

    const validate = () => {
        const result = userFormDataScheme.safeParse(userFormData)
        if (result.success) {
            return undefined
        }
        return result.error.format()
    }

    const sendForm = () => {
        const errors = validate()
        if (errors) {
            setHasValidationErrors(true)
            return
        }

        dispatch(registerUser({
            email: userFormData.email,
            password: userFormData.password,
        }))
    }

    const errors = hasValidationErrors ? validate() : undefined

    return (
        <main className={styles['registration__wrapper']}>
            <h1 className={styles['registration__title']}>Регистрация в PolyGames</h1>
            <form className={styles['registration__form']}>
                <div className={styles['registration__form-main']}>
                    <div className={styles['input__fields-block']}>
                        <div className={styles['form-input-block']}>
                            <AuthFormInput
                                onInputChange={handleInputChange('email' as FormDataKeys)}
                                title="Email пользователя"
                                type="email"
                            />
                            {errors?.email &&
                                <div className={styles['error-text']}>{errors?.email?._errors[0]}</div>
                            }
                        </div>
                        <div className={styles['form-input-block']}>
                            <AuthFormInput
                                onInputChange={handleInputChange('password' as FormDataKeys)}
                                title="Пароль"
                                type="password"
                            />
                            {errors?.password &&
                                <div className={styles['error-text']}>{errors?.password?._errors[0]}</div>
                            }
                        </div>
                        <div className={styles['form-input-block']}>
                            <AuthFormInput
                                onInputChange={handleInputChange('passwordRepeat' as FormDataKeys)}
                                title="Подтверждение пароля"
                                type="password"
                                name="password-repeat"
                            />
                            {errors?.passwordRepeat &&
                                <div className={styles['error-text']}>{errors?.passwordRepeat?._errors[0]}</div>
                            }
                        </div>
                        <div className={styles['registration__btns']}>
                            <button
                                className={styles['registration__btn']}
                                type="button"
                                onClick={() => sendForm()}
                            >
                                <p>Зарегистрироваться</p>
                                <div className={styles['btn__circle']}>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="15"
                                        height="14"
                                        viewBox="0 0 15 14"
                                        fill="none"
                                        className={styles['btn__arrow']}
                                    >
                                        <path
                                            d="M14.3334 7.58336C14.6555 7.26118 14.6555 6.73882 14.3334 6.41664L9.0831 1.16637C8.76091 0.844186 8.23855 0.844186 7.91637 1.16637C7.59419 1.48855 7.59419 2.01091 7.91637 2.3331L12.5833 7L7.91637 11.6669C7.59419 11.9891 7.59419 12.5114 7.91637 12.8336C8.23855 13.1558 8.76091 13.1558 9.0831 12.8336L14.3334 7.58336ZM0.25 7.825H13.75V6.175H0.25V7.825Z"
                                            fill="black"
                                        />
                                    </svg>
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
                <div className={styles['other__line']}></div>
                <div className={styles['other__registration__btns']}>
                    <p>Зарегистрироваться через:</p>
                    <div className={styles['btns']}>
                        <a href="#">
                            <img
                                src={vk}
                                alt="Вконтакте"
                                className={styles['aside-settings__icon']}
                            />
                        </a>
                        <a href="#">
                            <img
                                src={google}
                                alt="Google"
                                className={styles['aside-settings__icon']}
                            />
                        </a>
                        <a href="#">
                            <img
                                src={git}
                                alt="GitHub"
                                className={styles['aside-settings__icon']}
                            />
                        </a>
                    </div>
                </div>
            </form>
            <div className={styles['to-register-block']}>
                <h2>В первый раз в PolyGames?</h2>
                <Link to="/auth" className={styles['to-register-block__link']}>
                    Создать аккаунт
                </Link>
            </div>
        </main>
    )
}

export default Registration
