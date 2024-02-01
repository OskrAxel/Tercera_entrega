import * as FaIcons from "react-icons/fa";
import "./Sidebar.scss";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Button, Offcanvas, OffcanvasBody, OffcanvasHeader } from "reactstrap";
import Logo from "./img/logo.png";

const SidebarPer = () => {
  //OffCanvas
  const [isOpen, setIsOpen] = useState(false);

  const toggleOffCanvas = () => {
    setIsOpen(!isOpen);
  };

  //
  const menuItem = [
    {
      path: "ini",
      name: "Inicio",
      icon: <FaIcons.FaRegAddressBook />,
    },
    {
      path: "regper",
      name: "Perfil Usuario",
      icon: <FaIcons.FaRegAddressCard />,
    },
    {
      path: "becarios",
      name: "Registro Becarios",
      icon: <FaIcons.FaUserGraduate />,
    },
    {
      path: "patro",
      name: "Patrocinadores",
      icon: <FaIcons.FaBuilding />,
    },
    {
      path: "evaluar",
      name: "Evaluar Becario",
      icon: <FaIcons.FaUserCheck />,
    },
    {
      path: "cargar",
      name: "Cargar Comunicado",
      icon: <FaIcons.FaFileUpload />,
    },
    {
      path: "analisis",
      name: "Análisis Institucional",
      icon: <FaIcons.FaChartLine />,
    },
  ];
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
            <h1 className="logo">
              <img
                src={Logo}
                alt="logo"
                className="rounded-circle me-2"
                style={{
                  height: 100,
                  width: 100,
                }}
              />
            </h1>
            {/* <h1 className="logo">
              <p className="text-user">Alcides Oscar Cusi Ajno</p>
            </h1> */}
          </div>
        </OffcanvasHeader>
        <OffcanvasBody>
          {menuItem.map((item, index) => (
            <NavLink
              exact
              className="link text-light py-3 w-100  px-2"
              activeClassName="active"
              to={item.path}
              key={index}
            >
              <div className="icon me-2">{item.icon}</div>
              <div
                style={{ display: isOpen ? "block" : "none" }}
                className="link_text"
              >
                {item.name}
              </div>
            </NavLink>
          ))}
        </OffcanvasBody>
      </Offcanvas>
    </div>
  );
};

export default SidebarPer;
