import React from "react";
import "./css/stage.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Draggable } from "react-beautiful-dnd";

// Format each tag
export default function Stage(stage) {
    const { _id, id, position, name } = stage;

    return (
        <Draggable draggableId={_id} index={position}>
            {(provided) => (
                <li className="stage" id={id} ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                    <div className="stagePos">
                        {position}
                    </div>
                    <div className="stageName">
                        {name}
                    </div>
                    <button className="stageEdit">
                        <FontAwesomeIcon icon="pen" />
                    </button>
                </li>
            )}
        </Draggable>
    );
}
