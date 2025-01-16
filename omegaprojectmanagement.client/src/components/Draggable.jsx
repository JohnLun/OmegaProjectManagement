import React from 'react';

function Draggable({ id, children }) {
    const handleDragStart = (e) => {
        console.log(`Dragging storyId: ${id}`);
        e.dataTransfer.setData('storyId', id); // Attach storyId to drag event
    };

    return (
        <div
            draggable
            onDragStart={handleDragStart}
            style={{ cursor: 'grab' }}
        >
            {children}
        </div>
    );
}

export default Draggable;
