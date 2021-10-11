import React from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import UserMeetingPortal from "../Components/UserMeetingPortal.js";
import Navbar from "../Components/Navbar/Navbar.js";
import "./css/home.css"

function Home(props) {

    // function routeChange(link) {
    //     window.location.href = link;
    // }
    
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
                <div className ="homePortals">
                    <UserMeetingPortal/>
                </div>

                <NavLink
                    to={{
                        pathname: "../calendar",
                        state: {
                            client: props.client,
                            fromClient: true,
                        },
                    }}
                    
                    className="homeViewCal">
                    View Calendar
                </NavLink>

                <div className="homeButtonGroup">
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
