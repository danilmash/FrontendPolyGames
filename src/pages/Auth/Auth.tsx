import React, { useState } from 'react'
import styles from './Auth.module.scss'
import git from '../../shared/assets/git-icon.svg'
import google from '../../shared/assets/google-icon.svg'
import vk from '../../shared/assets/vk-icon.svg'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../shared/lib/store/store'
import { loginUser } from '../../shared/lib/store/auth/authSlice'
import { useNavigate } from 'react-router-dom'
import AuthFormInput from '../Auth/AuthFormInput/AuthFormInput'
import { z } from 'zod'

// Zod-схема для валидации
const loginFormSchema = z.object({
    email: z.string().email('Введите корректный email'),
    password: z.string().min(1, 'Введите пароль'),
})

type LoginForm = z.infer<typeof loginFormSchema>
type LoginFormKeys = keyof LoginForm

function Auth() {
    const [formData, setFormData] = useState<LoginForm>({
        email: '',
        password: '',
    })
    const [hasValidationErrors, setHasValidationErrors] = useState(false)
    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate()
    const { error, loading } = useSelector((state: RootState) => state.auth)

    const handleInputChange = (field: LoginFormKeys) => {
        return function (value: string) {
            setFormData((prev) => ({ ...prev, [field]: value }))
        }
    }

    const validate = () => {
        const result = loginFormSchema.safeParse(formData)
        if (result.success) {
            return undefined
        }
        return result.error.format()
    }

    const handleSubmit = async () => {
        const errors = validate()
        if (errors) {
            setHasValidationErrors(true)
            return
        }

        try {
            await dispatch(loginUser(formData)).unwrap()
            navigate('/profile')
        } catch (err) {
            // Обработка ошибки уже есть в Redux, просто останемся на месте
        }
    }

    const errors = hasValidationErrors ? validate() : undefined

    return (
        <main className={styles['auth__wrapper']}>
            <h1 className={styles['auth_title']}>Войдите в свой аккаунт</h1>
            <form
                className={styles['auth__form']}
                onSubmit={(e) => e.preventDefault()}
            >
                <div className={styles['input__fields-block']}>
                    <div className={styles['form-input-block']}>
                        <AuthFormInput
                            onInputChange={handleInputChange('email')}
                            title="Email пользователя"
                            type="email"
                        />
                        {errors?.email && (
                            <div className={styles['error-text']}>
                                {errors.email._errors[0]}
                            </div>
                        )}
                    </div>
                    <div className={styles['form-input-block']}>
                        <AuthFormInput
                            onInputChange={handleInputChange('password')}
                            title="Пароль"
                            type="password"
                        />
                        {errors?.password && (
                            <div className={styles['error-text']}>
                                {errors.password._errors[0]}
                            </div>
                        )}
                    </div>
                </div>
                <div className={styles['auth__btns']}>
                    <button
                        className={styles['auth__btn']}
                        onClick={handleSubmit}
                    >
                        <p>{loading ? 'Вход...' : 'Войти'}</p>
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
                    <p>Забыли пароль?</p>
                </div>
                {error && (
                    <div className={styles['error-text']}>
                        {typeof error === 'string'
                            ? error
                            : 'Неверный логин или пароль'}
                    </div>
                )}
                <div className={styles['break-line']}></div>
                <div className={styles['other']}>
                    <p>Или продолжить через:</p>
                    <div className={styles['other__auth-btns']}>
                        <img
                            src={vk}
                            alt="VK"
                            className={styles['other__auth-btn']}
                        />
                        <img
                            src={google}
                            alt="Google"
                            className={styles['other__auth-btn']}
                        />
                        <img
                            src={git}
                            alt="GitHub"
                            className={styles['other__auth-btn']}
                        />
                    </div>
                </div>
            </form>
            <div className={styles['link__registr']}>
                <h2>В первый раз в PolyGames?</h2>
                <p>Создать аккаунт</p>
            </div>
        </main>
    )
}

export default Auth
