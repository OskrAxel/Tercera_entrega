import React, { useState, useEffect } from "react";
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
  CardImg,
  Input,
} from "reactstrap";
import { Outlet, useNavigate } from "react-router-dom";
import SidebarBec from "./SidebarBec";
import Swal from "sweetalert2";

function NavbarBec(args) {
  ////
  const [data, setData] = useState({
    id: "",
    contrasena: "",
    contrasena_lit: "",
    id_bec: "",
  });

  const [modalContra, setModalContra] = useState(false);
  const abrirCerrarModalContra = () => {
    setModalContra(!modalContra);
  };

  const [modalFoto, setModalFoto] = useState(false);
  const abrirCerrarModalFoto = () => {
    setModalFoto(!modalFoto);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    console.log(data);
  };
  ////CONTRASEÑA
  const peticionGet = async () => {
    await axios
      .get(`http://localhost:80/api/bec/contrabec.php`, {
        params: {
          id: localStorage.getItem("iduser"),
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
  ////RECARGAR URL
  const act = () => {
    window.location.reload();
  };
  ////LOGOUT
  const naviget = useNavigate();
  function logoutSubmit() {
    localStorage.setItem("login", "");
    localStorage.setItem("loginStatus", "Cierre de sesión satisfactoria!");
    naviget("/LoginBec");
  }
  const iduser = localStorage.getItem("iduser");

  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);
  ////
  // const [descripcion, setDescripcion] = useState("");
  const [nom, setNom] = useState("");
  const [imagen, setImagen] = useState(null);
  ////CARGAR ARCHIVO
  async function addImagen(e) {
    e.preventDefault();
    let fd = new FormData();
    fd.append("archivo_per", imagen);
    fd.append("id_bec", data.id_bec);
    fd.append("nom_usu", data.nombre + " " + data.apellido);
    fd.append("nom_doc", nom);
    const res = await axios.post("http://localhost:80/api/inf/", fd);
    console.log(res.data);
    abrirCerrarModalInsertar();
    mostrarAlertaC();
  }
  const [modalInsertar, setModalInsertar] = useState(false);
  const abrirCerrarModalInsertar = () => {
    setModalInsertar(!modalInsertar);
  };
  ////LEER CONTRASEÑA LITERAL MYSQL
  const peticionPutContra = async () => {
    var f = new FormData();

    f.append("contrasena", data.contrasena);
    f.append("contrasena_lit", data.contrasena_lit);
    f.append("METHOD", "PUT");
    await axios
      .post(`http://localhost:80/api/bec/contrabec.php`, f, {
        params: { idb: data.id },
      })
      .then((response) => {
        setData(response);
        mostrarAlertaPA();
        abrirCerrarModalContra();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    peticionGet();
  }, []);
  ////MOSTRAR IMAGEN
  const [lista, setLista] = useState([]);

  useEffect(() => {
    getImagenes();
  }, []);
  ////MOSTRAR IMAGEN DE PERFIL
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
  ////CAMBIAR IMAGEN PERFIL
  const [imagenP, setImagenP] = useState(null);

  const peticionPuti = async () => {
    var f = new FormData();
    f.append("archivo_foto", imagenP);
    f.append("METHOD", "PUT");
    await axios
      .post(`http://localhost:80/api/bec/foto.php`, f, {
        params: { id: data.id },
      })
      .then((response) => {
        setData(response);
        abrirCerrarModalFoto();
        mostrarAlertaF();
        getImagenes();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  ////ALERTAS
  const mostrarAlertaC = () => {
    Swal.fire({
      confirmButtonColor: "#2E8B57",
      title: "Éxito!",
      text: "Documento Cargado.",
      timer: 5000,
      icon: "success",
    });
  };
  const mostrarAlertaF = () => {
    Swal.fire({
      confirmButtonColor: "#2E8B57",
      title: "Éxito!",
      text: "Foto Actualizada",
      timer: 5000,
      icon: "success",
    });
  };
  const mostrarAlertaPA = () => {
    Swal.fire({
      confirmButtonColor: "#2E8B57",
      title: "Éxito!",
      text: "Constraseña Actualizada",
      timer: 5000,
      icon: "success",
    });
  };
  return (
    <div>
      <Navbar expand="md" {...args}>
        <SidebarBec />
        <NavbarBrand href="/registro" className="text-light">
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
                style={{
                  marginTop: "5px",
                }}
                color="warning"
                onClick={() => abrirCerrarModalInsertar()}>
                <FaIcons.FaPlus /> ENVIAR INF
              </Button>
            </NavItem>
            <>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</>
            <NavItem>
              {lista.map((item) => (
                <div key={item.id}>
                  <CardImg
                    className="rounded-circle"
                    alt="Card image cap"
                    src={" data:image/png;base64," + item.foto}
                    style={{
                      height: 50,
                      width: 50,
                      marginTop: "2px",
                      border: "5px solid rgba(10, 49, 67, 0.9)",
                    }}
                    width="100%"
                    onClick={() => abrirCerrarModalFoto()}
                  />
                </div>
              ))}
            </NavItem>
            <>&nbsp;&nbsp;&nbsp;</>
            {/* //REVISAR */}
            <NavbarText className="text-light">{iduser}</NavbarText>
            <>&nbsp;&nbsp;&nbsp;</>
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
                <DropdownItem href="http://www.bqef.org/" target="_blank">
                  Sobre Nosotros...
                </DropdownItem>
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
        <ModalHeader
          style={{ color: "white", background: "rgba(18, 80, 61, .85)" }}>
          Cargar documento
        </ModalHeader>
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
              disabled
              type="text"
              className="form-control"
              name="nom_usu"
              value={data.nombre + " " + data.apellido}
              // onChange={(e) => setDescripcion(e.target.value)}
            />
            <br />
            <label>ID Usuario: </label>
            <br />
            <input
              disabled
              type="text"
              className="form-control"
              name="id_bec"
              value={data.id_bec}
              // onChange={(e) => setDescripcion(e.target.value)}
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
            onClick={() => abrirCerrarModalInsertar()}>
            Cancelar
          </Button>
        </ModalFooter>
      </Modal>

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

      {/* MODAL FOTO */}
      <Modal isOpen={modalFoto}>
        <ModalHeader
          style={{ color: "white", background: "rgba(18, 80, 61, .85)" }}>
          Modificar Foto Perfil
        </ModalHeader>
        <ModalBody>
          <div className="form-group">
            <label>Foto Actual: </label>
            <br />
            {lista.map((item) => (
              <div key={item.id}>
                <CardImg
                  className="rounded-circle"
                  alt="Card image cap"
                  src={" data:image/png;base64," + item.foto}
                  style={{
                    height: 200,
                    width: 200,
                    marginLeft: "28%",
                    border: "5px solid rgba(1, 67, 59, 1)",
                  }}
                  width="100%"
                />
              </div>
            ))}
            <br />
            <label>Nueva Foto: </label>
            <br />
            <Input
              type="file"
              className="form-control"
              accept="archivo_foto/*"
              onChange={(e) => setImagenP(e.target.files[0])}
              multiple
            />
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            className="btn btn-success"
            size="lg"
            onClick={() => peticionPuti()}>
            Guardar
          </Button>
          <Button
            color="danger"
            size="lg"
            onClick={() => abrirCerrarModalFoto()}>
            Cancelar
          </Button>
        </ModalFooter>
      </Modal>
      <Outlet />
    </div>
  );
}

export default NavbarBec;
