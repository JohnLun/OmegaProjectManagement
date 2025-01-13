import { useEffect, useState } from 'react';
import Story from "./Story";
import './Column.css';

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
                console.error("Failed to fetch data for:", endpoint);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    useEffect(() => {
        fetchData();
        if (onRegisterFetchData) {
            onRegisterFetchData(name, fetchData);
        }
    }, [endpoint]);

    const handleDeleteStory = () => {
        fetchData();
    };

    const handleUpdateStory = () => {
        fetchData();
    };

    return (
        <>
            <div className="row p-2 bg-dark justify-content-center sticky-top">{name}</div>
            {stories.map((story) => (
                <Story
                    key={story.storyId}
                    story={story}
                    onDelete={handleDeleteStory}
                    onUpdate={handleUpdateStory}
                    refreshColumns={refreshColumns} // Pass the refreshColumns prop to Story
                />
            ))}



        </>
    );
}

export default Column;
