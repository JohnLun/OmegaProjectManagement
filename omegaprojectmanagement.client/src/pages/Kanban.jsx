import React, { useState } from "react";

import Column from "../components/Column.jsx";

function App() {
    

    return (
        <>
            <div className="row">
                <div className="col">
                    <Column name="backlog" endpoint="backlog"></Column>
                </div>
                <div className="col">
                    <Column name="In Progress" endpoint="in-progress"></Column>
                </div>
                <div className="col">
                    <Column name="Ready For Testing" endpoint="in-testing"></Column>
                </div>
                <div className="col">
                    <Column name="Completed" endpoint="in-complete"></Column>
                </div>
            </div>
           
            
            
            
        </>

        
    );
}

export default App;
