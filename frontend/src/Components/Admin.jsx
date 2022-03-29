import { Link } from "react-router-dom";

const Admin = () => {
  return (
    <section>
      <h1>Page Administrateur Groupomania</h1>
      <p>You must have been assigned an Admin role.</p>
      <div className="flexGrow">
        <Link to="/">Home</Link>
      </div>
    </section>
  );
};

export default Admin;
