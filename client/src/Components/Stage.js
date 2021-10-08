import React, { useState } from "react";
import "./css/stage.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Draggable } from "react-beautiful-dnd";
import Modal from "react-modal";
import { editStage, deleteStage } from "../api.js";

// Format each tag
export default function Stage(stage) {
    const { _id, id, name, disableDragging, index } = stage;
    let dragIconStyle = "";
    if (disableDragging === true) {
        dragIconStyle = "draggableIcon hideDragIcon";
    } else {
        dragIconStyle = "draggableIcon";
    }

    //hold the details of a stage to be edited/removed
    const initialState = {
        sname: "",
    };
    const [currStage, setCurrStage] = useState(initialState);
    const resetStage = () => {
        setCurrStage({ ...initialState });
    };

    const [modalIsOpen, setIsOpen] = useState(false);
    function openModal() {
        setIsOpen(true);
    }
    function closeAndClear() {
        setIsOpen(false);
        resetStage();
    }

    const handleChange = (e) => {
        const { id, value } = e.target;
        setCurrStage((prevState) => ({
            ...prevState,
            [id]: value,
        }));
    };

    const handleEdit = (e) => {
        if (currStage.sname) {
            editStage(currStage, id);
        }
    };

    const handleDelete = (e) => {
        deleteStage(id);
        setIsOpen(false);
    };

    Modal.setAppElement(document.getElementById("root") || undefined);

    return (
        <div>
            <Draggable
                isDragDisabled={disableDragging}
                draggableId={_id}
                index={index}
            >
                {(provided) => (
                    <li
                        className="stage"
                        id={id}
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                    >
                        <div className={dragIconStyle}>
                            <FontAwesomeIcon icon="bars" />
                        </div>
                        <div className="stageName">{name}</div>
                        <button className="stageEdit" onClick={openModal}>
                            <FontAwesomeIcon icon="pen" />
                        </button>
                    </li>
                )}
            </Draggable>

            <Modal
                isOpen={modalIsOpen}
                className="editModal"
                overlayClassName="editModalOverlay"
                contentLabel="Edit Stage"
            >
                <h2 className="editStageTitle">Edit stage</h2>
                <button className="deleteStageButton" onClick={handleDelete}>
                    Delete Stage
                </button>
                <form className="editStageForm" onSubmit={handleEdit}>
                    <label className="editStageName">
                        Name:
                        <input
                            type="text"
                            id="sname"
                            required
                            value={currStage.sname}
                            onChange={handleChange}
                            placeholder={name}
                        />
                    </label>
                    <button type="submit" className="editStageButton">
                        Save Changes
                    </button>
                    <button
                        className="stageCancelButton"
                        onClick={closeAndClear}
                    >
                        Cancel
                    </button>
                </form>
            </Modal>
        </div>
    );
}
