import React from "react";
import "./css/portal.css";

export default function LogPortal(props) {

    // const portalContent = () => {
    //     if (loading) {
    //         return (
    //             <div className="portalContent">
    //                 <p>Loading...</p>
    //             </div>
    //         );
    //     } else if (error) {
    //         return (
    //             <div className="portalContent">
    //                 <p>Something went wrong: {error.message}</p>
    //             </div>
    //         );
    //     } else {
    //         return (
    //             <div className="portalContent">
    //                 {activitiesData.activities.map((activity) => (
    //                     <MeetingRow {...activity} />
    //                 ))}
    //             </div>
    //         )
    //     }
    // }
    return (
        <div className="clientLogPortal">
            <p className="portalHeading">Activity Log</p>
            {/* {portalContent()} */}
        </div>
    )
}
