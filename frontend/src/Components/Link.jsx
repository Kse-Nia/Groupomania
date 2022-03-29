import { Link } from "react-router-dom";

const LinkPage = () => {
  return (
    <section>
      <h2>Public</h2>
      <Link to="/login">Se connecter</Link>
      <Link to="/register">S'inscrire</Link>
      <br />
      <h2>Privé</h2>
      <Link to="/">Accueil</Link>
      <Link to="/editor">Editors Page</Link>
      <Link to="/admin">Page Administrateur</Link>
    </section>
  );
};

export default LinkPage;
