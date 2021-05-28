import React, { ChangeEventHandler, FC, SyntheticEvent, useEffect, useState } from "react";
import s from "./Status.module.css";

type StatusPropsType = {
  myId: string
  status: string
  isOwner: boolean
  updateStatus: (status: string, myId: string) => void
}

const Status: FC<StatusPropsType> = props => {
  const [editMode, changeEditMode] = useState(false);
  const [status, changeStatus] = useState(props.status);

  useEffect(() => {
    changeStatus(props.status);
  }, [props.status]);

  const activeEditMode = () => {
    changeEditMode(true);
  };
  const unactiveEditMode = () => {
    changeEditMode(false);
    props.updateStatus(status, props.myId);
  };
  const inputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    changeStatus(e.target.value);
  };

  return (
    <div className={s.status}>
      {!editMode && (
        <span
          title={ (props.isOwner && "Кликните дважды, чтобы изменить статус") || undefined }
          onDoubleClick={ props.isOwner ? activeEditMode : undefined}
        >
          {status || (props.isOwner && "Кликните дважды, чтобы установить статус")}
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
