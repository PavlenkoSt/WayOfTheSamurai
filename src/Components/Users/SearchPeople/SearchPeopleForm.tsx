import React, { FC } from 'react'
import { Formik, Form, Field } from 'formik'
import { FilteredOptionsType } from '../../../Redux/usersReducer'

type SearchPeopleFormPropsType = {
    setFilteredOptions: (filteredOptions: FilteredOptionsType) => void
}

const SearchPeopleForm: FC<SearchPeopleFormPropsType> = ({ setFilteredOptions }) => {
    return (
        <div>
            <Formik
                initialValues={{ term: '' }}
                onSubmit={(values, { setSubmitting }) => {
                    setFilteredOptions(values)
                    setSubmitting(false)
                }}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <Field type="text" name="term" placeholder="Имя" />
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
