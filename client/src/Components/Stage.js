import React, {useState} from "react";
import "./css/stage.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Draggable } from "react-beautiful-dnd";
import Modal from "react-modal";

// Format each tag
export default function Stage(stage) {
    const { _id, id, name, disableDragging, index } = stage;
    let dragIconStyle = "";
    if (disableDragging === true) {
        dragIconStyle = "draggableIcon hideDragIcon"
    } else {
        dragIconStyle = "draggableIcon"
    }
    
    //hold the details of a new stage
    const initialState = {
        sname: "",
        position: 0
    };
    const [newStage, setNewStage] = useState(initialState);
    const resetStage = () => {setNewStage({ ...initialState });};

    const [modalIsOpen, setIsOpen] = useState(false);
    function openModal() {setIsOpen(true);}
    function closeAndClear() {
        setIsOpen(false);
        resetStage();
    }

    const handleChange = (e) => {
        const { id, value } = e.target;
        setNewStage((prevState) => ({
            ...prevState,
            [id]: value,
        }));
    };

    Modal.setAppElement(document.getElementById('root') || undefined)

    return (
        <div>
            <Draggable isDragDisabled={disableDragging} draggableId={_id} index={index}>
                {(provided) => (
                    <li className="stage" id={id} ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                        <div className={dragIconStyle}>
                            <FontAwesomeIcon icon="bars" />
                        </div>
                        <div className="stageName">
                            {name}
                        </div>
                        <button className="stageEdit" onClick={openModal}>
                            <FontAwesomeIcon icon="pen"/>
                        </button>
                    </li>
                )}
            </Draggable>

            <Modal
                isOpen={modalIsOpen}
                className="editModal"
                contentLabel="Edit Stage"
            >
                <h2>Edit a stage</h2>
                <form>
                    <label>Name:
                        <input
                            type="text"
                            id="sname"
                            required
                            value={newStage.sname}
                            onChange={handleChange}
                        />
                    </label>

                    <label>Position:
                        <input
                            type="number" 
                            id="position"
                            min="0"
                            required
                            value={newStage.position}
                            onChange={handleChange}
                        />
                    </label>  
                    <button type="submit" className="addStageButton">Edit Stage</button>
                    <button className="stageCancelButton" onClick={closeAndClear}>Cancel</button>
                </form> 
            </Modal>

        </div>
    );
}
