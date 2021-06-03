import React, { FC, useEffect } from 'react'
import { Formik, Form, Field } from 'formik'
import { FilteredOptionsType, getUsers, usersActions } from '../../../Redux/usersReducer'
import s from './SearchPeopleForm.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { filteredOptionsSelector, usersCountOnPageSelector } from '../../../Redux/selectors/usersSelectors'


const SearchPeopleForm: FC = () => {
    const dispatch = useDispatch()

    const usersCountOnPage = useSelector(usersCountOnPageSelector)
    const filter = useSelector(filteredOptionsSelector)

    const onFilterOptionsChange = (filterOptions: FilteredOptionsType) => {
        dispatch(getUsers(usersCountOnPage, 1, filterOptions))
        dispatch(usersActions.setCurrentPage(1))
        dispatch(usersActions.setFilteredOptions(filterOptions))
    }

    return (
        <div>
            <Formik
                enableReinitialize={true}
                initialValues={{ term: filter.term, friend: filter.friend }}
                onSubmit={ async (values, { setSubmitting }) => {
                    await onFilterOptionsChange(values)
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
