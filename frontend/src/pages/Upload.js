import React, { useEffect, useState } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import { Card } from "@nextui-org/react";
import { Input } from "@nextui-org/react";
import { Spacer } from "@nextui-org/react";
import { Text } from "@nextui-org/react";
import { Button } from "@nextui-org/react";

import "./pages.css";

function Upload() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState();
  let navigate = useNavigate();

  const send = () => {
    const formData = new FormData();
    formData.append("file", file[0]);

    Axios.post(
      `https://api.cloudinary.com/v1_1/pedro-machado-inc/image/upload`,
      {
        title: title,
        description: description,
        image: file,
        author: localStorage.getItem("username"),
      }
    ).then((response) => {
      navigate.push("/");
    });
  };

  return (
    <div className="wrapcontainer">
      <Card className="Card" width="80%" height="auto">
        <Text h1> Créer un nouveau post</Text>
        <label>Poster votre image:</label>
        <form method="POST" action="/upload" encType="multipart/form-data">
          <label>
            <Input
              type="text"
              placeholder="Title..."
              onChange={(event) => {
                setTitle(event.target.value);
              }}
            />
            <Input
              type="text"
              placeholder="Description..."
              onChange={(event) => {
                setDescription(event.target.value);
              }}
            />
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
