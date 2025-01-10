import { useEffect, useState } from 'react';
//import axios from "axios";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Story from "./Story";
import './Column.css';

function Column({ name, endpoint }) {
    const [stories, setStories] = useState(
        [{
            firstName: "",
            lastName: "",
            statusName: "",
            storyDescription: "",
            storyId: -1,
            storyName: ""
        }]);
    useEffect(()=> {
        async function fetchColumn() {
            const url = `https://localhost:7173/api/${endpoint}`;
            const response = await fetch(url);
            if(response.status == 200){
                return response.json();
            }
        }

        async function fetchData() {
            const res = await fetchColumn(); // Wait for fetchColumn to resolve
            setStories(res);
        }
        fetchData();
    }, [endpoint]);

    useEffect(() => {
        console.log(stories); // This will log the updated state after it changes
    }, [stories]);

    

    return (
        <>
            <div className="row">{name}</div>
            
            {stories.map((story) => (
                <div className="row" key={story.storyId}>
                    <div className="col-12">
                        <div className="card mb-4"> {/* Add margin-bottom to space out the cards */}
                            <div className="card-body">
                                <h5 className="card-title">{story.storyName}</h5>
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
            ))}
        </>
    );
    // State for the columns and stories
//     const [columns, setColumns] = useState({
//         backlog: {
//             name: "Backlog",
//             items: [{ id: "1", content: "Story 1" }, { id: "2", content: "Story 2" }],
//         },
//         inProgress: {
//             name: "In Progress",
//             items: [{ id: "3", content: "Story 3" }],
//         },
//         testing: {
//             name: "Testing",
//             items: [{ id: "4", content: "Story 4" }],
//         },
//         completed: {
//             name: "Completed",
//             items: [],
//         },
//     });

//     // Function to handle drag events
//     const onDragEnd = (result) => {
//         const { source, destination } = result;

//         // If dropped outside a column
//         if (!destination) return;

//         // If dropped in the same column
//         if (source.droppableId === destination.droppableId) {
//             const column = columns[source.droppableId];
//             const copiedItems = [...column.items];
//             const [removed] = copiedItems.splice(source.index, 1);
//             copiedItems.splice(destination.index, 0, removed);

//             setColumns({
//                 ...columns,
//                 [source.droppableId]: {
//                     ...column,
//                     items: copiedItems,
//                 },
//             });
//         } else {
//             // If dropped in a different column
//             const sourceColumn = columns[source.droppableId];
//             const destColumn = columns[destination.droppableId];
//             const sourceItems = [...sourceColumn.items];
//             const destItems = [...destColumn.items];
//             const [removed] = sourceItems.splice(source.index, 1);
//             destItems.splice(destination.index, 0, removed);

//             setColumns({
//                 ...columns,
//                 [source.droppableId]: {
//                     ...sourceColumn,
//                     items: sourceItems,
//                 },
//                 [destination.droppableId]: {
//                     ...destColumn,
//                     items: destItems,
//                 },
//             });
//         }
//     };

//    return (
//            <DragDropContext onDragEnd={onDragEnd}>
//                <div className="container">
//                    {Object.entries(columns).map(([id, column]) => (
//                        <Droppable droppableId={id} key={id}>
//                            {(provided) => (
//                                <div
//                                    className="column"
//                                    {...provided.droppableProps}
//                                    ref={provided.innerRef}
//                                >
//                                    <h2 className="column-title">{column.name}</h2>
//                                    {column.items.map((item, index) => (
//                                        <Draggable key={item.id} draggableId={item.id} index={index}>
//                                        {(provided) => (
//                                            <div
//                                                className="item"
//                                                ref={provided.innerRef}
//                                                {...provided.draggableProps}
//                                                {...provided.dragHandleProps}
//                                            >
//                                                {item.content}
//                                            </div>
//                                        )}
//                                    </Draggable>
//                                    ))}
//                                    {provided.placeholder}
//                                </div>
//                            )}
//                        </Droppable>
//                    ))}
//                </div>
//            </DragDropContext>
//        );
}

export default Column;