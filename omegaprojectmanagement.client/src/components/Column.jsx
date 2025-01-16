import { useEffect, useState } from 'react';
import Story from './Story';
import './Column.css';
import Droppable from './Droppable';

function Column({ name, endpoint, onRegisterFetchData, refreshColumns }) {
    const [stories, setStories] = useState([]);

    async function fetchData() {
        const url = `https://localhost:7173/api/${endpoint}`;
        try {
            const response = await fetch(url);
            if (response.ok) {
                const data = await response.json();
                setStories(data);
            } else {
                console.error('Failed to fetch data for:', endpoint);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    async function getStory(id) {
        const url = `https://localhost:7173/api/story/${id}`;
        try {
            const response = await fetch(url);
            if (response.ok) {
                const data = await response.json();
                return data;
            } else {
                return null;
            }
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        fetchData();
        if (onRegisterFetchData) {
            onRegisterFetchData(name, fetchData);
        }
    }, [endpoint]);

    const handleDrop = async (storyId, newStatus) => {
      console.log(`Dropping storyId: ${storyId} into column: ${newStatus}`);
      const url = `https://localhost:7173/api/story`;
  
      try {
          // Fetch the story details from the API
          const story = await getStory(storyId);
  
          if (!story) {
              console.error(`Story with ID ${storyId} not found.`);
              return;
          }
  
          // Prepare the updated story with the new status
          const updatedStory = {
              ...story,
              statusName: newStatus, // Update only the statusName
          };
  
          // Send the update to the API
          const response = await fetch(url, {
              method: 'PATCH',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(updatedStory),
          });
  
          if (response.ok) {
              console.log(`Story moved to ${newStatus}`);
              // Optimistically update the local state
              setStories((prevStories) => prevStories.filter((s) => s.storyId !== storyId));
              refreshColumns[newStatus]?.(); // Refresh the destination column
              refreshColumns["Backlog"]?.();
              refreshColumns["In Progress"]?.();
              refreshColumns["Ready For Testing"]?.();
              refreshColumns["Completed"]?.();
          } else {
              const errorResponse = await response.json();
              console.error('Failed to update story status:', errorResponse);
          }
      } catch (error) {
          console.error('Error updating story:', error);
      }
  };
  
    

    return (
        <Droppable id={name} onDrop={handleDrop}>
            <div className="row p-2 bg-dark justify-content-center sticky-top text-light">
                {name}
            </div>
            {stories.map((story) => (
                <Story
                    key={story.storyId}
                    story={story}
                    refreshColumns={refreshColumns}
                />
            ))}
        </Droppable>
    );
}

export default Column;
