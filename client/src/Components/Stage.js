import React from "react";
import "./css/stage.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Format each tag
export default function Stage(stage) {
    const { id, position, name } = stage;

    return (
        <li className="stage" id={id}>
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
    );
}
