import React from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Navbar from "../Components/Navbar/Navbar.js";
import "./css/home.css"

function Home(props) {

    function routeChange(link) {
        window.location.href = link;
    }
    
    // const { height: winHeight } = useWindowDimensions();
    // // make calendar fill remaining height
    // useEffect(() => {
    //     let homeGrid = document.getElementsByClassName("homeGrid")[0];
    //     if (homeGrid) {
    //         homeGrid.style.height = winHeight - homeGrid.offsetTop + "px";
    //     }
    // })

    return (
        <div>
            <Navbar />
            <div className="homeGrid">

                <div className="homeButtonGroup">
                    {/* <HomeButton id="addClient"></HomeButton>
                    <HomeButton id="addClient"></HomeButton> */}

                    <NavLink className="homeAddClient" to="clients/create">
                        <div className="homeImageContainer">
                            <FontAwesomeIcon icon="plus" />
                        </div>
                    </NavLink>
                    <NavLink className="homeViewClient" to="clients">
                        <div className="homeImageContainer">
                            <FontAwesomeIcon icon="user-plus" />
                        </div>
                    </NavLink>
                </div>
            </div>
        </div>
    );
}

export default Home;
