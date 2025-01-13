import { useEffect, useState } from 'react';
import './Story.css';
import trash3 from "../assets/trash3.svg";
import forward from "../assets/arrow-forward.svg";
import backward from "../assets/arrow-backward.svg";
import user from "../assets/user.svg";

function Story({ story, onDelete, onUpdate, refreshColumns, onClick }) {
    const [showModal, setShowModal] = useState(false);
    const [storyName, setStoryName] = useState(story.storyName);
    const [storyDescription, setStoryDescription] = useState(story.storyDescription);
    const [firstName, setFirstName] = useState(story.firstName);
    const [lastName, setLastName] = useState(story.lastName);

    async function handleTrash() {
        const url = `https://localhost:7173/api/story/${story.storyId}`;
        try {
            const response = await fetch(url, { method: 'DELETE' });
            if (response.ok) {
                console.log(`Story with ID ${story.storyId} deleted successfully.`);
                onDelete();
            } else {
                console.error(`Failed to delete story. Status: ${response.status}`);
            }
        } catch (error) {
            console.error('Error deleting story:', error);
        }
    }

    async function moveStory(newStatus) {
        const url = `https://localhost:7173/api/story`;
        const updatedStory = { ...story, statusName: newStatus };

        try {
            const response = await fetch(url, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedStory),
            });

            if (response.ok) {
                console.log(`Story moved to ${newStatus}`);
                refreshColumns[story.statusName]?.(); // Refresh source column
                refreshColumns[newStatus]?.(); // Refresh destination column
            } else {
                console.error('Failed to update story status.');
            }
        } catch (error) {
            console.error('Error updating story:', error);
        }
    }

    function handleMoveRight() {
        const nextStatus = {
            Backlog: 'In Progress',
            'In Progress': 'Ready For Testing',
            'Ready For Testing': 'Completed',
            Completed: 'Completed',
        }[story.statusName];
        moveStory(nextStatus);
    }

    function handleMoveLeft() {
        const previousStatus = {
            Backlog: 'Backlog',
            'In Progress': 'Backlog',
            'Ready For Testing': 'In Progress',
            Completed: 'Ready For Testing',
        }[story.statusName];
        moveStory(previousStatus);
    }

    const handleStoryClick = () => {
        setShowModal(true);
    }

    const handleCloseModal = () => {
        setShowModal(false);
    }

    async function saveStory () {
        const url = `https://localhost:7173/api/story`;
        const updatedStory = {
            storyId: story.storyId,
            storyName,
            storyDescription,
            firstName,
            lastName,
            statusName: story.statusName
        }

        try {
            const response = await fetch(url, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedStory),
            });

            if (response.ok) {
                console.log(`Story saved`);
                refreshColumns[story.statusName]?.(); // Refresh source column
                //refreshColumns[newStatus]?.(); // Refresh destination column
            } else {
                console.error('Failed to update story');
            }
        } catch (error) {
            console.error('Error updating story:', error);
        }
    }

    const handleSaveStory = () => {
        setShowModal(false);
        saveStory();
    }


    return (
        <>
            <div 
                className="card"
                key={story.storyId} 
                onClick={handleStoryClick}
            >
                <div className="card-head">
                    <span>{story.storyId}.</span>
                    <span><b>{story.storyName}</b></span>
                </div>
                <p className="card-desc text-truncate">{story.storyDescription}</p>
                <div className="card-user">
                    <img src={user} draggable="false" />
                    <p>{story.firstName} {story.lastName}</p>
                </div>
                <div className="card-btns">
                    <button className="arrow-btn" onClick={(e) => { 
                        e.stopPropagation(); 
                        handleMoveLeft(); 
                    }}>
                        <img src={backward} draggable="false" width="16" height="16" />
                    </button>

                    <button className="delete-btn" onClick={(e) => { 
                        e.stopPropagation(); 
                        handleTrash(); 
                    }}>
                        <img src={trash3} draggable="false" width="16" height="16" />
                    </button>

                    <button className="arrow-btn" onClick={(e) => { 
                        e.stopPropagation(); 
                        handleMoveRight(); 
                    }}>
                        <img src={forward} draggable="false" width="16" height="16" />
                    </button>
                </div>
            </div>

            {showModal && (
                <div className="modal fade show" style={{ display: "block", backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
                <div className="modal-dialog">
                    <div className="modal-content">
                    <div className="modal-header text-dark">
                        <h5 className="modal-title">Edit Story</h5>
                        <button type="button" className="btn-close" onClick={handleCloseModal}></button>
                    </div>
                    <div className="modal-body">
                        <form>
                        <div className="mb-3 text-dark">
                            <label htmlFor="storyName" className="form-label">Story Name</label>
                            <input type="text" className="form-control" id="storyName" placeholder="Enter story name" value={storyName} onChange={(e) => setStoryName(e.target.value)} />
                        </div>
                        <div className="mb-3 text-dark">
                            <label htmlFor="storyDescription" className="form-label">Story Description</label>
                            <textarea className="form-control" id="storyDescription" rows="3" placeholder="Enter story description" value={storyDescription} onChange={(e) => setStoryDescription(e.target.value)}></textarea>
                        </div>
                        <div className="mb-3 text-dark">
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
                        <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>Cancel</button>
                        <button type="button" className="btn btn-primary" onClick={handleSaveStory}>Save</button>
                    </div>
                    </div>
                </div>
                </div>
            )}
        </>
        
    );
}

export default Story;
