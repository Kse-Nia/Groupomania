import React, { useState, useContext } from "react";
import "./Profile.scss";
import Alert from "../Alert";
import { handleDelete } from "../../api/users";
import { withRouter } from "react-router-dom";
import { UserContext } from "../Context";
import Loading from "../utils/loading";

// Material UI
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const Profile = ({ history }) => {
  const [success] = useState(false);
  const { profile, handleAlert } = useContext(UserContext);

  const handleDeleteUser = () => {
    handleDelete()
      .then((response) => {
        handleAlert("Cmpte supprimé");
        setTimeout(() => {
          history.push("/");
        }, 5000);
        localStorage.clear();
      })
      .catch((error) => handleAlert(error.response.data.error));
  };

  return (
    <>
      {profile ? (
        <Card sx={{ minWidth: 275 }}>
          <CardContent>
            {success ? <Alert /> : null}
            <div className="card-body">
              <Typography variant="h5" className="card-title">
                Bonjour, {profile.username}
              </Typography>
              <p className="card-info">Votre espace modérateur</p>
            </div>
            <ul className="listGroup">
              <li>Email : {profile.email}</li>
              <li>Username : {profile.username}</li>
              <li className="list-group-item">
                Administrator :{JSON.stringify(profile.isAdmin)}
              </li>
            </ul>
            <div className="card-body">
              <Button
                variant="outlined"
                onClick={handleDeleteUser}
                startIcon={<DeleteIcon />}
              >
                Supprimer le compte
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default withRouter(Profile);
