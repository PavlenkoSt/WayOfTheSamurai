import React, { FC, useEffect } from 'react'
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
  unfollowUser: (id: number) => void
  followUser: (id: number) => void
  getUsers: (countOnPage: number, currentPage: number) => Promise<GetUsersType>
  setTotalCount: (totalCount: number) => void
  setCurrentPage: (currentPage: number) => void
}

const UsersAPI: FC<UsersProps> = (props) => {
  useEffect(() => {
    props
      .getUsers(props.usersCountOnPage, props.currentPage)
      .then((data) => props.setTotalCount(data.totalCount));
  }, [props.currentPage]);

  const onPaginationChange = (currentPage: number) => {
    props.setCurrentPage(currentPage)
    props.getUsers(props.usersCountOnPage, currentPage)
  };
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