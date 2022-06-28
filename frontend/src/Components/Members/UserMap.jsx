import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

const UserMap = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:8080//home/");
      setUsers(res.data);
    } catch (err) {
      setError(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      <h1>Membres</h1>
      {loading && <p>Loading...</p>}
      {error && <p>Une erreur est survenue: {error.message}</p>}
      {users.map((user) => (
        <div key={user.id}>
          <h2>{user.firstName}</h2>
          <h2>{user.lastName}</h2>
          <p>{user.email}</p>
        </div>
      ))}
    </div>
  );
};

export default UserMap;
