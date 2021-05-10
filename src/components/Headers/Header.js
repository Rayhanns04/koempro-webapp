import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { useTheme } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
// import Grid from "@material-ui/core/Grid";
// @material-ui/icons components
// import ArrowDownward from "@material-ui/icons/ArrowDownward";
// import ArrowUpward from "@material-ui/icons/ArrowUpward";
// import EmojiEvents from "@material-ui/icons/EmojiEvents";
// import GroupAdd from "@material-ui/icons/GroupAdd";
// import InsertChartOutlined from "@material-ui/icons/InsertChartOutlined";
// import PieChart from "@material-ui/icons/PieChart";

// core components
// import CardStats from "components/Cards/CardStats.js";

import componentStyles from "assets/theme/components/header.js";

// import Axios from "axios";

const useStyles = makeStyles(componentStyles);

const Header = () => {
  // const [posts, setPosts] = useState([]);
  // const [memberCount, setMemberCount] = useState(9);
  // const [projectCount, setProjectCount] = useState(0);

  // useEffect(() => {
  //   Axios.get("http://localhost:3001/posts").then((res) => {
  //     setPosts(res.data);
  //     setProjectCount(posts.length);
  //   });
  // }, []);

  const classes = useStyles();
  const theme = useTheme();
  return (
    <>
      <div className={classes.header}>
        <Container
          maxWidth={false}
          component={Box}
          classes={{ root: classes.containerRoot }}
        ></Container>
      </div>
    </>
  );
};

export default Header;
