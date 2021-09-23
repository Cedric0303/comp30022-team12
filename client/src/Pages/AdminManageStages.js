import React, { useState } from "react";
import Navbar from "../Components/Navbar/Navbar.js";
import { Helmet } from "react-helmet";
import { useStages } from "../api.js";
import Stage from "../Components/Stage.js";
import "./css/adminManageStages.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Modal from 'react-modal';

function AdminManageStages(props) {

    //hold the name of a new stage
    const [stageName, setStageName] = useState("");

    Modal.setAppElement(document.getElementById('root') || undefined)

    //handles state of modal's show
    const [modalIsOpen, setIsOpen] = useState(false);
    function openModal() {setIsOpen(true);}
    function closeModal() {setIsOpen(false);}

    const { loading, stagesData, error } = useStages();

    const pageMain = () => {
        if (loading) {
            return (
                <div className="stagesBox">
                    <ul>Loading...</ul>
                </div>
            );
        } else if (error) {
            return (
                <div className="stagesBox">
                    <ul>Something went wrong: {error.message}</ul>
                </div>
            );
        } else {
            return (
                <div className="stagesBox">
                    <ul id="stagesList">
                        <li id="stagesListActionBar">
                            <input id="stageSearchBar"></input>
                            <button id="addStageButton" onClick={openModal}>
                                <span>Add New Stage </span>
                                <FontAwesomeIcon icon="plus" />
                            </button>
                        </li>
                        <li id="stagesListHeading">Stage</li>
                        {stagesData.stages.map((stage) => (
                            <Stage {...stage} />
                        ))}
                    </ul>
                </div>
            );
        }
    };

    return (
        <div className="manageStages pageContainer">
            <Helmet>
                <style type="text/css">{`
                    html {
                        background-color: #596e80;
                    }
                `}</style>
            </Helmet>
            <Navbar />
            <main className="manageStagesBox">
                <h2 id="stagesHeading">Manage Stages</h2>
                {pageMain()}
            </main>

            <Modal
                isOpen={modalIsOpen}
                //onRequestClose={closeModal}
                //style={modalStyle}
                className="addModal"
                contentLabel="Add New Stage"
            >
                <h2>Add a new stage</h2>
                <form>
                <label>Name: </label>
                    <input
                        type="text"
                        className="form-control"
                        id="new-stage"
                        //value={stageName}
                    />    
                </form>

                <button>Add stage</button>
                <button onClick={closeModal}>Cancel</button>
            </Modal>
        </div>
    );
}

export default AdminManageStages;
