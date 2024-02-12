import * as FaIcons from "react-icons/fa";
import "./Sidebar.scss";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import {
  Button,
  Offcanvas,
  OffcanvasBody,
  OffcanvasHeader,
  CardImg,
} from "reactstrap";

const SidebarBec = () => {
  //OffCanvas
  const [isOpen, setIsOpen] = useState(false);

  const toggleOffCanvas = () => {
    setIsOpen(!isOpen);
  };

  //
  const menuItem = [
    {
      path: "registro",
      name: "Inicio",
      icon: <FaIcons.FaFlipboard />,
    },
    {
      path: "regcomp",
      name: "Reg. Completo",
      icon: <FaIcons.FaRegAddressBook />,
    },
    {
      path: "horarios1",
      name: "Ver Horarios",
      icon: <FaIcons.FaUserGraduate />,
    },
    {
      path: "nota1",
      name: "Notas",
      icon: <FaIcons.FaUsers />,
    },
  ];
  ////MOSTRAR IMAGEN
  const [lista, setLista] = useState([]);

  useEffect(() => {
    getImagenes();
  }, []);

  const getImagenes = async () => {
    await axios
      .get(`http://localhost:80/api/bec/img/index.php`, {
        params: {
          id: localStorage.getItem("iduser"),
        },
      })
      .then((response) => {
        console.log(response.data);
        setLista(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  ////
  return (
    <div>
      <div>
        <Button onClick={toggleOffCanvas} className="bars">
          <FaIcons.FaBars />
        </Button>
      </div>
      <Offcanvas isOpen={isOpen} toggle={toggleOffCanvas} className="sidebar">
        <OffcanvasHeader toggle={toggleOffCanvas}>
          <div>
            {lista.map((item) => (
              <div key={item.id}>
                <CardImg
                  className="rounded-circle me-2"
                  alt="Card image cap"
                  src={" data:image/png;base64," + item.foto}
                  style={{
                    height: 200,
                    width: 200,
                    marginTop: "2px",
                    border: "5px solid rgba(1, 67, 59, 1)",
                  }}
                  width="100%"
                />
              </div>
            ))}
          </div>
        </OffcanvasHeader>
        <OffcanvasBody>
          {menuItem.map((item, index) => (
            <NavLink
              exact
              className="link text-light py-3 w-100  px-2"
              activeClassName="active"
              to={item.path}
              key={index}>
              <div className="icon me-2">{item.icon}</div>
              <div
                style={{ display: isOpen ? "block" : "none" }}
                className="link_text">
                {item.name}
              </div>
            </NavLink>
          ))}
        </OffcanvasBody>
      </Offcanvas>
    </div>
  );
};

export default SidebarBec;
