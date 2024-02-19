import React, { useState, useEffect } from "react";
import "./navbar.scss";
import Logo from "./img/logo.png";
import axios from "axios";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavbarText,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "reactstrap";
import { Outlet, useNavigate } from "react-router-dom";
import SidebarAdm from "./SidebarAdm";
import Swal from "sweetalert2";

function NavbarAdm(args) {
  ////
  const [data, setData] = useState({
    id: "",
    contrasena: "",
    contrasena_lit: "",
  });

  const [modalContra, setModalContra] = useState(false);
  const abrirCerrarModalContra = () => {
    setModalContra(!modalContra);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    console.log(data);
  };

  const peticionGet = async () => {
    await axios
      .get(`http://localhost:80/api/adm/contraadm.php`, {
        params: {
          id: localStorage.getItem("user"),
        },
      })
      .then((response) => {
        console.log(response.data);
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  ////
  const act = () => {
    window.location.reload();
  };
  ////
  const naviget = useNavigate();
  function logoutSubmit() {
    localStorage.setItem("login", "");
    localStorage.setItem("loginStatus", "Cierre de sesión satisfactoria!");
    naviget("/LoginAdm");
  }
  // const user = localStorage.getItem("user");

  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);
  ////
  const peticionPutContra = async () => {
    var f = new FormData();
    ///)
    f.append("contrasena", data.contrasena);
    f.append("contrasena_lit", data.contrasena_lit);
    f.append("METHOD", "PUT");
    await axios
      .post(`http://localhost:80/api/adm/contraadm.php`, f, {
        params: { idb: data.id },
      })
      .then((response) => {
        setData(response);
        mostrarAlertaU();
        abrirCerrarModalContra();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    peticionGet();
  }, []);
  ////ALERTAS
  const mostrarAlertaU = () => {
    Swal.fire({
      confirmButtonColor: "#2E8B57",
      title: "Éxito!",
      text: "Contraseña Actualizada.",
      timer: 5000,
      icon: "success",
    });
  };
  return (
    <div>
      <Navbar expand="md" {...args}>
        <SidebarAdm />
        <NavbarBrand href="/dashboard" className="text-light">
          <img
            src={Logo}
            alt="logo"
            className="me-2"
            style={{
              height: 40,
              width: 100,
            }}
          />
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ms-auto" navbar>
            {/* //REVISAR */}
            <NavbarText className="text-light">
              {data.nombre}
              {"   "}
              {data.nombre}
            </NavbarText>
            <UncontrolledDropdown nav direction="down">
              <DropdownToggle nav caret className="text-light">
                MENU
              </DropdownToggle>
              <DropdownMenu className="drop-menu">
                <DropdownItem href="./pdfman2" target="_blank">
                  Instrucciones
                </DropdownItem>
                <DropdownItem href="./PdfConv2M" target="_blank">
                  Postulacion
                </DropdownItem>
                <DropdownItem>Sobre Nosotros...</DropdownItem>
                <DropdownItem divider />
                <DropdownItem onClick={() => abrirCerrarModalContra()}>
                  Cambiar Contraseña
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem onClick={logoutSubmit}>Salir</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
        </Collapse>
      </Navbar>

      {/* MODAL CONTRASEÑA */}
      <Modal isOpen={modalContra}>
        <ModalHeader
          style={{ color: "white", background: "rgba(18, 80, 61, .85)" }}>
          Editar Contraseña
        </ModalHeader>
        <ModalBody>
          <div className="form-group">
            <label>Clave Actual: </label>
            <br />
            <input
              disabled
              type="text"
              className="form-control"
              name="contrasena_lit"
              onChange={handleChange}
              value={data.contrasena_lit}
            />
            <br />
            <label>Nueva Clave: </label>
            <br />
            <input
              type="text"
              className="form-control"
              name="contrasena"
              onChange={handleChange}
              value={data.contrasena}
            />
            <br />
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="success" size="lg" onClick={() => peticionPutContra()}>
            Editar
          </Button>
          {"   "}
          <Button
            color="danger"
            size="lg"
            onClick={() => abrirCerrarModalContra()}>
            Cancelar
          </Button>
        </ModalFooter>
      </Modal>
      <Outlet />
    </div>
  );
}

export default NavbarAdm;
