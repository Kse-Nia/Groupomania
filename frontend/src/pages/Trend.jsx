import React, { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { UidContext } from "../components/AppContext.jsx";
import LeftNav from "../components/LeftNav";
import Card from "../components/Post/Card";
import Trends from "../components/Trends";

import { Card } from "@nextui-org/react";
import { Input } from "@nextui-org/react";
import { Grid } from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import { Spacer } from "@nextui-org/react";
import { Text } from "@nextui-org/react";
import Axios from "axios";

const Trend = () => {
  const uid = useContext(UidContext);
  const trendList = useSelector((state) => state.trendingReducer);

  return (
    <div className="trendingpage">
      <LeftNav />
      <div className="main">
        <ul>
          {!isEmpty(trendList[0]) &&
            trendList.map((post) => <Card post={post} key={post.id} />)}
        </ul>
      </div>
      <div className="right-side">
        <div className="right-side-container">
          <Trends />
          {uid && <FriendsHint />}
        </div>
      </div>
    </div>
  );
};

export default Trend;
