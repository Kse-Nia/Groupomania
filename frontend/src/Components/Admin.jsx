import { Link } from "react-router-dom";

const Admin = () => {
  return (
    <section>
      <h1>Page Administrateur Groupomania</h1>
      <p>Vous devez être l'administrateur du site</p>
      <div className="flexGrow">
        <Link to="/">Home</Link>
      </div>
    </section>
  );
};

export default Admin;
