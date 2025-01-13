import { useEffect, useState } from 'react';
import './Story.css';
import trash3 from "../assets/trash3.svg";
import forward from "../assets/arrow_forward_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg";
import backward from "../assets/arrow_back_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg";

function Story({ story, onDelete, onUpdate, refreshColumns }) {
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

    return (
        <div className="row" key={story.storyId}>
            <div className="col-12">
                <div className="card mb-4">
                    <div className="card-body d-flex flex-column position-relative">
                        <div className="position-absolute top-0 end-0">
                            <button className="btn btn-danger" onClick={handleTrash}>
                                <img src={trash3} alt="trash" width="16" height="16" />
                            </button>
                        </div>
                        <h5 className="card-title">
                            <span className="text-muted me-2">#{story.storyId}</span>
                            {story.storyName}
                        </h5>
                        <p className="card-text">{story.storyDescription}</p>
                        <p className="card-text">
                            <small className="text-muted">
                                {story.firstName} {story.lastName}
                            </small>
                        </p>
                        <div className="mt-auto d-flex justify-content-end">
                            <button className="btn btn-success me-2" onClick={handleMoveLeft}>
                                <img src={backward} alt="left" width="16" height="16" />
                            </button>
                            <button className="btn btn-success" onClick={handleMoveRight}>
                                <img src={forward} alt="right" width="16" height="16" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Story;