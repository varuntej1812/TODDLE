// src/components/Module.js
import React, { useState } from 'react';
import Resource from './Resource';
import { FaTrash, FaEdit, FaUpload, FaLink } from 'react-icons/fa';

const Module = ({ module, addResource, renameModule, deleteModule }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [moduleName, setModuleName] = useState(module.name);

  const handleRename = () => {
    renameModule(module.id, moduleName);
    setIsEditing(false);
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const resource = {
        id: Date.now(),
        name: file.name,
        type: file.type.startsWith('image/') ? 'image' : 'file',
        url: URL.createObjectURL(file),
      };
      const updatedResources = [...module.resources, resource];
      addResource(module.id, updatedResources);
    }
  };

  const handleAddLink = () => {
    const url = prompt("Enter the URL:");
    if (url) {
      const resource = {
        id: Date.now(),
        name: url,
        type: 'link',
        url: url,
      };
      const updatedResources = [...module.resources, resource];
      addResource(module.id, updatedResources);
    }
  };

  const deleteResource = (resourceId) => {
    const updatedResources = module.resources.filter(resource => resource.id !== resourceId);
    addResource(module.id, updatedResources);
  };

  const editResource = (resourceId, newName) => {
    const updatedResources = module.resources.map(resource =>
      resource.id === resourceId ? { ...resource, name: newName } : resource
    );
    addResource(module.id, updatedResources);
  };

  return (
    <div className="module">
      <div className="module-header">
        {isEditing ? (
          <input
            type="text"
            value={moduleName}
            onChange={(e) => setModuleName(e.target.value)}
            onBlur={handleRename}
          />
        ) : (
          <h2>{module.name}</h2>
        )}
        <button onClick={() => setIsEditing(!isEditing)}>
          <FaEdit />
        </button>
        <button onClick={() => deleteModule(module.id)}>
          <FaTrash />
        </button>
      </div>
      <div className="resources">
        {module.resources.map(resource => (
          <Resource
            key={resource.id}
            resource={resource}
            deleteResource={() => deleteResource(resource.id)}
            editResource={editResource}
          />
        ))}
      </div>
      <div className="module-actions">
        <label className="file-upload">
          <FaUpload /> Upload File
          <input type="file" onChange={handleFileUpload} />
        </label>
        <button onClick={handleAddLink}>
          <FaLink /> Add URL
        </button>
      </div>
    </div>
  );
};

export default Module;
