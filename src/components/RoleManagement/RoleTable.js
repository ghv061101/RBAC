import React, { useState, useEffect } from "react";

function RoleTable() {
  const [roles, setRoles] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingRole, setEditingRole] = useState(null);
  const [error, setError] = useState("");

  // Load roles from localStorage
  useEffect(() => {
    const savedRoles = JSON.parse(localStorage.getItem("roles")) || [];
    setRoles(savedRoles);
  }, []);

  // Save roles to localStorage
  useEffect(() => {
    localStorage.setItem("roles", JSON.stringify(roles));
  }, [roles]);

  // Handle Add/Edit Role
  const handleSaveRole = (role) => {
    if (!role.name || role.permissions.length === 0) {
      setError("Role name and permissions are required.");
      return;
    }

    if (editingRole) {
      setRoles((prev) =>
        prev.map((r) => (r.id === editingRole.id ? { ...role, id: r.id } : r))
      );
      setEditingRole(null);
    } else {
      setRoles((prev) => [...prev, { ...role, id: Date.now() }]);
    }
    setShowForm(false);
    setError(""); // Clear error on successful save
  };

  // Handle Delete Role
  const handleDelete = (id) => {
    const newRoles = roles.filter((r) => r.id !== id);
    setRoles(newRoles);
  };

  return (
    <div className="container my-5">
      <div className="card p-4">
        {/* Header Section */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="h4">Role Management</h2>
          <button
            className="btn btn-primary"
            onClick={() => setShowForm(true)}
          >
            {editingRole ? "Edit Role" : "Add Role"}
          </button>
        </div>

        {/* Error Display */}
        {error && (
          <div className="alert alert-danger">
            <strong>Error:</strong> {error}
          </div>
        )}

        {/* Roles Table */}
        <div className="table-responsive">
          <table className="table table-striped table-bordered">
            <thead className="table-dark">
              <tr>
                <th>Role Name</th>
                <th>Permissions</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {roles.map((role, index) => (
                <tr key={role.id}>
                  <td>{role.name}</td>
                  <td>{role.permissions.join(", ")}</td>
                  <td>
                    <button
                      className="btn btn-warning btn-sm"
                      onClick={() => {
                        setEditingRole(role);
                        setShowForm(true);
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger btn-sm ms-2"
                      onClick={() => handleDelete(role.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Role Form */}
        {showForm && (
          <RoleForm
            onClose={() => {
              setEditingRole(null);
              setShowForm(false);
            }}
            onSave={handleSaveRole}
            role={editingRole}
            error={error}
          />
        )}
      </div>
    </div>
  );
}

function RoleForm({ onClose, onSave, role, error }) {
  const predefinedPermissions = ["Read", "Write", "Delete"];
  const [name, setName] = useState(role?.name || "");
  const [permissions, setPermissions] = useState(role?.permissions || []);
  const [formError, setFormError] = useState("");

  const handleTogglePermission = (permission) => {
    setPermissions((prev) =>
      prev.includes(permission)
        ? prev.filter((p) => p !== permission)
        : [...prev, permission]
    );
  };

  const handleSubmit = () => {
    if (!name || permissions.length === 0) {
      setFormError("Role name and at least one permission are required.");
      return;
    }

    onSave({ name, permissions });
    setFormError(""); // Clear form-specific error on successful submit
  };

  return (
    <div className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50 d-flex justify-content-center align-items-center">
      <div className="card p-4 w-75">
        <h3>{role ? "Edit Role" : "Add Role"}</h3>
        <input
          type="text"
          placeholder="Role Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="form-control mb-3"
        />
        <div className="mb-4">
          <label className="form-label">Permissions</label>
          <div className="form-check">
            {predefinedPermissions.map((permission) => (
              <div key={permission} className="form-check">
                <input
                  type="checkbox"
                  checked={permissions.includes(permission)}
                  onChange={() => handleTogglePermission(permission)}
                  className="form-check-input"
                />
                <label className="form-check-label">{permission}</label>
              </div>
            ))}
          </div>
        </div>

        {/* Error Display */}
        {formError && (
          <div className="alert alert-danger">
            <strong>Error:</strong> {formError}
          </div>
        )}

        <div className="d-flex justify-content-end gap-2">
          <button className="btn btn-secondary" onClick={onClose}>
            Cancel
          </button>
          <button className="btn btn-success" onClick={handleSubmit}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default RoleTable;
