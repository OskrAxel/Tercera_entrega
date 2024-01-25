import React, { useState, useEffect } from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { Table, Button } from "reactstrap";
import * as FaIcons from "react-icons/fa";
import axios from "axios";

const CargaDoc = () => {
  const user = localStorage.getItem("user");
  const [detalle, setDetalle] = useState("");
  const [nom, setNom] = useState("");
  const [nom_usu, setNomusu] = useState("");
  const [comunicado, setComunicado] = useState(null);

  const abrirCerrarModalInsertar = () => {
    setModalInsertar(!modalInsertar);
  };
  //modal ver
  const [modalVer, setModalVer] = useState(false);
  const abrirCerrarModalVer = () => {
    setModalVer(!modalVer);
  };
  const [usuarioSeleccionado, setusuarioSeleccionado] = useState({
    id_com: "",
    nom_doc: "",
    id_per: "",
    detalle: "",
    archivo_com: "",
  });
  useEffect(() => {
    getComunicado();
  }, []);
  ////
  const handleChange = (e) => {
    const { name, value } = e.target;
    setusuarioSeleccionado((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    console.log(usuarioSeleccionado);
  };
  ////Mostrar comunicados
  async function getComunicado() {
    const res = await axios.get("http://localhost:80/api/per/com/");
    setLista(res.data);
    console.log(res.data);
  }
  ////Agregar comunicado
  async function addComunicado(e) {
    e.preventDefault();
    let fd = new FormData();
    fd.append("archivo_per", comunicado);
    fd.append("detalle", detalle);
    fd.append("nom_doc", nom);
    fd.append("nom_usu", nom_usu);
    const res = await axios.post("http://localhost:80/api/per/com/", fd);
    console.log(res.data);
    abrirCerrarModalInsertar();
    getComunicado();
  }
  ////modal editar
  const [modalEditar, setModalEditar] = useState(false);
  const abrirCerrarModalEditar = () => {
    setModalEditar(!modalEditar);
  };
  const seleccionarUsuario = (Usuario, caso) => {
    setusuarioSeleccionado(Usuario);

    caso === "Editar" ? abrirCerrarModalEditar() : abrirCerrarModalEliminar();
  };
  ////eliminar comunicado
  async function deleteComunicado(id_com) {
    const res = await axios.delete(
      "http://localhost:80/api/per/com/?id_com=" + id_com
    );
    abrirCerrarModalEliminar();
    getComunicado();
    console.log(res.data);
  }
  ////
  const [lista, setLista] = useState([]);
  const [modalInsertar, setModalInsertar] = useState(false);
  //modal eliminar
  const [modalEliminar, setModalEliminar] = useState(false);
  const abrirCerrarModalEliminar = () => {
    setModalEliminar(!modalEliminar);
  };
  return (
    <div id="main_content">
      <div className="tra">
        <div className="tra title-form">
          <h2 className>Gestion Comunicados</h2>
        </div>
        <div id="subt">
          <Button
            color="primary"
            size="lg"
            onClick={() => abrirCerrarModalInsertar()}
          >
            <FaIcons.FaFileDownload /> Reporte
          </Button>
          <Button
            style={{ float: "right" }}
            color="success"
            size="lg"
            onClick={() => abrirCerrarModalInsertar()}
          >
            <FaIcons.FaPlus /> Añadir
          </Button>
        </div>
        <br />
        <Table responsive="sm" id="tabl">
          <thead>
            <tr className="text-center tra title-form">
              <th>Nombre documento</th>
              <th>ID Usuario</th>
              <th>Detalle</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {lista.map((item) => (
              <tr className="text-center" key={item.id_com}>
                {/* <td>{item.id_doc}</td> */}
                <td>{item.nom_doc}</td>
                <td>{item.id_per}</td>
                <td>{item.detalle}</td>
                {/* <td>
                  <img
                    src={"data:archivo_per/png;base64," + item.archivo_per}
                    className=""
                    alt="archivo_per"
                  />
                </td> */}
                <td>
                  <button
                    className="btn btn-success"
                    onClick={() => abrirCerrarModalVer()}
                  >
                    Descargar
                  </button>{" "}
                  <button
                    className="btn btn-warning"
                    onClick={() => seleccionarUsuario(item, "Editar")}
                  >
                    Visualizar
                  </button>{" "}
                  <button
                    className="btn btn-danger"
                    onClick={() => seleccionarUsuario(item, "Eliminar")}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        {/* Modal agregar comunicado */}
        <Modal isOpen={modalInsertar}>
          <ModalHeader
            style={{ color: "white", background: "rgba(18, 80, 61, .85)" }}
          >
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
                // onChange={(e) => setDescripcion(e.target.value)}
                value={user}
              />
              <br />
              <label>Informe personal: </label>
              <br />
              <input
                type="file"
                className="form-control"
                accept="archivo_per/*"
                onChange={(e) => setComunicado(e.target.files[0])}
                multiple
              />
              <br />
              <label>Detalle: </label>
              <br />
              <input
                type="text"
                className="form-control"
                name="detalle"
                onChange={(e) => setDetalle(e.target.value)}
              />
              <br />
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="success" size="lg" onClick={(e) => addComunicado(e)}>
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
        {/* Modal Eliminar */}
        <Modal isOpen={modalEliminar}>
          <ModalHeader
            style={{ color: "white", background: "rgba(18, 80, 61, .85)" }}
          >
            Eliminar comunicado
          </ModalHeader>
          <ModalBody>
            ¿Estás seguro que deseas eliminar el documento{" "}
            {usuarioSeleccionado && usuarioSeleccionado.nom_doc}?
          </ModalBody>
          <ModalFooter>
            <button
              className="btn btn-danger"
              onClick={() => deleteComunicado(usuarioSeleccionado.id_com)}
            >
              Sí
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => abrirCerrarModalEliminar()}
            >
              No
            </button>
          </ModalFooter>
        </Modal>
      </div>
    </div>
  );
};

export default CargaDoc;
