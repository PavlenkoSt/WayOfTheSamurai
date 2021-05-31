import React, { ChangeEventHandler, FC, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { updateStatus } from "../../../../../Redux/profileReducer"
import { statusSelector } from "../../../../../Redux/selectors/profileSelectors"
import s from "./Status.module.css"

type StatusPropsType = {
  myId: string
  isOwner: boolean
}

const Status: FC<StatusPropsType> = ({ isOwner, myId}) => {

  const statusFromBLL = useSelector(statusSelector)

  const [editMode, changeEditMode] = useState(false)
  const [status, changeStatus] = useState(statusFromBLL)

  const dispatch = useDispatch()

  useEffect(() => {
    changeStatus(statusFromBLL)
  }, [statusFromBLL])

  const activeEditMode = () => {
    changeEditMode(true);
  };
  const unactiveEditMode = () => {
    changeEditMode(false);
    dispatch(updateStatus(status, myId))
  };
  const inputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    changeStatus(e.target.value);
  };

  return (
    <div className={s.status}>
      {!editMode && (
        <span
          title={ (isOwner && "Кликните дважды, чтобы изменить статус") || undefined }
          onDoubleClick={ isOwner ? activeEditMode : undefined}
        >
          {status || (isOwner && "Кликните дважды, чтобы установить статус")}
        </span>
      )}
      {editMode && (
        <input
          onBlur={unactiveEditMode}
          autoFocus={true}
          value={status}
          onChange={inputChange}
          className={s.input}
        />
      )}
    </div>
  );
}

export default Status;
