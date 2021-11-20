import React from "react";
import { Card } from "@nextui-org/react";
import { Input } from "@nextui-org/react";
import { Grid } from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import { Spacer } from "@nextui-org/react";
import { Avatar } from "@nextui-org/react";

import "./pages.css";

function Profile() {
  return (
    <div className="wrapcontainer">
      <Card width="400px" bordered>
        <Grid>
          <Avatar
            size="large"
            src="/avatars/avatar-4.png"
            color="warning"
            bordered
          />
        </Grid>
        <p>A bordered card.</p>
      </Card>
    </div>
  );
}

export default Profile;
