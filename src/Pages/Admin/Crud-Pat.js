import React, { useState, useEffect } from "react";
import { Input, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { Table, Button } from "reactstrap";
import * as FaIcons from "react-icons/fa";
import axios from "axios";
import "../Bec/bec.scss";
import Swal from "sweetalert2";

function ListUserPat() {
  const baseUrl = "http://localhost:80/api/pat/";
  const [data, setData] = useState([]);
  const [modalInsertar, setModalInsertar] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);
  const [usuarioSeleccionado, setusuarioSeleccionado] = useState({
    id: "",
    nombre: "",
    pais: "",
    email: "",
    direccion: "",
    celular: "",
    institucion: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setusuarioSeleccionado((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    console.log(usuarioSeleccionado);
  };

  const abrirCerrarModalInsertar = () => {
    setModalInsertar(!modalInsertar);
  };

  const abrirCerrarModalEditar = () => {
    setModalEditar(!modalEditar);
  };

  const abrirCerrarModalEliminar = () => {
    setModalEliminar(!modalEliminar);
  };
  const act = () => {
    window.location.reload();
  };
  ////Datos usuario Administrador
  const [dataAdm, setDataAdm] = useState({});
  const peticionGetAdm = async () => {
    await axios
      .get(`http://localhost:80/api/adm/contraadm.php`, {
        params: {
          id: localStorage.getItem("user"),
        },
      })
      .then((response) => {
        console.log(response.data);
        setDataAdm(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  /////Listado usuarios patrocinador
  const peticionGet = async () => {
    await axios
      .get(baseUrl)
      .then((response) => {
        setData(response.data);
        setTablaUsuarios(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  /////Crear Usuario patrocinador
  const peticionPost = async () => {
    var f = new FormData();
    f.append("nombre", usuarioSeleccionado.nombre);
    f.append("id_pat", usuarioSeleccionado.id_pat);
    f.append("pais", usuarioSeleccionado.pais);
    f.append("email", usuarioSeleccionado.email);
    f.append("direccion", usuarioSeleccionado.direccion);
    f.append("celular", usuarioSeleccionado.celular);
    f.append("usu_creacion", dataAdm.id_adm);
    f.append("institucion", usuarioSeleccionado.institucion);
    f.append("METHOD", "POST");
    await axios
      .post(baseUrl, f)
      .then((response) => {
        setData(data.concat(response.data));
        abrirCerrarModalInsertar();
        mostrarAlertaN();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  /////Modificar Usuario patrocinador
  const peticionPut = async () => {
    var f = new FormData();
    f.append("nombre", usuarioSeleccionado.nombre);
    f.append("pais", usuarioSeleccionado.pais);
    f.append("email", usuarioSeleccionado.email);
    f.append("direccion", usuarioSeleccionado.direccion);
    f.append("celular", usuarioSeleccionado.celular);
    f.append("usu_modificacion", dataAdm.id_adm);
    f.append("institucion", usuarioSeleccionado.institucion);
    f.append("METHOD", "PUT");
    await axios
      .post(baseUrl, f, { params: { id: usuarioSeleccionado.id } })
      .then((response) => {
        var dataNueva = data;
        dataNueva.map((Usuario) => {
          if (Usuario.id === usuarioSeleccionado.id) {
            Usuario.nombre = usuarioSeleccionado.nombre;
            Usuario.pais = usuarioSeleccionado.pais;
            Usuario.email = usuarioSeleccionado.email;
            Usuario.direccion = usuarioSeleccionado.direccion;
            Usuario.celular = usuarioSeleccionado.celular;
            Usuario.institucion = usuarioSeleccionado.institucion;
          }
        });
        setData(dataNueva);
        abrirCerrarModalEditar();
        mostrarAlertaU();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  /////Eliminar Usuario patrocinador
  const peticionDelete = async () => {
    var f = new FormData();
    f.append("usu_modificacion", dataAdm.id_adm);
    f.append("METHOD", "DELETE");
    await axios
      .post(baseUrl, f, { params: { id: usuarioSeleccionado.id } })
      .then((response) => {
        setData(
          data.filter((Usuario) => Usuario.id !== usuarioSeleccionado.id)
        );
        abrirCerrarModalEliminar();
        mostrarAlertaD();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const seleccionarUsuario = (Usuario, caso) => {
    setusuarioSeleccionado(Usuario);

    caso === "Editar" ? abrirCerrarModalEditar() : abrirCerrarModalEliminar();
  };

  useEffect(() => {
    peticionGet();
    peticionGetAdm();
  }, []);
  ////BARRA BUSQUEDA
  const [busqueda, setBusqueda] = useState("");
  const [tablaUsuarios, setTablaUsuarios] = useState([]);
  // const [usuarios, setUsuarios] = useState([]);

  const handleChangeB = (e) => {
    setBusqueda(e.target.value);
    filtrar(e.target.value);
  };

  const filtrar = (terminoBusqueda) => {
    var resultadosBusqueda = tablaUsuarios.filter((elemento) => {
      if (
        elemento.nombre
          .toString()
          .toLowerCase()
          .includes(terminoBusqueda.toLowerCase()) ||
        elemento.email
          .toString()
          .toLowerCase()
          .includes(terminoBusqueda.toLowerCase()) ||
        elemento.institucion
          .toString()
          .toLowerCase()
          .includes(terminoBusqueda.toLowerCase())
      ) {
        return elemento;
      }
    });
    setData(resultadosBusqueda);
  };
  var cont = 1;
  ////ALERTAS
  const mostrarAlertaN = () => {
    Swal.fire({
      confirmButtonColor: "#2E8B57",
      title: "Éxito!",
      text: "Nuevo usuario registrado correctamente.",
      timer: 5000,
      icon: "success",
    });
  };
  const mostrarAlertaU = () => {
    Swal.fire({
      confirmButtonColor: "#2E8B57",
      title: "Éxito!",
      text: "Usuario Modificado.",
      timer: 5000,
      icon: "info",
    });
  };
  const mostrarAlertaD = () => {
    Swal.fire({
      confirmButtonColor: "#2E8B57",
      title: "Eliminado!",
      text: "Usuario Eliminado.",
      timer: 5000,
      icon: "success",
    });
  };
  return (
    <div id="main_content">
      <div className="tra">
        <div className="tra title-form">
          <h2 className>Listado Patrocinadores</h2>
        </div>
        <div id="subt">
          <Button
            color="success"
            size="lg"
            onClick={() => abrirCerrarModalInsertar()}>
            <FaIcons.FaPlus /> Añadir
          </Button>
        </div>
        <div className="containerInput">
          <Input
            className="form-control inputBuscar"
            size="lg"
            value={busqueda}
            placeholder="Búsqueda por Nombre, Email o Institución"
            onChange={handleChangeB}
          />
          <Button className="btn btn-success" size="lg">
            <FaIcons.FaSearch /> Buscar
          </Button>
        </div>
        <br />
        <Table responsive="sm" id="tabl">
          <thead id="stahead">
            <tr className="text-center">
              <th>#</th>
              <th>Nombres</th>
              <th>ID Patrocinador</th>
              <th>Pais</th>
              <th>Correo</th>
              <th>Direccion</th>
              <th>Celular</th>
              <th>Institucion</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {data.map((Usuario) => (
              <tr className="text-center" key={Usuario.id}>
                <td>{cont++}</td>
                <td>{Usuario.nombre}</td>
                <td>{Usuario.id_pat}</td>
                <td>{Usuario.pais}</td>
                <td>{Usuario.email}</td>
                <td>{Usuario.direccion}</td>
                <td>{Usuario.celular}</td>
                <td>{Usuario.institucion}</td>
                <td>
                  <button
                    className="btn btn-warning"
                    onClick={() => seleccionarUsuario(Usuario, "Editar")}>
                    Editar
                  </button>{" "}
                  {"  "}
                  <button
                    className="btn btn-danger"
                    onClick={() => seleccionarUsuario(Usuario, "Eliminar")}>
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        <Modal isOpen={modalInsertar}>
          <ModalHeader className="header_mo">Insertar Patrocinador</ModalHeader>
          <ModalBody>
            <div className="form-group">
              <label>Nombres: </label>
              <br />
              <input
                type="text"
                className="form-control"
                name="nombre"
                onChange={handleChange}
              />
              <br />
              <label>Id Usuario: </label>
              <br />
              <input
                type="text"
                className="form-control"
                name="id_pat"
                onChange={handleChange}
              />
              <br />
              <label>Pais: </label>
              <br />
              <input
                type="text"
                className="form-control"
                name="pais"
                onChange={handleChange}
              />
              <br />
              <label>Correo: </label>
              <br />
              <input
                type="text"
                className="form-control"
                name="email"
                onChange={handleChange}
              />
              <br />
              <label>Direccion: </label>
              <br />
              <input
                type="text"
                className="form-control"
                name="direccion"
                onChange={handleChange}
              />
              <br />
              <label>Celular: </label>
              <br />
              <input
                type="text"
                className="form-control"
                name="celular"
                onChange={handleChange}
              />
              <br />
              <label>Institucion: </label>
              <br />
              <input
                type="text"
                className="form-control"
                name="institucion"
                onChange={handleChange}
              />
              <br />
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="success" size="lg" onClick={() => peticionPost()}>
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

        <Modal isOpen={modalEditar}>
          <ModalHeader className="header_mo">Editar Usuario</ModalHeader>
          <ModalBody>
            <div className="form-group">
              <label>Nombres: </label>
              <br />
              <input
                type="text"
                className="form-control"
                name="nombre"
                onChange={handleChange}
                value={usuarioSeleccionado && usuarioSeleccionado.nombre}
              />
              <br />
              <label>paiss: </label>
              <br />
              <input
                type="text"
                className="form-control"
                name="pais"
                onChange={handleChange}
                value={usuarioSeleccionado && usuarioSeleccionado.pais}
              />
              <br />
              <label>Correo: </label>
              <br />
              <input
                type="text"
                className="form-control"
                name="email"
                onChange={handleChange}
                value={usuarioSeleccionado && usuarioSeleccionado.email}
              />
              <br />
              <label>Direccion: </label>
              <br />
              <input
                type="text"
                className="form-control"
                name="direccion"
                onChange={handleChange}
                value={usuarioSeleccionado && usuarioSeleccionado.direccion}
              />
              <br />
              <label>Celular: </label>
              <br />
              <input
                type="text"
                className="form-control"
                name="celular"
                onChange={handleChange}
                value={usuarioSeleccionado && usuarioSeleccionado.celular}
              />
              <br />
              <label>Institucion: </label>
              <br />
              <input
                type="text"
                className="form-control"
                name="institucion"
                onChange={handleChange}
                value={usuarioSeleccionado && usuarioSeleccionado.institucion}
              />
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="success" size="lg" onClick={() => peticionPut()}>
              Editar
            </Button>
            <Button
              color="danger"
              size="lg"
              onClick={() => abrirCerrarModalEditar()}>
              Cancelar
            </Button>
          </ModalFooter>
        </Modal>

        <Modal isOpen={modalEliminar}>
          <ModalHeader className="header_mo">Eliminar comunicado</ModalHeader>
          <ModalBody>
            ¿Estás seguro que deseas eliminar el Usuario{" "}
            {usuarioSeleccionado && usuarioSeleccionado.nombre}?
          </ModalBody>
          <ModalFooter>
            <Button color="success" size="lg" onClick={() => peticionDelete()}>
              Sí
            </Button>
            <Button
              color="danger"
              size="lg"
              onClick={() => abrirCerrarModalEliminar()}>
              No
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    </div>
  );
}

export default ListUserPat;
