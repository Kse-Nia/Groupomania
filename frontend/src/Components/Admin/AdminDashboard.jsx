import React from "react";

const AdminDashboard = (props) => {
  const isAdmin = props.isAdmin;

  if (isAdmin) {
    return (
      <div>
        <h1>Page Administrateur Groupomania</h1>
      </div>
    );
  } else {
    return (
      <div>
        <h1>Vous n'avez pas les droits d'accès</h1>
      </div>
    );
  }
};

export default AdminDashboard;
