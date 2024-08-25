// src/components/Resource.js
import React, { useState } from 'react';
import { FaTrash, FaEdit } from 'react-icons/fa';

const Resource = ({ resource, deleteResource, editResource }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [resourceName, setResourceName] = useState(resource.name);

  const handleEdit = () => {
    editResource(resource.id, resourceName);
    setIsEditing(false);
  };

  return (
    <div className="resource">
      {isEditing ? (
        <input
          type="text"
          value={resourceName}
          onChange={(e) => setResourceName(e.target.value)}
          onBlur={handleEdit}
        />
      ) : resource.type === 'image' ? (
        <img src={resource.url} alt={resource.name} />
      ) : resource.type === 'file' ? (
        <a href={resource.url} download>{resource.name}</a>
      ) : (
        <a href={resource.url} target="_blank" rel="noopener noreferrer">{resource.name}</a>
      )}
      <div>
        <button onClick={() => setIsEditing(true)}><FaEdit /></button>
        <button onClick={deleteResource}><FaTrash /></button>
      </div>
    </div>
  );
};

export default Resource;
