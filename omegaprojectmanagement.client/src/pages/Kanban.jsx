import React, { useState } from "react";
import Column from "../components/Column.jsx";
import "./Kanban.css";

function App() {
  const [showModal, setShowModal] = useState(false);
  const [storyName, setStoryName] = useState("");
  const [storyDescription, setStoryDescription] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [fetchDataCallbacks, setFetchDataCallbacks] = useState({});
  const statusName = "Backlog";

  const handleCreateStory = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleSaveStory = async () => {
    const url = "https://localhost:7173/api/story";
    const storyData = {
      storyName,
      storyDescription,
      firstName,
      lastName,
      statusName,
    };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(storyData),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Story saved successfully:", result);
        handleCloseModal();
        setStoryName("");
        setStoryDescription("");
        setFirstName("");
        setLastName("");
        // Trigger fetchData for all columns
        Object.values(fetchDataCallbacks).forEach((callback) => callback());
      } else {
        console.error("Failed to save story:", response.statusText);
      }
    } catch (error) {
      console.error("Error saving story:", error);
    }
  };

  const handleRegisterFetchData = (columnName, fetchData) => {
    setFetchDataCallbacks((prev) => ({ ...prev, [columnName]: fetchData }));
  };

  return (
    <>
      <div className="total-background">
        <nav>
          <h2>Omega PM</h2>
            <button
              className="create-story btn btn-primary btn my-2 me-3 border border-dark"
              type="button"
              onClick={handleCreateStory}
            >
              Create Story
            </button>
        </nav>

        <div className="container-fluid mt-4" style={{ height: "calc(100vh - 56px)" }}>
          <div className="d-flex justify-content-between h-100" style={{ gap: "1rem" }}>
            <div className="custom-scrollbar overflow-auto shadow-lg bg-dark text-white rounded border border-white h4" style={{ flex: "1", maxWidth: "24%" }}>
              <Column
                  name="Backlog"
                  endpoint="backlog"
                  onRegisterFetchData={(columnName, fetchData) => handleRegisterFetchData(columnName, fetchData)}
                  refreshColumns={fetchDataCallbacks}
              />
            </div>
            <div className="custom-scrollbar overflow-auto shadow-lg bg-dark text-white rounded border border-white h4" style={{ flex: "1", maxWidth: "24%" }}>
              <Column
                name="In Progress"
                endpoint="in-progress"
                onRegisterFetchData={(columnName, fetchData) => handleRegisterFetchData(columnName, fetchData)}
                refreshColumns={fetchDataCallbacks}
            />
            </div>
            <div className="custom-scrollbar overflow-auto shadow-lg bg-dark text-white rounded border border-white h4" style={{ flex: "1", maxWidth: "24%" }}>
              <Column
                 name="Ready For Testing"
                 endpoint="in-testing"
                 onRegisterFetchData={(columnName, fetchData) => handleRegisterFetchData(columnName, fetchData)}
                 refreshColumns={fetchDataCallbacks}
              />
            </div>
            <div className="custom-scrollbar overflow-auto shadow-lg bg-dark text-white rounded border border-white h4" style={{ flex: "1", maxWidth: "24%" }}>
              <Column
                 name="Completed"
                 endpoint="in-complete"
                 onRegisterFetchData={(columnName, fetchData) => handleRegisterFetchData(columnName, fetchData)}
                 refreshColumns={fetchDataCallbacks}
              />
            </div>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="modal fade show" style={{ display: "block", backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Create Story</h5>
                <button type="button" className="btn-close" onClick={handleCloseModal}></button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="mb-3">
                    <label htmlFor="storyName" className="form-label">Story Name</label>
                    <input type="text" className="form-control" id="storyName" placeholder="Enter story name" value={storyName} onChange={(e) => setStoryName(e.target.value)} />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="storyDescription" className="form-label">Story Description</label>
                    <textarea className="form-control" id="storyDescription" rows="3" placeholder="Enter story description" value={storyDescription} onChange={(e) => setStoryDescription(e.target.value)}></textarea>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Assigned To</label>
                    <div className="row">
                      <div className="col-6">
                        <input type="text" className="form-control" id="firstName" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                      </div>
                      <div className="col-6">
                        <input type="text" className="form-control" id="lastName" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                      </div>
                    </div>
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>Close</button>
                <button type="button" className="save btn btn-primary" onClick={handleSaveStory}>Save</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
