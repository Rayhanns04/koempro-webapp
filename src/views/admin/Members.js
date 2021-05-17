import React, { useEffect, useState } from "react";

import Axios from "axios";

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

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import Container from "@material-ui/core/Container";
// import Tooltip from "@material-ui/core/Tooltip";
// import AvatarGroup from "@material-ui/lab/AvatarGroup";

// Form
// import FormGroup from "@material-ui/core/FormGroup";
// import FormLabel from "@material-ui/core/FormLabel";
// import OutlinedInput from "@material-ui/core/OutlinedInput";
import Header from "components/Headers/Header.js";
// import FormControl from "@material-ui/core/FormControl";
// import Select from "@material-ui/core/Select";

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

const Members = () => {
  const classes = useStyles();
  const [Members, setMembers] = useState([]);
  const [posts, setPosts] = useState([]);

  const [idReceive, setIdReceive] = React.useState("");

  const [name, setName] = React.useState("");
  const [postId, setPostId] = React.useState("");

  const [nameReceive, setNameReceive] = React.useState("");
  const [postIdReceive, setPostIdReceive] = React.useState("");

  // Modal Form Edit --------------------
  const classesDialog = useStylesDialog();
  const [open, setOpen] = React.useState(false);
  const [openFromCreate, setOpenFromCreate] = React.useState(false);

  const handleClickClose = () => {
    setOpen(false);
  };
  const handleClickOpen = (idr, namer, postr) => {
    setIdReceive(idr);
    setNameReceive(namer);
    setPostIdReceive(postr);

    setOpen(true);
  };

  const handleClickCloseCreateFrom = () => {
    setOpenFromCreate(false);
  };
  const handleClickOpenCreateFrom = () => {
    setOpenFromCreate(true);
  };

  // Handle Update ========================================================================
  const handleUpdate = (idr) => {
    Axios.put(
      "https://server9999.herokuapp.com/members/" + idr,
      {
        name: nameReceive,
        PostId: postIdReceive,
      },
      {
        headers: {
          accessToken: sessionStorage.getItem("accessToken"),
        },
      }
    )
      .then((response) => {
        if (response.data.error) {
          alert(response.data.error);
        } else {
          setOpen(false);
        }
      })
      .catch((error) => {
        console.log(error);
      });
    // alert("id" + idr);
  };

  // Handle Delete ========================================================================
  const handleDeletePost = (id) => {
    Axios.delete("https://server9999.herokuapp.com/members/" + id, {
      headers: {
        accessToken: sessionStorage.getItem("accessToken"),
      },
    });
    alert("Success Delete Post");
  };

  // Handle Create ========================================================================
  const handleCreatePost = () => {
    Axios.post(
      "https://server9999.herokuapp.com/members",
      {
        name: name,
        PostId: postId,
      },
      {
        headers: {
          accessToken: sessionStorage.getItem("accessToken"),
        },
      }
    )
      .then((result) => {
        if (result.data.error) {
          alert("Don't Have Access Token, Please Sign In Again");
        } else {
          console.log(result);
          setOpenFromCreate(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Rest API ========================================================================
  useEffect(() => {
    Axios.get("https://server9999.herokuapp.com/members/")
      .then((res) => {
        setMembers(res.data);
      })
      .catch((Err) => console.log(Err));

    Axios.get("https://server9999.herokuapp.com/posts")
      .then((res) => {
        setPosts(res.data);
      })
      .catch((Err) => console.log(Err));
  }, [Members]);
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
            Update Member
          </Typography>
          <IconButton onClick={handleClickClose}>
            <Clear />
          </IconButton>
        </div>

        <DialogContent>
          <label class="form-label">Member</label>
          <select
            class="form-select border border-secondary border border-2"
            aria-label="Default select example"
            value={nameReceive}
            onChange={(e) => setNameReceive(e.target.value)}
          >
            <option value="Abdul" selected>
              Abdul
            </option>
            <option value="Habibie">Habibie</option>
            <option value="Hans">Hans</option>
            <option value="Henry">Henry</option>
            <option value="Maulana">Maulana</option>
            <option value="Azizah">Azizah</option>
            <option value="Dewi">Dewi</option>
            <option value="Nazla">Nazla</option>
            <option value="Sarah">Sarah</option>
          </select>
          <br />

          <label for="" class="form-label">
            On Post
          </label>
          <select
            class="form-select border border-secondary border border-2"
            aria-label="Default select example"
            value={postIdReceive}
            onChange={(e) => setPostIdReceive(e.target.value)}
          >
            {posts.map((item) => {
              return <option value={item.id}>{item.title}</option>;
            })}
          </select>
          <br />
        </DialogContent>

        <DialogActions>
          <Button
            color="primary"
            variant="contained"
            onClick={() => handleUpdate(idReceive)}
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
            Create Members
          </Typography>
          <IconButton onClick={handleClickClose}>
            <Clear />
          </IconButton>
        </div>

        <DialogContent>
          <label class="form-label">Member</label>
          <select
            class="form-select border border-secondary border border-2"
            aria-label="Default select example"
            value={name}
            onChange={(e) => setName(e.target.value)}
          >
            <option value="Abdul" selected>
              Abdul
            </option>
            <option value="Habibie">Habibie</option>
            <option value="Hans">Hans</option>
            <option value="Henry">Henry</option>
            <option value="Maulana">Maulana</option>
            <option value="Azizah">Azizah</option>
            <option value="Dewi">Dewi</option>
            <option value="Nazla">Nazla</option>
            <option value="Sarah">Sarah</option>
          </select>
          <br />

          <label for="" class="form-label">
            On Post
          </label>
          <select
            class="form-select border border-secondary border border-2"
            aria-label="Default select example"
            value={postId}
            onChange={(e) => setPostId(e.target.value)}
          >
            {posts.map((item) => {
              return <option value={item.id}>{item.title}</option>;
            })}
          </select>
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
            title="All Members"
            titleTypographyProps={{
              component: Box,
              marginBottom: "0!important",
              variant: "h3",
            }}
          ></CardHeader>

          {/* Button Create ======================================================================== */}
          <br />
          <button
            class="btn btn-primary btn-lg"
            onClick={() => handleClickOpenCreateFrom()}
          >
            <i class="fas fa-plus"></i>
            <span style={{ marginLeft: "10px" }}>Create</span>
          </button>

          {/* Table ======================================================================== */}
          <div class="table-responsive">
            <table class="table table-striped table-hover pl-2 ">
              <thead class="table-dark">
                <tr>
                  <th>Name</th>
                  <th>PostId</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {Members.map((post) => {
                  const MemberConditional = () => {
                    switch (post.name) {
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
                        return console.log("Member tidak ditemukan");
                    }
                  };

                  // return ========================================================================
                  return (
                    <>
                      <tr>
                        <td>
                          <div class="row align-items-center">
                            <div class="col-2">{MemberConditional()}</div>
                            <div class="col-6">{post.name}</div>
                          </div>
                        </td>
                        <td
                          style={{
                            width: "300px",
                          }}
                        >
                          {post.PostId}
                        </td>
                        <td>
                          <button
                            onClick={() =>
                              handleClickOpen(post.id, post.name, post.PostId)
                            }
                            class="btn btn-warning"
                          >
                            <i class="fas fa-edit"></i>
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
                    </>
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

export default Members;
