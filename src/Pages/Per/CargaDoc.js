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

const CargaDoc = () => {
  // const user = localStorage.getItem("user");
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
    fd.append("nom_usu", nom_usu);
    const res = await axios.post("http://localhost:80/api/per/com/", fd);
    console.log(res.data);
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
          <ModalHeader
            style={{ color: "white", background: "rgba(18, 80, 61, .85)" }}
          >
            Cargar documento
          </ModalHeader>
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
                type="text"
                className="form-control"
                name="nom_usu"
                onChange={(e) => setNomusu(e.target.value)}
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
          <ModalHeader
            close={closeBtn}
            style={{ color: "white", background: "rgba(18, 80, 61, .85)" }}
          >
            {usuarioSeleccionado && usuarioSeleccionado.nom_doc}
          </ModalHeader>
          <ModalBody>
            {/* <Row className="px-2 text-end d-flex justify-content-end">
              <Col
                lg={2}
                md={4}
                sm={2}
                xs={3}
                className="p-0 text-end d-flex align-items-center">
                <Button size="sm" color="success" onClick={handleDescargarPdf}>
                  <FaIcons.FaDownload />
                  Download
                </Button>
              </Col>
            </Row> */}
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
