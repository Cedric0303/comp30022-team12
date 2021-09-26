import React, { useState, useEffect } from "react";
import Navbar from "../Components/Navbar/Navbar.js";
import { Helmet } from "react-helmet";
import { getStages, postStage } from "../api.js";
import Stage from "../Components/Stage.js";
import "./css/adminManageStages.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Modal from "react-modal";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

function AdminManageStages(props) {
    
    //hold the details of a new stage
    const initialState = {
        sname: ""
    };
    const [newStage, setNewStage] = useState(initialState);
    const resetStage = () => {setNewStage({ ...initialState });};

    Modal.setAppElement(document.getElementById('root') || undefined)

    //handles state of modal's show
    const [addModalIsOpen, setAddIsOpen] = useState(false);
    function openModal() {setAddIsOpen(true);}
    function closeAndClear() {
        setAddIsOpen(false);
        resetStage();
    }

    const handleChange = (e) => {
        const { id, value } = e.target;
        setNewStage((prevState) => ({
            ...prevState,
            [id]: value,
        }));
    };

    const handleAdd = (e) => {
        if(newStage.sname){
            postStage(newStage);
            resetStage();
        }
    }

    // const { loading, stagesData, error } = useStages();
    const [loading, setLoading] = useState(true);
    const [stagesData, setStages] = useState([]);
    const [error, setError] = useState(null);
    useEffect(() => {
        getStages()
            .then((stagesData) => {
                setStages(stagesData.stages);
                setLoading(false);
            })
            .catch((e) => {
                console.log(e);
                setError(e);
                setLoading(false);
            });
    }, []);

    const [searchQuery, setSearchQuery] = useState("");

    let disableDragging = false;

    // accepts array of stage objects only
    // returns array of filtered stage objects
    function filterStages(stages, query) {
        if (!query) {
            disableDragging = false;
            return stages;
        } else {
            disableDragging = true;
            var pattern = query
                .split("")
                .map((x) => {
                    return `(?=.*${x})`;
                })
                .join("");
            var regex = new RegExp(`^${pattern}`, "i");
            return stages.filter((stage) => {
                return regex.test(stage.name) || regex.test(stage.position + 1);
            });
        }
    }

    const filteredStages = filterStages(stagesData, searchQuery);

    const reorder = (list, startIndex, endIndex) => {
        const result = Array.from(list);
        const [moved] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, moved);
        return result;
    };

    function handleOnDragEnd(result) {
        if (!result.destination) {
            return;
        }

        // update stagesData with new order of stages
        const newStageOrder = reorder(
            stagesData,
            result.source.index,
            result.destination.index
        );
        setStages(newStageOrder);

        // get an array of previous positions
        // get an array of new positions
        // if different, highlight the changed positions
    }

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
                        <div id="stageContainer">
                            <div id="stagePosColumn">
                                {stagesData.map((e, index)=>(
                                    <div key={index} className="stagePos">
                                        {index+1}
                                    </div>
                                ))}
                            </div>
                            <DragDropContext onDragEnd={handleOnDragEnd}>
                                <Droppable droppableId="stagesDroppable">
                                    {(provided) => (
                                        <div
                                            id="stages"
                                            {...provided.droppableProps}
                                            ref={provided.innerRef}
                                        >
                                            {filteredStages.map((stage, index) => (
                                                <Stage
                                                    key={stage._id}
                                                    {...stage}
                                                    index={index}
                                                    disableDragging={
                                                        disableDragging
                                                    }
                                                />
                                            ))}
                                            {provided.placeholder}
                                        </div>
                                    )}
                                </Droppable>
                            </DragDropContext>
                        </div>
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
                isOpen={addModalIsOpen}
                className="addModal"
                contentLabel="Add New Stage"
            >
                <h2>Add a new stage</h2>
                <form onSubmit={handleAdd}>
                    <label>Name:
                        <input
                            type="text"
                            id="sname"
                            required
                            value={newStage.sname}
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