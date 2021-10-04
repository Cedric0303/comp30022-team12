import React from "react";
import "./css/stageUpdateButtons.css"

// Format each tag
export default function StageUpdateButtons(props) {
    let { active } = props;
    if (active) {
        return <div id="updateButtons"><button id="confirmChangesButton">Confirm Changes</button>
        <button id="cancelChangesButton">Cancel Changes</button></div>
    } else {
        return <div id="updateButtons"><button id="confirmChangesButton" disabled>Confirm Changes</button>
        <button id="cancelChangesButton" disabled>Cancel Changes</button></div>
    }
}