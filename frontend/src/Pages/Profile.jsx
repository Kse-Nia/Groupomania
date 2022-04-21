import Error from "../Assets/404.svg";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

function Profil({ props }) {
  let firstName = localStorage.getItem("firstName");
  let lastName = localStorage.getItem("lastName");
  /*   let userAvatar = localStorage.getItem("userPhoto"); */

  return firstname ? (
    <div className="container">
      <div className="profile">
        <h5 className="name">
          Bonjour {firstName} {lastName}
        </h5>
      </div>
      <div>
        <div>
          <Button
            size="medium"
            onClick={() => {
              props.history.push("/post");
            }}
            type="submit"
            className="btn"
          >
            Poster
          </Button>
        </div>
        <div>
          <Button
            onClick={() => {
              props.history.push("/editprofil");
            }}
            type="submit"
          >
            Modifier son profil
          </Button>
        </div>
      </div>
    </div>
  ) : (
    <div>
      <img src={Error} className="picture Error" alt="error message"></img>
    </div>
  );
}

export default Profil;
