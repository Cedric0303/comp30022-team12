import React, { useState } from "react";
import Navbar from "../Components/Navbar/Navbar.js";
import { Helmet } from "react-helmet";
import { useStages, postStage } from "../api.js";
import Stage from "../Components/Stage.js";
import "./css/adminManageStages.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Modal from 'react-modal';

function AdminManageStages(props) {

    //hold the details of a new stage
    const initialState = {
        stageName: "",
        position: 0
    };
    const [{ stageName, position }, setNewStage] = useState(initialState);
    const resetStage = () => {setNewStage({ ...initialState });};

    Modal.setAppElement(document.getElementById('root') || undefined)

    //handles state of modal's show
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
                    <label>Name:
                        <input
                            type="text"
                            id="stageName"
                            required
                            value={stageName}
                            onChange={handleChange}
                        />
                    </label>

                    <label>Position:
                        <input
                            type="number" 
                            id="position"
                            min="0"
                            required
                            value={position}
                            onChange={handleChange}
                        />
                    </label>  
                    <button type="submit" className="addStageButton">Add Stage</button>
                    <button className="stageCancelButton" onClick={closeAndClear}>Cancel</button>  
                </form>
                
            </Modal>
        </div>
    );
}

export default AdminManageStages;
