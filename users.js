import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const { data } = await axios.get('http://localhost:4000/api/users');
      setUsers(data);
    };

    fetchUsers();
  }, []);

  const toggleAccount = async (userId, active) => {
    await axios.post(`http://localhost:4000/api/users/${userId}/toggle`, { active });
    setUsers((prevUsers) =>
      prevUsers.map((user) => (user.id === userId ? { ...user, active: !active } : user))
    );
  };

  return (
    <div>
      <h1>User Management</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Email</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.active ? 'Active' : 'Inactive'}</td>
              <td>
                <button onClick={() => toggleAccount(user.id, user.active)}>
                  {user.active ? 'Deactivate' : 'Activate'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
