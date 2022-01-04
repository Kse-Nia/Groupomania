import React, { useEffect, useState } from "react";
import Axios from "axios";
import { Card } from "@nextui-org/react";
import { Input } from "@nextui-org/react";
import { Grid } from "@nextui-org/react";
import { Spacer } from "@nextui-org/react";
import { Text } from "@nextui-org/react";
import { Button } from "@nextui-org/react";

import "./pages.css";

function Upload() {
  const [file, setFile] = useState();

  const send = (event) => {
    const [title, setTitle] = useState;

    const data = new FormData();
    data.append("file", file);

    Axios.post("http://localhost:7001/auth/upload", data)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="wrapcontainer">
      <Card className="Card" width="80%" height="auto">
        <Text h1> Poster un fichier </Text>
        <label>Choisissez votre image:</label>
        <form method="POST" action="/upload" encType="multipart/form-data">
          <label>
            <input type="text" placeholder="Ajouter un titre" />
            <input
              type="file"
              name="image"
              accept="image/png, image/jpeg"
              onChange={(event) => {
                const file = event.target.files[0];
                setFile(file);
              }}
            />
          </label>
          <Spacer y={1} />
        </form>
        <Button type="submit" onClick={send}>
          Poster
        </Button>
      </Card>
    </div>
  );
}

export default Upload;
