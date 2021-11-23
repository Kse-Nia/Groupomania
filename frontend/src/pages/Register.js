import React from "react";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { Card } from "@nextui-org/react";
import { Input } from "@nextui-org/react";
import { Grid } from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import { Spacer } from "@nextui-org/react";
import { Text } from "@nextui-org/react";

import "./pages.css";

function Register() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);

  return (
    <div className="wrapcontainer">
      <Card className="Card" width="60%">
        <Text h1>Groupomania</Text>
        <Text h2>Créer un nouveau compte</Text>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            rounded
            bordered
            className="form-control"
            id="username"
            type="text"
            label="Pseudo"
            placeholder="Entrez un pseudo"
            name="username"
            defaultValue="username"
            {...register("username", {
              required: "Required",
            })}
          />
          <Spacer y={1} />
          <Grid>
            <Input
              rounded
              bordered
              label="Mot de passe"
              type="password"
              placeholder="Entrez un mot de passe"
            />
          </Grid>
          <input
            className="validationbutton"
            type="submit"
            value="S'inscrire"
          />
        </form>
      </Card>
    </div>
  );
}

export default Register;
