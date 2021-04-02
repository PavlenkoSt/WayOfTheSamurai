import React, { useEffect, useState } from "react";
import s from "./Status.module.css";

const Status = props => {
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
  const inputChange = (e) => {
    changeStatus(e.target.value);
  };

  return (
    <div className={s.status}>
      {!editMode && (
        <span
          title={ (props.isOwner && "Кликните дважды, чтобы изменить статус") || null }
          onDoubleClick={ props.isOwner ? activeEditMode : null}
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
