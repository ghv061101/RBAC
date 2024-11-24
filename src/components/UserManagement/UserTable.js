import React, { useState, useEffect } from "react";
import UserForm from "./UserForm";

function UserTable() {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  // Load users and roles from localStorage
  useEffect(() => {
    const savedUsers = JSON.parse(localStorage.getItem("users")) || [];
    const savedRoles = JSON.parse(localStorage.getItem("roles")) || [];
    setUsers(savedUsers);
    setRoles(savedRoles);
  }, []);

  // Save users to localStorage
  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);

  // Handle Add/Edit User
  const handleSaveUser = (user) => {
    if (editingUser) {
      setUsers((prev) =>
        prev.map((u) => (u.id === editingUser.id ? { ...user, id: u.id } : u))
      );
      setEditingUser(null);
    } else {
      setUsers((prev) => [...prev, { ...user, id: Date.now() }]);
    }
    setShowForm(false);
  };

  // Handle Delete User
  const handleDelete = (id) => {
    setUsers((prev) => prev.filter((u) => u.id !== id));
  };

  return (
    <div className="container py-5">
      <div className="card shadow-lg rounded">
        {/* Header Section */}
        <div className="card-header d-flex justify-content-between align-items-center">
          <h2 className="h4 mb-0">User Management</h2>
          <button
            className="btn btn-primary"
            onClick={() => setShowForm(true)}
          >
            {editingUser ? "Edit User" : "Add User"}
          </button>
        </div>

        {/* Users Table */}
        <div className="table-responsive">
          <table className="table table-bordered table-hover">
            <thead className="table-dark">
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={user.id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>{user.active ? "Active" : "Inactive"}</td>
                  <td>
                    <button
                      className="btn btn-success btn-sm me-2"
                      onClick={() => {
                        setEditingUser(user);
                        setShowForm(true);
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(user.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* User Form */}
        {showForm && (
          <UserForm
            onClose={() => {
              setEditingUser(null);
              setShowForm(false);
            }}
            onSave={handleSaveUser}
            roles={roles}
            user={editingUser}
          />
        )}
      </div>
    </div>
  );
}

export default UserTable;
