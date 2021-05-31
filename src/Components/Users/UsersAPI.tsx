import React, { FC, useEffect } from 'react'
import { FilteredOptionsType } from '../../Redux/usersReducer';
import { GetUsersType, UserType } from '../../types/types';
import Users from './Users'

type UsersProps = {
  users: Array<UserType>
  usersCountOnPage: number
  currentPage: number
  totalCount: number
  portionsSize: number
  isFetching: boolean
  followingProgress: Array<number>
  filterOptions: FilteredOptionsType
  unfollowUser: (id: number) => void
  followUser: (id: number) => void
  getUsers: (countOnPage: number, currentPage: number, filterOptions: FilteredOptionsType) => Promise<GetUsersType>
  setTotalCount: (totalCount: number) => void
  setCurrentPage: (currentPage: number) => void
  setFilteredOptions: (filteredOptions: FilteredOptionsType) => void
}

const UsersAPI: FC<UsersProps> = (props) => {
  useEffect(() => {
    props
      .getUsers(props.usersCountOnPage, props.currentPage, props.filterOptions)
      .then((data) => props.setTotalCount(data.totalCount));
  }, [props.currentPage, props.filterOptions])

  const onPaginationChange = (currentPage: number) => {
    props.setCurrentPage(currentPage)
    props.getUsers(props.usersCountOnPage, currentPage, props.filterOptions)
  }

  return (
    <Users
      onPaginationChange={onPaginationChange}
      users={props.users}
      totalCount={props.totalCount}
      usersCountOnPage={props.usersCountOnPage}
      currentPage={props.currentPage}
      portionsSize={props.portionsSize}
      isFetching={props.isFetching}
      followingProgress={props.followingProgress}
      unfollowUser={props.unfollowUser}
      followUser={props.followUser}
    />
  );
};

export default UsersAPI