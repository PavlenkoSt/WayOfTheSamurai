import React, { FC } from 'react'
import { Formik, Form, Field } from 'formik'
import { FilteredOptionsType } from '../../../Redux/usersReducer'
import s from './SearchPeopleForm.module.css'

type SearchPeopleFormPropsType = {
    setFilteredOptions: (filteredOptions: FilteredOptionsType) => void
    onFilterOptionsChange: (filterOptions: FilteredOptionsType) => void
}

const SearchPeopleForm: FC<SearchPeopleFormPropsType> = ({ setFilteredOptions, onFilterOptionsChange }) => {
    return (
        <div>
            <Formik
                initialValues={{ term: '', friend: 'all' }}
                onSubmit={(values, { setSubmitting }) => {
                    setFilteredOptions(values)
                    onFilterOptionsChange(values)
                    setSubmitting(false)
                }}
            >
                {({ isSubmitting }) => (
                    <Form className={s.form}>
                        <Field type="text" name="term" placeholder="Имя" />
                        <Field name="friend" as="select">
                            <option value="all">Все</option>
                            <option value="friends">Друзья</option>
                            <option value="notFriends">Не друзья</option>
                        </Field>
                        <button type="submit" disabled={isSubmitting}>
                            Найти
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default SearchPeopleForm
