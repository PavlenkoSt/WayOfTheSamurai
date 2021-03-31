import React, { useEffect } from 'react'
import Users from './Users'

const UsersAPI = (props) => {
  useEffect(() => {
    props
      .getUsers(props.usersCountOnPage, props.currentPage)
      .then((data) => props.setTotalCount(data.totalCount));
  }, [props.currentPage]);

  const onPaginationChange = (currentPage) => {
    props.setCurrentPage(currentPage);
    props.getUsers(props.usersCountOnPage, currentPage);
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