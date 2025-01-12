import { useEffect, useState } from 'react';
//import axios from "axios";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Story from "./Story";
import './Column.css';

function Column({ name, endpoint, onStorySaved }) {
    const [stories, setStories] = useState(
        [{
            firstName: "",
            lastName: "",
            statusName: "",
            storyDescription: "",
            storyId: -1,
            storyName: ""
        }]);

    async function fetchColumn() {
        const url = `https://localhost:7173/api/${endpoint}`;
        try {
            const response = await fetch(url);
            if(response.ok){
                return response.json();
            } else {
                console.error("Couldn't fetch data for: ", endpoint);
            }
        } catch (error) {
            console.error(error);
        }
        
    }

    async function fetchData() {
        const res = await fetchColumn(); // Wait for fetchColumn to resolve
        setStories(res);
    }

    useEffect(()=> {
        fetchData();
    }, [endpoint]);

    useEffect(() => {
    }, [stories]);

    useEffect(() => {
        fetchData(); // Pass the fetchData function to the parent
    }, [onStorySaved]);

    const handleDeleteStory = () => {
        fetchData();
    };
    

    return (
        <>
            <div className="row">{name}</div>
            
            {stories.map((story) => (
                <Story story={story} onDelete={handleDeleteStory}></Story>
            ))}
        </>
    );
}

export default Column;