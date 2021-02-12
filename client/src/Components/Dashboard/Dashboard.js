import React from "react";
import Sidebar from "./Sidebar";

function Dashboard({ data }){
    return(
        <div className="d-flex" style={{ height: '100vh' }}>
            <Sidebar id={data}/>
        </div>
    );
}

export default Dashboard;