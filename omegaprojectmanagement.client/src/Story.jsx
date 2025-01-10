import { useEffect, useState } from 'react';
import { Draggable } from "react-beautiful-dnd";
import './Story.css';

function Story(){


    return (
        <Draggable key={item.id} draggableId={item.id} index={index}>
            {(provided) => (
                <div
                    className="item"
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                >
                    {item.content}
                </div>
            )}
        </Draggable>

    );
}

export default Story;