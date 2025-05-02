// SettingsModal.jsx
import React from "react";
import "./modalStyle.css"; 
const SettingsModal = ({
  isOpen,
  onClose,
  editInfo,
  setEditInfo,
  handleSaveChanges
}) => {
  // If modal isn't open, render nothing
  if (!isOpen) return null;

  return (
    <div className="settings-modal-overlay">
      <div className="settings-modal">
        <h2>Edit Personal Information</h2>

        <form onSubmit={handleSaveChanges}>
          <label>
            Name:
            <input
              type="text"
              value={editInfo.name}
              onChange={(e) =>
                setEditInfo({ ...editInfo, name: e.target.value })
              }
            />
          </label>

          <label>
            Contact:
            <input
              type="text"
              value={editInfo.contact}
              onChange={(e) =>
                setEditInfo({ ...editInfo, contact: e.target.value })
              }
            />
          </label>

          <label>
            Company:
            <input
              type="text"
              value={editInfo.company}
              onChange={(e) =>
                setEditInfo({ ...editInfo, company: e.target.value })
              }
            />
          </label>

          <label>
            Address:
            <input
              type="text"
              value={editInfo.address}
              onChange={(e) =>
                setEditInfo({ ...editInfo, address: e.target.value })
              }
            />
          </label>

          <label>
            City:
            <input
              type="text"
              value={editInfo.city}
              onChange={(e) =>
                setEditInfo({ ...editInfo, city: e.target.value })
              }
            />
          </label>

          <div className="settings-modal-buttons">
          <button
            type="button"
            className="gradient-button"
            onClick={onClose}
          >
             Cancel
          </button>

        <button
            type="submit"
            className="gradient-button"
        >
             Save
        </button>

          </div>
        </form>
      </div>
    </div>
  );
};

export default SettingsModal;
