// src/components/CourseBuilder.js
import React, { useState } from 'react';
import Module from './Module';
import { FaPlus, FaUpload, FaLink } from 'react-icons/fa'; // Import FaUpload and FaLink
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const CourseBuilder = () => {
  const [modules, setModules] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newModule, setNewModule] = useState({
    name: '',
    resources: []
  });

  const handleAddModuleClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setNewModule({ name: '', resources: [] });
  };

  const handleNameChange = (event) => {
    setNewModule({ ...newModule, name: event.target.value });
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const resource = {
        id: Date.now().toString(),
        name: file.name,
        type: 'file',
        url: URL.createObjectURL(file),
      };
      setNewModule({ ...newModule, resources: [...newModule.resources, resource] });
    }
  };

  const handleAddLink = () => {
    const url = prompt("Enter the URL:");
    if (url) {
      const resource = {
        id: Date.now().toString(),
        name: url,
        type: 'link',
        url: url,
      };
      setNewModule({ ...newModule, resources: [...newModule.resources, resource] });
    }
  };

  const handleSaveModule = () => {
    if (newModule.name) {
      const module = {
        id: Date.now().toString(),
        name: newModule.name,
        resources: newModule.resources
      };
      setModules([...modules, module]);
      handleCloseModal();
    }
  };

  const renameModule = (moduleId, newName) => {
    const updatedModules = modules.map(module =>
      module.id === moduleId ? { ...module, name: newName } : module
    );
    setModules(updatedModules);
  };

  const deleteModule = (moduleId) => {
    const updatedModules = modules.filter(module => module.id !== moduleId);
    setModules(updatedModules);
  };

  const addResource = (moduleId, updatedResources) => {
    const updatedModules = modules.map(module =>
      module.id === moduleId ? { ...module, resources: updatedResources } : module
    );
    setModules(updatedModules);
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const reorderedModules = [...modules];
    const [removed] = reorderedModules.splice(result.source.index, 1);
    reorderedModules.splice(result.destination.index, 0, removed);

    setModules(reorderedModules);
  };

  return (
    <div className="course-builder">
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable-modules">
          {(provided) => (
            <div
              className="modules"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {modules.map((module, index) => (
                <Draggable key={module.id} draggableId={module.id} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <Module
                        key={module.id}
                        module={module}
                        renameModule={renameModule}
                        deleteModule={deleteModule}
                        addResource={addResource}
                      />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <button className="add-module-btn" onClick={handleAddModuleClick}>
        <FaPlus /> Add Module
      </button>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Add New Module</h2>
            <input
              type="text"
              placeholder="Enter module name"
              value={newModule.name}
              onChange={handleNameChange}
            />
            <div className="modal-actions">
              <label className="file-upload">
                <FaUpload /> Upload File
                <input type="file" onChange={handleFileUpload} />
              </label>
              <button onClick={handleAddLink}>
                <FaLink /> Add URL
              </button>
            </div>
            <button className="save-btn" onClick={handleSaveModule}>
              Save Module
            </button>
            <button className="cancel-btn" onClick={handleCloseModal}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseBuilder;
