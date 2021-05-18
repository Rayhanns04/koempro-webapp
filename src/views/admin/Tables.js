import { hot } from "react-hot-loader/root";
import React, { Fragment, useEffect, useState } from "react";

// Installed Dependencies =====================================
import Axios from "axios";
import swal from "sweetalert";

// Image ---------------
import Hans from "../../assets/images/Rayhan-1.svg";
import Abdul from "../../assets/images/Abdul.svg";
import Habibie from "../../assets/images/Habibie.svg";
import Maulana from "../../assets/images/Maulana.svg";
import Henry from "../../assets/images/Henry Alif R.svg";
import Azizah from "../../assets/images/Azizah.svg";
import Dewi from "../../assets/images/Dewi C.svg";
import Nazla from "../../assets/images/Nazla.svg";
import Sarah from "../../assets/images/Sarah.svg";

import Avatar1 from "../../assets/images/Avatar 1.svg";
import Avatar2 from "../../assets/images/Avatar 2.svg";
import Avatar3 from "../../assets/images/Avatar 3.svg";
import Avatar4 from "../../assets/images/Avatar 4.svg";
import Avatar5 from "../../assets/images/Avatar 5.svg";
import Avatar6 from "../../assets/images/Avatar 6.svg";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import Container from "@material-ui/core/Container";
import Tooltip from "@material-ui/core/Tooltip";
import AvatarGroup from "@material-ui/lab/AvatarGroup";

// Form
import Header from "components/Headers/Header.js";

import componentStyles from "assets/theme/views/admin/tables.js";

// Modal Form Edit --------------------
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Slide from "@material-ui/core/Slide";
import Clear from "@material-ui/icons/Clear";
import componentStylesDialog from "assets/theme/components/dialog.js";
const useStylesDialog = makeStyles(componentStylesDialog);

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const useStyles = makeStyles(componentStyles);

