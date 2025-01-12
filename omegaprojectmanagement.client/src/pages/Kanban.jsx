import React, { useState } from "react";

import Column from "../components/Column.jsx";

function App() {
    const [showModal, setShowModal] = useState(false);

    const handleCreateStory = () => {
        console.log("clicked");
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    return (
        <>
            <div className="bg-secondary">
                <nav className="navbar navbar-expand-lg navbar-dark bg-white rounded">
                    <h2 className="navbar-heading text-nowrap p-3">Omega PM</h2>
                    <div className="d-flex justify-content-end w-100">
                        <button
                            className="btn btn-danger btn-lg my-2 me-3 border border-dark"
                            type="button"
                            onClick={handleCreateStory}
                        >
                            Create Story
                        </button>
                    </div>
                </nav>

                <div className="container-fluid mt-4" style={{ height: "calc(100vh - 56px)" }}>
                    <div className="d-flex justify-content-between h-100" style={{ gap: "1rem" }}>
                        <div className="bg-dark text-white p-4 rounded border border-white h4" style={{ flex: "1", maxWidth: "24%" }}>
                            <Column name="Backlog" endpoint="backlog"></Column>
                        </div>
                        <div className="bg-dark text-white p-4 rounded border border-white h4" style={{ flex: "1", maxWidth: "24%" }}>
                            <Column name="In Progress" endpoint="in-progress"></Column>
                        </div>
                        <div className="bg-dark text-white p-4 rounded border border-white h4" style={{ flex: "1", maxWidth: "24%" }}>
                            <Column name="Ready For Testing" endpoint="in-testing"></Column>
                        </div>
                        <div className="bg-dark text-white p-4 rounded border border-white h4" style={{ flex: "1", maxWidth: "24%" }}>
                            <Column name="Completed" endpoint="in-complete"></Column>
                        </div>
                    </div>
                </div>

            </div>
            

            {/* Modal */}
            {showModal && (
                <div
                    className="modal fade show"
                    style={{ display: "block", backgroundColor: "rgba(0, 0, 0, 0.5)" }}
                >
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Create Story</h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={handleCloseModal}
                                ></button>
                            </div>
                            <div className="modal-body">
                                <form>
                                    <div className="mb-3">
                                        <label htmlFor="storyName" className="form-label">
                                            Story Name
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="storyName"
                                            placeholder="Enter story name"
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="storyDescription" className="form-label">
                                            Story Description
                                        </label>
                                        <textarea
                                            className="form-control"
                                            id="storyDescription"
                                            rows="3"
                                            placeholder="Enter story description"
                                        ></textarea>
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={handleCloseModal}
                                >
                                    Close
                                </button>
                                <button type="button" className="btn btn-primary">
                                    Save Story
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default App;
