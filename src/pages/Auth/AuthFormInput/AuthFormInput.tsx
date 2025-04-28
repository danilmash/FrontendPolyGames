import React, { FC, useState } from 'react'
import styles from './AuthFormInput.module.scss'

interface InputProps {
    onInputChange: (value: string) => void
    title: string
    type: string
    name?: string
}

const AuthFormInput: FC<InputProps> = ({
    onInputChange,
    title,
    type,
    name,
}) => {
    const [value, setValue] = useState('')

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value
        setValue(newValue)
        onInputChange(newValue)
    }

    return (
        <div className={styles['input-block']}>
            <label className={styles['input-block__label']} htmlFor="email">
                {title}
            </label>
            <input
                type={type}
                name={name || type}
                className={styles['input-block__input']}
                placeholder={title}
                value={value}
                onChange={handleInputChange}
            />
        </div>
    )
}

export default AuthFormInput
