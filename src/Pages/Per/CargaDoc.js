import React, { useState, useEffect } from "react";
import {
  Card,
  CardBody,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "reactstrap";
import { Table, Button, Label, Input, Row } from "reactstrap";
import * as FaIcons from "react-icons/fa";
import axios from "axios";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const CargaDoc = () => {
  const [detalle, setDetalle] = useState("");
  const [nom, setNom] = useState("");

  const [comunicado, setComunicado] = useState(null);

  const abrirCerrarModalInsertar = () => {
    setModalInsertar(!modalInsertar);
  };
  /////
  const [data, setData] = useState({
    id: "",
    contrasena: "",
    contrasena_lit: "",
  });
  const peticionGet = async () => {
    await axios
      .get(`http://localhost:80/api/per/contraper.php`, {
        params: {
          id: localStorage.getItem("user"),
        },
      })
      .then((response) => {
        console.log(response.data);
        setData(response.data);
        setTablaUsuarios(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  ////
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
    peticionGet();
  }, []);
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
    fd.append("archivo_com", comunicado);
    fd.append("detalle", detalle);
    fd.append("nom_doc", nom);
    fd.append("nom_usu", data.nombre + " " + data.apellido);
    const res = await axios.post("http://localhost:80/api/per/com/", fd);
    console.log(res.data);
    mostrarAlertaN();
    abrirCerrarModalInsertar();
    getComunicado();
  }
  const seleccionarUsuario = (Usuario, caso) => {
    setusuarioSeleccionado(Usuario);

    caso === "Editar" ? abrirCerrarModalVer() : abrirCerrarModalEliminar();
  };
  ////eliminar comunicado
  async function deleteComunicado(id_com) {
    const res = await axios.delete(
      "http://localhost:80/api/per/com/?id_com=" + id_com
    );
    abrirCerrarModalEliminar();
    getComunicado();
    mostrarAlertaD();
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
  ////PDF
  const handleDescargarPdf = async () => {
    var link = document.createElement("a");
    // Se agregan los prefijos de href para indicar que el contenido que sigue está en formato PDF y
    // está codificado en Base64.
    link.setAttribute(
      "href",
      "data:application/pdf;base64," + usuarioSeleccionado.archivo_com
    );
    link.setAttribute("download", usuarioSeleccionado.nom_doc);
    link.click();
  };
  ////
  const closeBtn = (
    <Button className="close" onClick={() => abrirCerrarModalVer()}>
      &times;
    </Button>
  );
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
        elemento.nom_doc
          .toString()
          .toLowerCase()
          .includes(terminoBusqueda.toLowerCase()) ||
        elemento.id_per
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
      text: "Registro Guardado.",
      timer: 5000,
      icon: "success",
    });
  };
  const mostrarAlertaD = () => {
    Swal.fire({
      confirmButtonColor: "#2E8B57",
      title: "Eliminado!",
      text: "Registro Eliminado.",
      timer: 5000,
      icon: "success",
    });
  };
  return (
    <div id="main_content">
      <div className="tra">
        <div className="tra title-form">
          <h2 className>Gestion Comunicados</h2>
        </div>
        <div id="subt">
          <Link
            to={"http://localhost:80/api/PDF/reporte_pdf_comunicados.php"}
            target="_blank"
          >
            <Button color="primary" size="lg">
              <FaIcons.FaFileDownload /> Reporte
            </Button>
          </Link>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <Button
            color="success"
            size="lg"
            onClick={() => abrirCerrarModalInsertar()}
          >
            <FaIcons.FaPlus /> Añadir
          </Button>
        </div>
        <div className="containerInput">
          <Input
            className="form-control inputBuscar"
            size="lg"
            value={busqueda}
            placeholder="Búsqueda por Nombre o ID Usuario"
            onChange={handleChangeB}
          />
          <Button className="btn btn-success" size="lg">
            <FaIcons.FaSearch /> Buscar
          </Button>
        </div>
        <br />
        <Table responsive="sm" id="tabl">
          <thead>
            <tr className="text-center tra title-form">
              <th>#</th>
              <th>Nombre documento</th>
              <th>ID Usuario</th>
              <th>Detalle</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {lista.map((item) => (
              <tr className="text-center" key={item.id_com}>
                <td>{cont++}</td>
                <td>{item.nom_doc}</td>
                <td>{item.id_per}</td>
                <td>{item.detalle}</td>
                <td>
                  <Button
                    color="warning"
                    onClick={() => seleccionarUsuario(item, "Editar")}
                  >
                    <FaIcons.FaRegEye />
                    &nbsp;&nbsp;Visualizar
                  </Button>
                  &nbsp;&nbsp;&nbsp;
                  <Button
                    color="danger"
                    onClick={() => seleccionarUsuario(item, "Eliminar")}
                  >
                    Eliminar
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        {/* Modal agregar comunicado */}
        <Modal isOpen={modalInsertar}>
          <ModalHeader className="header_m">Cargar documento</ModalHeader>
          <ModalBody>
            <div className="form-group">
              <Label>Nombre documento: </Label>
              <br />
              <Input
                type="text"
                className="form-control"
                name="nom_doc"
                onChange={(e) => setNom(e.target.value)}
              />
              <br />
              <Label>Usuario: </Label>
              <br />
              <Input
                disabled
                type="text"
                className="form-control"
                name="nom_usu"
                value={data.nombre + " " + data.apellido}
                // onChange={(e) => setNomusu(e.target.value)}
              />
              <br />
              <Label>Informe personal: </Label>
              <br />
              <Input
                type="file"
                className="form-control"
                accept="archivo_com/*"
                onChange={(e) => setComunicado(e.target.files[0])}
                multiple
              />
              <br />
              <Label>Detalle: </Label>
              <br />
              <textarea
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
          <ModalHeader className="header_m">Eliminar comunicado</ModalHeader>
          <ModalBody>
            ¿Estás seguro que deseas eliminar el documento{" "}
            {usuarioSeleccionado && usuarioSeleccionado.nom_doc}?
          </ModalBody>
          <ModalFooter>
            <Button
              color="success"
              size="lg"
              onClick={() => deleteComunicado(usuarioSeleccionado.id_com)}
            >
              Sí
            </Button>
            <Button
              color="danger"
              size="lg"
              onClick={() => abrirCerrarModalEliminar()}
            >
              No
            </Button>
          </ModalFooter>
        </Modal>

        {/* Modal VER */}
        <Modal isOpen={modalVer} size="xl">
          <ModalHeader className="header_m" close={closeBtn}>
            {usuarioSeleccionado && usuarioSeleccionado.nom_doc}
          </ModalHeader>
          <ModalBody>
            <Card>
              <CardBody className="p-0">
                <Row className="justify-content-center">
                  <object
                    data={
                      "data:application/pdf;base64," +
                      usuarioSeleccionado.archivo_com
                    }
                    type="application/pdf"
                    alt="archivo_per"
                    width="400"
                    height="600"
                  >
                    <p>
                      Tu navegador no puede mostrar este archivo PDF. Puedes
                      descargarlo
                      <a
                        href={
                          "data:application/pdf;base64," +
                          usuarioSeleccionado.archivo_com
                        }
                        download
                      >
                        aquí
                      </a>
                      .
                    </p>
                  </object>
                </Row>
              </CardBody>
            </Card>
          </ModalBody>
          <ModalFooter>
            <Button
              style={{ float: "right" }}
              color="success"
              size="lg"
              onClick={handleDescargarPdf}
            >
              <FaIcons.FaDownload />
              Download
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    </div>
  );
};

export default CargaDoc;
