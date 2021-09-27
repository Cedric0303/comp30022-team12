import React, { useState } from "react";
import Navbar from "../Components/Navbar/Navbar.js";
import { Helmet } from "react-helmet";
import { useStages } from "../api.js";
import Stage from "../Components/Stage.js";
import "./css/adminManageStages.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Modal from 'react-modal'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

function AdminManageStages(props) {
    const modalStyle = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
        },
    };

    Modal.setAppElement(document.getElementById('root') || undefined)

    let subtitle;
    const [modalIsOpen, setIsOpen] = useState(false);

    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false)
    }

    const { loading, stagesData, error } = useStages();

    const [searchQuery, setSearchQuery] = useState('');

    // accepts array of stage objects only
    function filterStages(stages, query) {
        if (!query) {
            return stages;
        }

        return stages.filter((stage) => {
            const stageName = stage.name.toLowerCase();
            if (stageName.includes(query) || stage.position.toString().includes(query)) {
                return true;
            }
        });
    }

    const filteredStages = filterStages(stagesData.stages, searchQuery);

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
                            <input 
                                id="stageSearchBar"
                                value={searchQuery}
                                onInput={e => setSearchQuery(e.target.value)}
                                placeholder="Search stages"
                            />
                            <button id="addStageButton" onClick={openModal}>
                                <span>Add New Stage </span>
                                <FontAwesomeIcon icon="plus" />
                            </button>
                        </li>
                        <li id="stagesListHeading">Stage</li>
                        <DragDropContext>
                            <Droppable droppableId="stagesDroppable">
                                {(provided) => (
                                    <div id="stages" {...provided.droppableProps} ref={provided.innerRef}>
                                        {filteredStages.map((stage) => (
                                            <Stage key={stage._id} {...stage} />
                                        ))}
                                    </div>
                                )}
                            </Droppable>
                        </DragDropContext>
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
                onRequestClose={closeModal}
                style={modalStyle}
                contentLabel="Add New Stage"
            >
                <h2>Hello</h2>
                <button onClick={closeModal}>close</button>
                <div>this is a modal!</div>
                <form>
                    <input />
                    <button>test</button>
                </form>
            </Modal>
        </div>
    );
}

export default AdminManageStages;
