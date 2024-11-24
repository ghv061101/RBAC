import React, { useState } from "react";

function RoleForm({ onClose, onAdd }) {
  const [name, setName] = useState("");
  const [permissions, setPermissions] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) {
      alert("Role name is required!");
      return;
    }
    onAdd({ id: Date.now(), name, permissions });
    onClose();
  };

  const handlePermissionChange = (e) => {
    const value = e.target.value;
    setPermissions((prev) =>
      prev.includes(value) ? prev.filter((p) => p !== value) : [...prev, value]
    );
  };

  return (
    <div className="fixed inset-0 d-flex justify-content-center align-items-center bg-dark bg-opacity-50">
      <div className="bg-white rounded p-4 shadow-lg w-100 w-md-50">
        <h3 className="h4 mb-4">Add Role</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Role Name</label>
            <input
              type="text"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter role name"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Permissions</label>
            <div className="d-flex flex-wrap gap-3">
              {["Read", "Write", "Delete"].map((perm) => (
                <div key={perm} className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    value={perm}
                    onChange={handlePermissionChange}
                  />
                  <label className="form-check-label">{perm}</label>
                </div>
              ))}
            </div>
          </div>
          <div className="d-flex justify-content-end gap-2">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-success"
            >
              Save Role
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RoleForm;
