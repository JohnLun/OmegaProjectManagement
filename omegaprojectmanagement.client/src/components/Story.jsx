import { useEffect, useState } from 'react';
import { Draggable } from "react-beautiful-dnd";
import './Story.css';

function Story({story}){


    return (
        <div className="row" key={story.storyId}>
            <div className="col-12">
                <div className="card mb-4"> {/* Add margin-bottom to space out the cards */}
                    <div className="card-body">
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