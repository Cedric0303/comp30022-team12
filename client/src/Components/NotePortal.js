import React, { useState } from "react";
import Modal from "react-modal";
import NoteRow from "../Components/NoteRow.js"
import { postNewNote } from "../api.js";
import "./css/portal.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function NotePortal(props) {

    const [isOpen, setIsOpen] = useState(false);
    const [note, setNote] = useState("");

    Modal.setAppElement(document.getElementById('root') || undefined);

    // Open and close the modal
    function toggleModal() {
        setIsOpen(!isOpen);
        // Clear the note if modal is closed
        if (note !== "") {
            setNote("");
        }
    }

    const onSubmit = (e) => {
        e.preventDefault();
        if (!note) {
            alert("Note must not be empty!")
        } else {
            const noteBody = {
                cid: props.client.email,
                note: note
            }
            postNewNote(noteBody);
        }
    }

    return (
        <div className="clientNotesPortal">
            <p className="portalHeading">
                <span>Notes</span>
                <button className="addNote" onClick={toggleModal}>
                    Add Note <FontAwesomeIcon icon="plus-circle" />
                </button>
            </p>
            <Modal
                isOpen={isOpen}
                onRequestClose={toggleModal}
                contentLabel="Add Note"
                className="addNoteModal"
            >
                <form
                    method="post"
                    onSubmit={onSubmit}
                    className="addNoteForm"
                >
                    <h3 id="addNoteHeading">Add a new note</h3>
                    <textarea
                        className="noteField"
                        required
                        type="text"
                        placeholder="Add your note here"
                        value={note}
                        onChange={(e) =>
                            setNote(e.target.value)
                        }
                    />
                    <button
                        type="submit"
                        id="addNoteButton"
                        onClick={onSubmit}
                    >
                        Add Note
                    </button>
                    <button id="cancelAddNote" onClick={toggleModal}>Cancel</button>
                </form>
            </Modal>
            {props.client.notes.map((note) => (
                <NoteRow key={note._id} cid={props.client.email} note={note} />
            ))}
        </div>
)
}
