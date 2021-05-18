// Core Components ===================================
import { hot } from "react-hot-loader/root";
import React, { useEffect, useState } from "react";
import Tooltip from "@material-ui/core/Tooltip";
// import ReactLoading from "react-loading";

// Others Components =================================
import Task from "../assets/images/task.svg";
import Date from "../assets/images/data.svg";
import Link from "../assets/images/link.svg";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Axios from "axios";

// Avatar ===========================================
import Avatar1 from "../assets/images/Avatar 1.svg";
import Avatar2 from "../assets/images/Avatar 2.svg";
import Avatar3 from "../assets/images/Avatar 3.svg";
import Avatar4 from "../assets/images/Avatar 4.svg";
import Avatar5 from "../assets/images/Avatar 5.svg";
import Avatar6 from "../assets/images/Avatar 6.svg";

// Member ===========================================
import Hans from "../assets/images/Rayhan-1.svg";
import Abdul from "../assets/images/Abdul.svg";
import Habibie from "../assets/images/Habibie.svg";
import Maulana from "../assets/images/Maulana.svg";
import Henry from "../assets/images/Henry Alif R.svg";
import Azizah from "../assets/images/Azizah.svg";
import Dewi from "../assets/images/Dewi C.svg";
import Nazla from "../assets/images/Nazla.svg";
import Sarah from "../assets/images/Sarah.svg";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [members, setMembers] = useState([]);
  const [auth, setAuth] = useState();

  useEffect(() => {
    setAuth(sessionStorage.getItem("accessToken"));

    // Call RestAPI ===================================================
    Axios.get("https://server9999.herokuapp.com/posts").then((res) => {
      setPosts(res.data);
    });
    Axios.get("https://server9999.herokuapp.com/members").then((res) => {
      setMembers(res.data);
    });
  }, ["hot"]);

  const RenderItem = posts.map((item) => {
    // Conditional Rendering ===========================================
    const AvatarConditional = () => {
      switch (item.avatar) {
        case "Smile Blue":
          return <img src={Avatar1} alt="avatar" />;
        case "White Astronaut":
          return <img src={Avatar2} alt="avatar" />;
        case "Blue Dino":
          return <img src={Avatar3} alt="avatar" />;
        case "Cut Cat":
          return <img src={Avatar4} alt="avatar" />;
        case "Rock Dino":
          return <img src={Avatar5} alt="avatar" />;
        case "Great Mouse":
          return <img src={Avatar6} alt="avatar" />;
        default:
          return console.log("Avatar gagal di load!");
      }
    };

    return (
      <div className="hm__singleitem" key={item.id}>
        <div className="hm__singleitem__header">
          {AvatarConditional()}

          <div className="hm__singleitem__header__link">
            <a href={item.link} target="_blank">
              Kunjungi
            </a>
            <img src={Link} alt="visit" />
          </div>
        </div>

        <div className="hm__singleitem__body">
          <h4>{item.title}</h4>
          <p>{item.desc}</p>
        </div>

        <div className="hm__singleitem__body2">
          <div className="hm__singleitem__body2__item">
            <img src={Task} alt="task" />
            <p>Task : {item.task}</p>
          </div>

          <div className="hm__singleitem__body2__item">
            <img src={Date} alt="Date" />
            <p>Date : {item.date}</p>
          </div>
        </div>

        <div className="hm__singleitem__member">
          {members.map((member) => {
            // Conditional Rendering =================================
            const MemberConditional = () => {
              switch (member.name) {
                case "Hans":
                  return (
                    <Tooltip title="Hans" placement="top" arrow>
                      <img src={Hans} alt="member" />
                    </Tooltip>
                  );

                case "Abdul":
                  return (
                    <Tooltip title="Abdul" placement="top" arrow>
                      <img src={Abdul} alt="member" />
                    </Tooltip>
                  );

                case "Habibie":
                  return (
                    <Tooltip title="Habibie" placement="top" arrow>
                      <img src={Habibie} alt="member" />
                    </Tooltip>
                  );

                case "Henry":
                  return (
                    <Tooltip title="Henry" placement="top" arrow>
                      <img src={Henry} alt="member" />
                    </Tooltip>
                  );

                case "Maulana":
                  return (
                    <Tooltip title="Maulana" placement="top" arrow>
                      <img src={Maulana} alt="member" />
                    </Tooltip>
                  );

                case "Azizah":
                  return (
                    <Tooltip title="Azizah" placement="top" arrow>
                      <img src={Azizah} alt="member" />
                    </Tooltip>
                  );

                case "Dewi":
                  return (
                    <Tooltip title="Dewi" placement="top" arrow>
                      <img src={Dewi} alt="member" />
                    </Tooltip>
                  );

                case "Nazla":
                  return (
                    <Tooltip title="Nazla" placement="top" arrow>
                      <img src={Nazla} alt="member" />
                    </Tooltip>
                  );

                case "Sarah":
                  return (
                    <Tooltip title="Sarah" placement="top" arrow>
                      <img src={Sarah} alt="member" />
                    </Tooltip>
                  );
                default:
                  return console.log("Member tidak ditemukan");
              }
            };

            if (member.PostId != item.id) {
              return null;
            }
            return <div key={member.id}>{MemberConditional()}</div>;
          })}
        </div>
      </div>
    );
  });

  return (
    <div id="hm__outer">
      <Header auth={auth} />
      <div className="hm__container">
        <div className="hm__item__container">{RenderItem}</div>
      </div>
      <Footer />
    </div>
  );
};

export default hot(Home);
