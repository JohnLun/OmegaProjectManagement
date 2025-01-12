import { useEffect, useState } from 'react';
import { Draggable } from "react-beautiful-dnd";
import './Story.css';
import trash3 from "../assets/trash3.svg";


function Story({story, onDelete}){

    async function handleTrash() {
        const url = `https://localhost:7173/api/story/${story.storyId}`;
        try {
            const response = await fetch(url, {
                method: 'DELETE',
            });
    
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



    return (
        <div className="row" key={story.storyId}>
            <div className="col-12">
                <div className="card mb-4"> {/* Add margin-bottom to space out the cards */}
                    <div className="card-body">    
                        <div className="position-absolute top-0 end-0">
                            <button className=" btn btn-danger">
                                <img src={trash3} alt="trash" width="16" height="16" onClick={handleTrash}/>
                            </button>
                        </div>
                        <h5 className="card-title d-flex align-items-center">
                            <span className="text-muted me-2">#{story.storyId}</span>
                            {story.storyName}
                        </h5>
                        <p className="card-text">{story.storyDescription}</p>
                        <p className="card-text">
                            <small className="text-muted">
                                {story.firstName} {story.lastName}
                            </small>
                        </p>
                    </div>
                </div>
            </div>
        </div>


    );
}

export default Story;