import React, { useState } from "react";
import { deleteNote } from "../api.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Format each meeting
export default function NoteRow(props) {
    const { _id, body } = props.note;
    const [confirmedDelete, setConfirmedDelete] = useState(false);
    const [deleted, setDeleted] = useState(false);

    function toggleDelete() {
        setConfirmedDelete(!confirmedDelete);
    }

    const onDelete = () => {
        const noteBody = {
            cid: props.cid,
            nid: _id,
        };

        deleteNote(noteBody).then(setDeleted(true));
    };

    const pageMain = () => {
        if (deleted) {
            return;
        } else {
            return (
                <div className="portalRow">
                    <span>{body}</span>
                    {confirmDelete()}
                </div>
            );
        }
    };

    const confirmDelete = () => {
        if (confirmedDelete) {
            return (
                <span>
                    <span className="cancelNoteDelete" onClick={toggleDelete}>
                        Cancel
                    </span>
                    <span className="crossNote" onClick={onDelete}>
                        Delete
                    </span>
                </span>
            );
        } else {
            return (
                <FontAwesomeIcon
                    onClick={toggleDelete}
                    className="crossNote"
                    icon="times-circle"
                />
            );
        }
    };

    return <div>{pageMain()}</div>;
}