const Tables = () => {
  const classes = useStyles();
  const [posts, setPosts] = useState([]);
  const [members, setMembers] = useState([]);

  // Modal Form Edit --------------------
  const classesDialog = useStylesDialog();
  const [open, setOpen] = React.useState(false);
  const [openFromCreate, setOpenFromCreate] = React.useState(false);

  const handleClickClose = () => {
    setOpen(false);
  };
  const handleClickOpen = (idr, titler, descr, taskr, dater, linkr, avatar) => {
    setIdReceive(idr);
    setTitleReceive(titler);
    setDescReceive(descr);
    setTaskReceive(taskr);
    setDateReceive(dater);
    setLinkReceive(linkr);
    setAvatarReceive(avatar);

    setOpen(true);
  };

  const handleClickCloseCreateFrom = () => {
    setOpenFromCreate(false);
  };
  const handleClickOpenCreateFrom = () => {
    setOpenFromCreate(true);
  };

  const [id, setId] = React.useState("");
  const [title, setTitle] = React.useState("");
  const [desc, setDesc] = React.useState("");
  const [link, setLink] = React.useState("");
  const [task, setTask] = React.useState("");
  const [date, setDate] = React.useState("");
  const [image, setImage] = React.useState("");
  const [avatar, setAvatar] = React.useState("");

  const [idReceive, setIdReceive] = React.useState("");
  const [titleReceive, setTitleReceive] = React.useState("");
  const [descReceive, setDescReceive] = React.useState("");
  const [linkReceive, setLinkReceive] = React.useState("");
  const [taskReceive, setTaskReceive] = React.useState("");
  const [dateReceive, setDateReceive] = React.useState("");
  const [imageReceive, setImageReceive] = React.useState("");
  const [avatarReceive, setAvatarReceive] = React.useState("");

  const handleGetPostData = () => {
    Axios.get("https://server9999.herokuapp.com/posts").then((res) => {
      setPosts(res.data);
    });
    Axios.get("https://server9999.herokuapp.com/members").then((res) => {
      setMembers(res.data);
    });
  };

  const handleUdateProject = (id) => {
    console.log(id);
    Axios.put(
      "https://server9999.herokuapp.com/posts/" + id,
      {
        title: titleReceive,
        desc: descReceive,
        link: linkReceive,
        task: taskReceive,
        date: dateReceive,
        image: imageReceive,
        avatar: avatarReceive,
      },
      {
        headers: {
          accessToken: sessionStorage.getItem("accessToken"),
        },
      }
    )
      .then((result) => {
        if (result.data.error) {
          alert("Don't Have Access Token, Please Sign in Again");
        } else {
          setOpen(false);
          setInterval(handleGetPostData, 2000);
          return swal("Good job!", "Success Update Post!", "success");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Handle Delete ========================================================================
  const handleDeletePost = (id) => {
    Axios.delete("https://server9999.herokuapp.com/posts/" + id, {
      headers: {
        accessToken: sessionStorage.getItem("accessToken"),
      },
    })
      .then((result) => {
        if (result.data.error) {
          alert("Don't Have Access Token, Please Sign in Again");
        } else {
          setInterval(handleGetPostData, 2000);
          return swal("Good job!", "Success Delete Post!", "success");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Handle Create ========================================================================
  const handleCreatePost = () => {
    Axios.post(
      "https://server9999.herokuapp.com/posts",
      {
        title: title,
        desc: desc,
        link: link,
        task: task,
        date: date,
        image: image,
        avatar: avatar,
      },
      {
        headers: {
          accessToken: sessionStorage.getItem("accessToken"),
        },
      }
    )
      .then((result) => {
        if (result.data.error) {
          alert("Don't Have Access Token, Please Sign in Again");
        } else {
          setOpenFromCreate(false);
          // For Refresh API when true
          setInterval(handleGetPostData, 1000);
          return swal("Good job!", "Success Full Add New Post!", "success");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Call Rest API ========================================================================
  useEffect(() => {
    Axios.get("https://server9999.herokuapp.com/posts").then((res) => {
      setPosts(res.data);
    });
    Axios.get("https://server9999.herokuapp.com/members").then((res) => {
      setMembers(res.data);
    });
  }, []);

  return (
    <>
      {/* Update Dialog ======================================================================== */}
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClickClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <div className={classesDialog.dialogHeader}>
          <Typography
            variant="h5"
            component="h5"
            className={classesDialog.dialogTitle}
          >
            Update Post
          </Typography>
          <IconButton onClick={handleClickClose}>
            <Clear />
          </IconButton>
        </div>

        <DialogContent>
          <label class="form-label">Avatar</label>
          <select
            class="form-select border border-secondary border border-2"
            aria-label="Default select example"
            value={avatarReceive}
            onChange={(e) => setAvatarReceive(e.target.value)}
          >
            <option value="Smile Blue">Smile Blue</option>
            <option value="White Astronaut">White Astronaut</option>
            <option value="Blue Dino">Blue Dino</option>
            <option value="Cut Cat">Cut Cat</option>
            <option value="Rock Dino">Rock Dino</option>
            <option value="Great Mouse">Great Mouse</option>
          </select>
          <br />

          <label class="form-label">Title</label>
          <input
            class="form-control border border-secondary border border-2"
            type="text"
            placeholder="Project Name"
            aria-label="Project Name"
            value={titleReceive}
            onChange={(e) => setTitleReceive(e.target.value)}
          />
          <br />

          <label class="form-label">Description</label>
          <input
            class="form-control border border-secondary border border-2"
            type="text"
            placeholder="Description"
            aria-label="Description"
            value={descReceive}
            onChange={(e) => setDescReceive(e.target.value)}
          />
          <br />

          <label class="form-label">Task</label>
          <input
            class="form-control border border-secondary border border-2"
            type="text"
            placeholder="Task"
            aria-label="Task"
            value={taskReceive}
            onChange={(e) => setTaskReceive(e.target.value)}
          />
          <br />

          <label class="form-label">Date</label>
          <input
            class="form-control border border-secondary border border-2"
            type="date"
            placeholder="Date"
            aria-label="Date"
            value={dateReceive}
            onChange={(e) => setDateReceive(e.target.value)}
          />
          <br />

          <label class="form-label">Link</label>
          <input
            class="form-control border border-secondary border border-2"
            type="text"
            placeholder="Link Project"
            aria-label="Link Project"
            value={linkReceive}
            onChange={(e) => setLinkReceive(e.target.value)}
          />
          <br />
        </DialogContent>

        <DialogActions>
          <Button
            onClick={() => handleUdateProject(idReceive)}
            color="primary"
            variant="contained"
          >
            Save changes
          </Button>
          <Button
            component={Box}
            onClick={handleClickClose}
            color="primary"
            marginLeft="auto!important"
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/* Create Dialog ======================================================================== */}
      <Dialog
        open={openFromCreate}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClickCloseCreateFrom}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <div className={classesDialog.dialogHeader}>
          <Typography
            variant="h5"
            component="h5"
            className={classesDialog.dialogTitle}
          >
            Create Post
          </Typography>
          <IconButton onClick={handleClickClose}>
            <Clear />
          </IconButton>
        </div>

        <DialogContent>
          <label class="form-label">Avatar</label>
          <select
            class="form-select border border-secondary border border-2"
            aria-label="Default select example"
            onChange={(e) => setAvatar(e.target.value)}
          >
            <option value="Smile Blue" Selected>
              Smile Blue
            </option>
            <option value="White Astronaut">White Astronaut</option>
            <option value="Blue Dino">Blue Dino</option>
            <option value="Cut Cat">Cut Cat</option>
            <option value="Rock Dino">Rock Dino</option>
            <option value="Great Mouse">Great Mouse</option>
          </select>
          <br />

          <label class="form-label">Title</label>
          <input
            class="form-control border border-secondary border border-2"
            type="text"
            placeholder="Project Name"
            aria-label="Project Name"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <br />

          <label class="form-label">Description</label>
          <input
            class="form-control border border-secondary border border-2"
            type="text"
            placeholder="Description"
            aria-label="Description"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
          <br />

          <label class="form-label">Task</label>
          <input
            class="form-control border border-secondary border border-2"
            type="text"
            placeholder="Task"
            aria-label="Task"
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />
          <br />

          <label class="form-label">Date</label>
          <input
            class="form-control border border-secondary border border-2"
            type="date"
            placeholder="Date"
            aria-label="Date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          <br />

          <label class="form-label">Link</label>
          <input
            class="form-control border border-secondary border border-2"
            type="text"
            placeholder="Link Project"
            aria-label="Link Project"
            value={link}
            onChange={(e) => setLink(e.target.value)}
          />
          <br />
        </DialogContent>

        <DialogActions>
          <Button
            onClick={() => handleCreatePost()}
            color="primary"
            variant="contained"
          >
            Save changes
          </Button>
          <Button
            component={Box}
            onClick={() => handleClickCloseCreateFrom()}
            color="primary"
            marginLeft="auto!important"
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/* Header Dialog ======================================================================== */}
      <Header />
      {/* Page content ========================================================================*/}
      <Container
        maxWidth={false}
        component={Box}
        marginTop="-6rem"
        classes={{ root: classes.containerRoot }}
      >
        <Card classes={{ root: classes.cardRoot }}>
          <CardHeader
            className={classes.cardHeader}
            title="All Projects"
            titleTypographyProps={{
              component: Box,
              marginBottom: "0!important",
              variant: "h3",
            }}
          ></CardHeader>

          {/* Button Create ======================================================================== */}
          <br />
          <button
            class="btn btn-lg"
            style={{
              backgroundColor: "#7CF6A6",
              color: "#FFFFFF",
            }}
            onClick={() => handleClickOpenCreateFrom()}
          >
            <i class="fas fa-plus"></i>{" "}
            <span style={{ marginLeft: "10px" }}>Create</span>
          </button>

          {/* Table ======================================================================== */}
          <div class="table-responsive">
            <table class="table table-striped table-hover ">
              <thead
                style={{
                  backgroundColor: "#48ED80",
                  color: "#FFFFFF",
                }}
              >
                <tr>
                  <th>Title</th>
                  <th>Description</th>
                  <th>Task</th>
                  <th>Date</th>
                  <th>Link</th>
                  <th>User</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {posts.map((post) => {
                  const AvatarConditional = () => {
                    switch (post.avatar) {
                      case "Smile Blue":
                        return (
                          <img style={{ marginRight: "20px" }} src={Avatar1} />
                        );
                      case "White Astronaut":
                        return (
                          <img style={{ marginRight: "20px" }} src={Avatar2} />
                        );
                      case "Blue Dino":
                        return (
                          <img style={{ marginRight: "20px" }} src={Avatar3} />
                        );
                      case "Cut Cat":
                        return (
                          <img style={{ marginRight: "20px" }} src={Avatar4} />
                        );
                      case "Rock Dino":
                        return (
                          <img style={{ marginRight: "20px" }} src={Avatar5} />
                        );
                      case "Great Mouse":
                        return (
                          <img style={{ marginRight: "20px" }} src={Avatar6} />
                        );
                      default:
                        return console.log("Avatar gagal di load!");
                    }
                  };
                  // return ========================================================================
                  return (
                    <Fragment key={post.id}>
                      <tr>
                        <td>
                          {AvatarConditional()}
                          {post.title}
                        </td>
                        <td
                          style={{
                            width: "300px",
                          }}
                        >
                          {post.desc}
                        </td>
                        <td
                          style={{
                            width: "200px",
                          }}
                        >
                          {post.task}
                        </td>
                        <td
                          style={{
                            width: "150px",
                          }}
                        >
                          {post.date}
                        </td>
                        <td>
                          <p style={{ width: "100px" }}>{post.link}</p>
                        </td>
                        <td
                          style={{
                            width: "150px",
                          }}
                        >
                          <AvatarGroup>
                            {members.map((item) => {
                              const MemberConditional = () => {
                                switch (item.name) {
                                  case "Hans":
                                    return (
                                      <Avatar
                                        classes={{ root: classes.avatarRoot }}
                                        alt="..."
                                        src={Hans}
                                      />
                                    );

                                  case "Abdul":
                                    return (
                                      <Avatar
                                        classes={{ root: classes.avatarRoot }}
                                        alt="..."
                                        src={Abdul}
                                      />
                                    );

                                  case "Habibie":
                                    return (
                                      <Avatar
                                        classes={{ root: classes.avatarRoot }}
                                        alt="..."
                                        src={Habibie}
                                      />
                                    );

                                  case "Henry":
                                    return (
                                      <Avatar
                                        classes={{ root: classes.avatarRoot }}
                                        alt="..."
                                        src={Henry}
                                      />
                                    );

                                  case "Maulana":
                                    return (
                                      <Avatar
                                        classes={{ root: classes.avatarRoot }}
                                        alt="..."
                                        src={Maulana}
                                      />
                                    );

                                  case "Azizah":
                                    return (
                                      <Avatar
                                        classes={{ root: classes.avatarRoot }}
                                        alt="..."
                                        src={Azizah}
                                      />
                                    );

                                  case "Dewi":
                                    return (
                                      <Avatar
                                        classes={{ root: classes.avatarRoot }}
                                        alt="..."
                                        src={Dewi}
                                      />
                                    );

                                  case "Nazla":
                                    return (
                                      <Avatar
                                        classes={{ root: classes.avatarRoot }}
                                        alt="..."
                                        src={Nazla}
                                      />
                                    );

                                  case "Sarah":
                                    return (
                                      <Avatar
                                        classes={{ root: classes.avatarRoot }}
                                        alt="..."
                                        src={Sarah}
                                      />
                                    );

                                  default:
                                    return console.log(
                                      "Member tidak ditemukan"
                                    );
                                }
                              };

                              if (item.PostId != post.id) {
                                return null;
                              }

                              return (
                                <Tooltip
                                  title={item.name}
                                  placement="top"
                                  key={item.id}
                                >
                                  {MemberConditional()}
                                </Tooltip>
                              );
                            })}
                          </AvatarGroup>
                        </td>
                        <td>
                          <button
                            onClick={() =>
                              handleClickOpen(
                                post.id,
                                post.title,
                                post.desc,
                                post.task,
                                post.date,
                                post.link,
                                post.avatar
                              )
                            }
                            class="btn btn-warning"
                          >
                            <i class="fas fa-edit"></i>{" "}
                            <span style={{ marginLeft: "8px" }}>Edit</span>
                          </button>
                          <button
                            onClick={() => handleDeletePost(post.id)}
                            class="btn btn-danger ms-2"
                          >
                            <i class="fas fa-trash-alt"></i>{" "}
                            <span style={{ marginLeft: "8px" }}>Delete</span>
                          </button>
                        </td>
                      </tr>
                    </Fragment>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Card>
      </Container>
    </>
  );
};

export default hot(Tables);
