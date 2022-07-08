import React, {
  useContext,
  useEffect,
  useState,
  useCallback,
  useMemo,
} from "react"; // useMemo hook; permet création d'un tableau de valeurs qui ne sera pas recalculé à chaque modification de la valeur
import axios from "axios";
import { AuthContext } from "../../App";
import ProfileAvatar from "../Profile/ProfileAvatar";

// CSS
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { Oval } from "react-loader-spinner";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import SearchIcon from "@mui/icons-material/Search";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Card } from "@mui/material";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";

const Users = () => {
  const { AuthState } = useContext(AuthContext);
  const reactSwal = withReactContent(Swal);
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState(users);

  const getUsers = useCallback(() => {
    axios({
      method: "get",
      url: "http://localhost:8080/home/",
      headers: { Authorization: `Bearer ${AuthState.token}` },
    }).then((res) => {
      setUsers(res.data);
      setLoading(false);
    });
  }, [AuthState.token]);
  const handleResearch = useCallback(
    (value) => {
      let result = users.filter((user) => {
        if (
          user.firstName.search(value) !== -1 ||
          user.lastName.search(value) !== -1
        )
          return true;
        else return false;
      });
      setFilteredUsers(result);
    },
    [users]
  );

  // Partie Admin: suppression User
  const deleteUser = useCallback(
    (email) => {
      axios({
        method: "delete",
        url: "http://localhost:8080/home/",
        headers: { Authorization: `Bearer ${AuthState.token}` },
      })
        .then((res) => {
          if (res.status === 200) {
            getUsers();
            console.log("Compte supprimé");
          }
        })
        .catch(function(error) {
          if (error.response) {
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
          } else if (error.request) {
            console.log(error.request);
          } else {
            console.log("Error", error.message);
          }
        });
    },
    [AuthState.token, getUsers]
  );

  // Render Users
  const initialMembersRender = useMemo(() => {
    return (
      <div>
        <Container
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography variant="h4">Utilisateurs inscrits</Typography>
          <Paper
            component="form"
            sx={{
              p: "2px 4px",
              display: "flex",
              alignItems: "center",
              width: 400,
            }}
          >
            {" "}
            <SearchIcon />
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              type="text"
              onChange={(event) => handleResearch(event.target.value)}
              className="search_input"
              placeholder="Recherche"
            ></InputBase>
          </Paper>
          <ul>
            {filteredUsers.map((user, index) => (
              <Container key={index}>
                <li>
                  <Button
                    className="btn"
                    onClick={() =>
                      setMembersRender(
                        <MemberProfile
                          user={user}
                          setMembersRender={setMembersRender}
                          initialMembersRender={initialMembersRender}
                        />
                      )
                    }
                  >
                    <Card>
                      <ProfileAvatar
                        photo={user.imageUrl}
                        className="user_avatar"
                      />
                      <Typography>Prénom: {user.firstName}</Typography>
                      <Typography>Nom: {user.lastName}</Typography>
                    </Card>
                  </Button>
                  {AuthState.isAdmin === true ? (
                    <Button
                      type="button"
                      className="btn"
                      onClick={() => {
                        reactSwal
                          .fire({
                            title:
                              "Valider la suppression de cet utilisateur ?",
                            showCancelButton: true,
                            confirmButtonText: "Valider",
                            cancelButtonText: "Annuler",
                            buttonsStyling: false,
                            customClass: {
                              confirmButton: "btn",
                              cancelButton: "btn",
                              title: "h4 font",
                              popup: "card",
                            },
                          })
                          .then((result) => {
                            if (result.isConfirmed) {
                              deleteUser(user.email);
                            } else return;
                          });
                      }}
                    ></Button>
                  ) : null}
                </li>
              </Container>
            ))}
          </ul>
        </Container>
      </div>
    );
  }, [AuthState.isAdmin, AuthState.firstName, filteredUsers, handleResearch]);

  const [membersRender, setMembersRender] = useState(initialMembersRender);

  // Get Users
  useEffect(() => {
    setMembersRender(initialMembersRender);
  }, [filteredUsers, initialMembersRender]);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  if (loading === true)
    return (
      <div>
        <Oval
          ariaLabel="loading-indicator"
          height={100}
          width={100}
          strokeWidth={5}
          strokeWidthSecondary={1}
          color="blue"
          secondaryColor="white"
        />
      </div>
    );
  else return membersRender;
};

//User Profile
function MemberProfile(props) {
  return (
    <div>
      <Card
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          margin: "1em",
        }}
      >
        <Box
          sx={{
            m: 2,
          }}
        >
          <ProfileAvatar photo={props.user.imageUrl} />
          <div>{props.user.email}</div>
          <div>
            {props.user.firstName} {props.user.lastName}
          </div>
        </Box>
        <Button
          variant="outlined"
          size="small"
          onClick={() => {
            props.setMembersRender(props.initialMembersRender);
          }}
        >
          Retour
        </Button>
      </Card>
    </div>
  );
}

export default Users;
