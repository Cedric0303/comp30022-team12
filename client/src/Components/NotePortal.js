import React from "react";
import "./css/portal.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function MeetingPortal(notes) {

    const addNote = () => {
    }

    return (
        <div className="clientNotesPortal">
            <p className="portalHeading">
                <span>Notes</span>
                <button className="addNote" onClick={addNote()}>
                    Add Note <FontAwesomeIcon icon="plus-circle" />
                </button>
            </p>
            {notes.notes.map((note) => (
                <p className="portalRow">{note.body}</p>
            ))}
        </div>
)
}
