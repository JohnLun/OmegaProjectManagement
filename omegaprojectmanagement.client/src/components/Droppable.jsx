import React from 'react';

function Droppable({ id, onDrop, children }) {
    const handleDrop = (e) => {
        e.preventDefault();
        const storyId = e.dataTransfer.getData('storyId'); // Retrieve storyId
        if (storyId) {
            onDrop(storyId, id); // Pass storyId and newStatus to onDrop
        } else {
            console.error('No storyId found in drop event.');
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault(); // Allow dropping
    };

    return (
        <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            style={{ minHeight: '200px', border: '2px dashed #ccc', padding: '10px' }}
        >
            {children}
        </div>
    );
}

export default Droppable;
