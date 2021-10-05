import React from "react";
import "./css/stage.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Draggable } from "react-beautiful-dnd";

// Format each tag
export default function Stage(stage) {
    const { _id, id, name, disableDragging, index } = stage;
    let dragIconStyle = "";
    if (disableDragging === true) {
        dragIconStyle = "draggableIcon hideDragIcon";
    } else {
        dragIconStyle = "draggableIcon";
    }

    return (
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
                    <button className="stageEdit">
                        <FontAwesomeIcon icon="pen" />
                    </button>
                </li>
            )}
        </Draggable>
    );
}
