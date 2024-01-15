import React, { useState } from "react";
import "./navbar.scss";
import Logo from "./img/logo.png";
import axios from "axios";
import * as FaIcons from "react-icons/fa";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
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
import SidebarBec from "./SidebarBec";

function NavbarBec(args) {
  const naviget = useNavigate();
  function logoutSubmit() {
    localStorage.setItem("login", "");
    localStorage.setItem("loginStatus", "Cierre de sesión satisfactoria!");
    naviget("/");
  }
  const iduser = localStorage.getItem("iduser");

  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);
  ////
  const [descripcion, setDescripcion] = useState("");
  const [nom, setNom] = useState("");
  const [imagen, setImagen] = useState(null);

  async function addImagen(e) {
    e.preventDefault();
    let fd = new FormData();
    fd.append("archivo_per", imagen);
    fd.append("nom_usu", descripcion);
    fd.append("nom_doc", nom);
    const res = await axios.post("http://localhost:80/api/inf/", fd);
    console.log(res.data);
    abrirCerrarModalInsertar();
  }
  const [modalInsertar, setModalInsertar] = useState(false);
  const abrirCerrarModalInsertar = () => {
    setModalInsertar(!modalInsertar);
  };
  ////
  const [modalFoto, setModalFoto] = useState(false);
  const abrirCerrarModalFoto = () => {
    setModalFoto(!modalFoto);
  };
  const [foto, setFoto] = useState([]);
  async function getImagenes() {
    const res = await axios.get("http://localhost:80/api/bec/foto.php");
    setFoto(res.data);
    console.log(res.data);
  }
  ////
  const [modalContra, setModalContra] = useState(false);
  const abrirCerrarModalContra = () => {
    setModalContra(!modalContra);
  };
  const [Contra, setContra] = useState([]);
  async function getContra() {
    const res = await axios.get("http://localhost:80/api/bec/foto.php");
    setContra(res.data);
    console.log(res.data);
  }
  ////
  return (
    <div>
      <Navbar expand="md" {...args}>
        <SidebarBec />
        <NavbarBrand href="/" className="text-light">
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
            <NavItem>
              <Button
                color="warning"
                onClick={() => abrirCerrarModalInsertar()}
              >
                <FaIcons.FaPlus /> ENVIAR INF
              </Button>
            </NavItem>
            <>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</>
            {/* //REVISAR */}
            <NavbarText className="text-light">{iduser}</NavbarText>
            <UncontrolledDropdown nav direction="down">
              <DropdownToggle nav caret className="text-light">
                MENU
              </DropdownToggle>
              <DropdownMenu className="drop-menu">
                <DropdownItem href="./Pdfman1" target="_blank">
                  Instrucciones
                </DropdownItem>
                <DropdownItem href="./PdfConv2" target="_blank">
                  Postulacion
                </DropdownItem>
                <DropdownItem>Sobre Nosotros...</DropdownItem>
                <DropdownItem divider />
                <DropdownItem onClick={() => abrirCerrarModalFoto()}>
                  Foto
                </DropdownItem>
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
      {/* MODAL INFORME */}
      <Modal isOpen={modalInsertar}>
        <ModalHeader>Cargar documento</ModalHeader>
        <ModalBody>
          <div className="form-group">
            <label>Nombre documento: </label>
            <br />
            <input
              type="text"
              className="form-control"
              name="nom_doc"
              onChange={(e) => setNom(e.target.value)}
            />
            <br />
            <label>Usuario: </label>
            <br />
            <input
              type="text"
              className="form-control"
              name="nom_usu"
              onChange={(e) => setDescripcion(e.target.value)}
            />
            <br />
            <label>Informe personal: </label>
            <br />
            <input
              type="file"
              className="form-control"
              accept="archivo_per/*"
              onChange={(e) => setImagen(e.target.files[0])}
              multiple
            />
            <br />
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="success" size="lg" onClick={(e) => addImagen(e)}>
            Guardar
          </Button>
          <Button
            color="danger"
            size="lg"
            onClick={() => abrirCerrarModalInsertar()}
          >
            Cancelar
          </Button>
        </ModalFooter>
      </Modal>
      {/* MODAL INFORME */}
      <Modal isOpen={modalFoto}>
        <ModalHeader
          style={{ color: "white", background: "rgba(18, 80, 61, .85)" }}
        >
          Modificar Imagen
        </ModalHeader>
        <ModalBody>
          <div className="form-group">
            <label>Imagen Actual: </label>
            <br />
            <input
              type="text"
              className="form-control"
              name="nom_doc"
              onChange={(e) => setNom(e.target.value)}
            />
            <img
              src={"data:archivo_per/png;base64,"}
              className="img-fluid"
              alt="archivo_per"
            />
            <br />
            <label>Usuario: </label>
            <br />
            <input
              type="text"
              className="form-control"
              name="nom_usu"
              onChange={(e) => setDescripcion(e.target.value)}
            />
            <br />
            <label>Nueva Imagen: </label>
            <br />
            <input
              type="file"
              className="form-control"
              accept="archivo_per/*"
              onChange={(e) => setImagen(e.target.files[0])}
              multiple
            />
            <br />
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="success" size="lg" onClick={(e) => addImagen(e)}>
            Guardar
          </Button>
          <Button
            color="danger"
            size="lg"
            onClick={() => abrirCerrarModalFoto()}
          >
            Cancelar
          </Button>
        </ModalFooter>
      </Modal>
      {/* MODAL CONTRASEÑA */}
      <Modal isOpen={modalContra}>
        <ModalHeader
          style={{ color: "white", background: "rgba(18, 80, 61, .85)" }}
        >
          Modificar Contraseña
        </ModalHeader>
        <ModalBody>
          <div className="form-group">
            <label>Contraseña Actual: </label>
            <br />
            <input
              type="text"
              className="form-control"
              name="nom_doc"
              onChange={(e) => setNom(e.target.value)}
            />
            <br />
            <label>Contraseña Nueva: </label>
            <br />
            <input
              type="text"
              className="form-control"
              name="nom_usu"
              onChange={(e) => setDescripcion(e.target.value)}
            />
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="success" size="lg" onClick={(e) => addImagen(e)}>
            Guardar
          </Button>
          <Button
            color="danger"
            size="lg"
            onClick={() => abrirCerrarModalContra()}
          >
            Cancelar
          </Button>
        </ModalFooter>
      </Modal>
      <Outlet />
    </div>
  );
}

export default NavbarBec;
