import React, { useState, useEffect } from "react";
import "../navbar.scss";
import Logo from "../img/base/111.png";
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
  Input,
  Label,
} from "reactstrap";
import { Outlet, useNavigate } from "react-router-dom";
import SidebarPer from "./SidebarPer";
import Swal from "sweetalert2";

function NavbarBec(args) {
  ////
  const [data, setData] = useState({
    id: "",
    contrasena: "",
    contrasena_lit: "",
    nombre: "",
    apellido: "",
  });
  const [modalContra, setModalContra] = useState(false);
  const abrirCerrarModalContra = () => {
    setModalContra(!modalContra);
  };
  ////FECHA
  const [modalFecha, setModalFecha] = useState(false);
  const abrirCerrarModalFecha = () => {
    setModalFecha(!modalFecha);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    console.log(data);
  };
  ////Mostrar fecha
  const [usuarioSeleccionado, setusuarioSeleccionado] = useState({
    id_fech: "",
    fecha: "",
    fech_lit: "",
  });
  const handleChangefecha = (e) => {
    const { name, value } = e.target;
    setusuarioSeleccionado((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    console.log(usuarioSeleccionado);
  };
  /////Mostrar contraseña
  const peticionGetContraseña = async () => {
    await axios
      .get(`https://bqef-bo.com/api/per/contraper.php`, {
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
    naviget("/LoginPer");
  }
  // const user = localStorage.getItem("user");

  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);
  ////Modificar contraseña Personal Administrativo
  const peticionPutContra = async () => {
    var f = new FormData();
    f.append("contrasena", data.contrasena);
    f.append("contrasena_lit", data.contrasena_lit);
    f.append("METHOD", "PUT");
    await axios
      .post(`https://bqef-bo.com/api/per/contraper.php`, f, {
        params: { idb: data.id },
      })
      .then((response) => {
        setData(response);
        peticionGetContraseña();
        mostrarAlertaU();
        abrirCerrarModalContra();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  ////Mostrar fecha
  const [lista, setLista] = useState([]);
  const peticionGetFecha = async () => {
    await axios
      .get(`https://bqef-bo.com/api/per/fe/`)
      .then((response) => {
        console.log(response.data);
        setusuarioSeleccionado(response.data);
        setLista(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  ////Modificar Fecha
  async function addFecha(e) {
    e.preventDefault();
    let fd = new FormData();
    fd.append("fecha", usuarioSeleccionado.fecha);
    const res = await axios.post("https://bqef-bo.com/api/per/fe/", fd);
    console.log(res.data);
    mostrarAlertaFec();
    abrirCerrarModalFecha();
    act();
  }
  ////
  useEffect(() => {
    peticionGetFecha();
    peticionGetContraseña();
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
  const mostrarAlertaFec = () => {
    Swal.fire({
      confirmButtonColor: "#2E8B57",
      title: "Éxito!",
      text: "Fecha Actualizada.",
      timer: 5000,
      icon: "success",
    });
  };
  return (
    <div>
      <Navbar expand="md" {...args}>
        <SidebarPer />
        <NavbarBrand href="./ini" className="text-light">
          <img
            src={Logo}
            alt="logo"
            className="me-2"
            style={{
              height: 60,
              width: 120,
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
              {data.apellido}
            </NavbarText>
            <UncontrolledDropdown nav direction="down">
              <DropdownToggle nav caret className="text-light">
                MENU
              </DropdownToggle>
              <DropdownMenu className="drop-menu">
                <DropdownItem href="./pdfman" target="_blank">
                  Instrucciones
                </DropdownItem>
                <DropdownItem href="./Pdf2" target="_blank">
                  Postulacion
                </DropdownItem>
                <DropdownItem onClick={() => abrirCerrarModalFecha()}>
                  Fecha Entrega
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
        <ModalHeader className="header_mo">Editar Contraseña</ModalHeader>
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
            Guardar
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

      {/* MODAL FECHA */}
      <Modal isOpen={modalFecha}>
        <ModalHeader className="header_mo">
          Establecer Fecha Entrega
        </ModalHeader>
        <ModalBody>
          <div className="form-group">
            <Label>Fecha Establecida: </Label>
            {lista.map((item) => (
              <h2 className="text-center" key={item.id_fech}>
                "{item.fech_lit}"
              </h2>
            ))}
            <Label>Nueva Fecha: </Label>
            <br />
            <Input
              type="datetime-local"
              className="form-control"
              name="fecha"
              onChange={handleChangefecha}
            />
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="success" size="lg" onClick={(e) => addFecha(e)}>
            Guardar
          </Button>
          {"   "}
          <Button
            color="danger"
            size="lg"
            onClick={() => abrirCerrarModalFecha()}>
            Cancelar
          </Button>
        </ModalFooter>
      </Modal>
      <Outlet />
    </div>
  );
}

export default NavbarBec;
