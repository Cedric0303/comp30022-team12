import React from "react";
import "./css/stageUpdateButtons.css"

// Format each tag
export default function StageUpdateButtons(props) {
    let { active, saveChanges, cancelChanges } = props;
    if (active) {
        return <div id="updateButtons"><button id="saveChangesButton" onClick={saveChanges}>Save Changes</button>
        <button id="cancelChangesButton" onClick={cancelChanges}>Cancel Changes</button></div>
    } else {
        return <div id="updateButtons"><button id="saveChangesButton" onClick={saveChanges} disabled>Save Changes</button>
        <button id="cancelChangesButton" onClick={cancelChanges} disabled>Cancel Changes</button></div>
    }
}
