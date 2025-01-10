import React, { useState } from "react";

import Column from "../components/Column.jsx";

function App() {
    

    return (
        <>
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
                <h2 class="navbar-heading p-3">Omega</h2>
                <div class="d-flex justify-content-end w-100">
                    <button class="btn btn-outline-success my-2 " type="submit">Create Story</button>
                </div>
                
            </nav>

            <div className="container-fluid mt-4" style={{ height: "calc(100vh - 56px)" }}>
                <div className="d-flex justify-content-between h-100" style={{ gap: "1rem" }}>
                    <div className="bg-primary text-black p-4" style={{ flex: "1", maxWidth: "24%" }}>
                        <Column name="Backlog" endpoint="backlog"></Column>
                    </div>
                    <div className="bg-primary text-black p-4" style={{ flex: "1", maxWidth: "24%" }}>
                        <Column name="In Progress" endpoint="in-progress"></Column>
                    </div>
                    <div className="bg-primary text-black p-4" style={{ flex: "1", maxWidth: "24%" }}>
                        <Column name="Ready For Testing" endpoint="in-testing"></Column>
                    </div>
                    <div className="bg-primary text-black p-4" style={{ flex: "1", maxWidth: "24%" }}>
                        <Column name="Completed" endpoint="in-complete"></Column>
                    </div>
                </div>
            </div>

        </>
    );
}

export default App;
