import { useEffect, useState } from 'react';
//import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import Column from "./Column";
import './App.css';

function App() {

    return (
        <div className="container mt-5">
            <h1 className="header">Omega PM</h1>

            <div className="flex-container">
                <Column name="Backlog"></Column>
                <Column name="In Progress"></Column>
                <Column name="Testing"></Column>
                <Column name="Completed"></Column>
            </div>
            
            

        </div>
    );
    
}

export default App;