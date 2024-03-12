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
import "../Bec/bec.scss";
import Swal from "sweetalert2";

function Informe2() {
  const [lista, setLista] = useState([]);
  const [descripcion, setDescripcion] = useState("");
  const [nom, setNom] = useState("");
  const [imagen, setImagen] = useState(null);

  useEffect(() => {
    getImagenes();
    peticionGetAdm();
  }, []);
  ////Datos usuario Administrador
  const [dataAdm, setDataAdm] = useState({});
  const peticionGetAdm = async () => {
    await axios
      .get(`https://bqef-bo.com/api/adm/contraadm.php`, {
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
  /////Listado informes
  async function getImagenes() {
    const res = await axios.get("https://bqef-bo.com/api/inf/");
    setLista(res.data);
    setTablaUsuarios(res.data);
    console.log(res.data);
  }
  /////Cargar informes
  async function addImagen(e) {
    e.preventDefault();
    let fd = new FormData();
    fd.append("archivo_per", imagen);
    fd.append("usu_creacion", dataAdm.id_adm);
    fd.append("nom_usu", descripcion);
    fd.append("nom_doc", nom);
    fd.append("f_cargado", usuarioSeleccionado.f_cargado);
    const res = await axios.post("https://bqef-bo.com/api/inf/", fd);
    console.log(res.data);
    abrirCerrarModalInsertar();

    mostrarAlertaN();
    getImagenes();
  }
  /////Eliminar patrocinador
  async function deleteImagen(id_doc) {
    const res = await axios.delete(
      "https://bqef-bo.com/api/inf/?id_doc=" + id_doc
    );
    abrirCerrarModalEliminar();
    mostrarAlertaD();
    getImagenes();
    console.log(res.data);
  }
  //General
  const [usuarioSeleccionado, setusuarioSeleccionado] = useState({
    id_doc: "",
    nom_doc: "",
    nom_usu: "",
    archivo_per: "",
    f_cargado: "",
  });
  const seleccionarUsuario = (Usuario, caso) => {
    setusuarioSeleccionado(Usuario);

    caso === "Editar" ? abrirCerrarModalVer() : abrirCerrarModalEliminar();
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setusuarioSeleccionado((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    console.log(usuarioSeleccionado);
  };
  //modal insertar
  const [modalInsertar, setModalInsertar] = useState(false);
  const abrirCerrarModalInsertar = () => {
    setModalInsertar(!modalInsertar);
  };
  //modal eliminar
  const [modalEliminar, setModalEliminar] = useState(false);
  const abrirCerrarModalEliminar = () => {
    setModalEliminar(!modalEliminar);
  };
  //modal ver
  const [modalVer, setModalVer] = useState(false);
  const abrirCerrarModalVer = () => {
    setModalVer(!modalVer);
  };
  ////
  const handleDescargarPdf = async () => {
    var link = document.createElement("a");
    // Se agregan los prefijos de href para indicar que el contenido que sigue está en formato PDF y
    // está codificado en Base64.
    link.setAttribute(
      "href",
      "data:application/pdf;base64," + usuarioSeleccionado.archivo_per
    );
    link.setAttribute("download", usuarioSeleccionado.nom_doc);
    link.click();
  };
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
        elemento.nom_usu
          .toString()
          .toLowerCase()
          .includes(terminoBusqueda.toLowerCase())
      ) {
        return elemento;
      }
    });
    setLista(resultadosBusqueda);
  };
  var cont = 1;
  ////ALERTAS
  const mostrarAlertaN = () => {
    Swal.fire({
      confirmButtonColor: "#2E8B57",
      title: "Éxito!",
      text: "Documento cargado",
      timer: 5000,
      icon: "success",
    });
  };
  const mostrarAlertaD = () => {
    Swal.fire({
      confirmButtonColor: "#2E8B57",
      title: "Eliminado!",
      text: "Documento Eliminado.",
      timer: 5000,
      icon: "success",
    });
  };
  return (
    <div id="main_content">
      <div className="tra">
        <div className="tra title-form">
          <h2 className>Listado Informes</h2>
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
            placeholder="Búsqueda por Nombre documento o Nombre usuario"
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
              <th>Nombre documento</th>
              <th>Usuario</th>
              <th>Fecha cargado</th>
              {/* <th>Archivo</th> */}
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {lista.map((item, index) => (
              <tr className="text-center" key={item.id_doc}>
                <td>{index + 1}</td>
                <td>{item.nom_doc}</td>
                <td>{item.nom_usu}</td>
                <td>{item.f_cargado}</td>
                <td>
                  <Button
                    color="warning"
                    onClick={() => seleccionarUsuario(item, "Editar")}>
                    <FaIcons.FaRegEye />
                    &nbsp;&nbsp;Visualizar
                  </Button>
                  &nbsp;&nbsp;&nbsp;
                  <Button
                    color="danger"
                    onClick={() => seleccionarUsuario(item, "Eliminar")}>
                    Eliminar
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        <Modal isOpen={modalInsertar}>
          <ModalHeader className="header_mo">Cargar documento</ModalHeader>
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
                onChange={(e) => setDescripcion(e.target.value)}
              />
              <br />
              <Label>Informe personal: </Label>
              <br />
              <Input
                type="file"
                className="form-control"
                accept="archivo_per/*"
                onChange={(e) => setImagen(e.target.files[0])}
                multiple
              />
              <br />
              <Label>Fecha cargado: </Label>
              <br />
              <Input
                type="datetime-local"
                className="form-control"
                name="f_cargado"
                onChange={handleChange}
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

        <Modal isOpen={modalEliminar}>
          <ModalHeader className="header_mo">Eliminar comunicado</ModalHeader>
          <ModalBody>
            ¿Estás seguro que deseas eliminar el documento{" "}
            {usuarioSeleccionado && usuarioSeleccionado.nom_doc}?
          </ModalBody>
          <ModalFooter>
            <Button
              color="success"
              size="lg"
              onClick={() => deleteImagen(usuarioSeleccionado.id_doc)}>
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

        {/* Modal VER */}
        <Modal isOpen={modalVer} size="xl">
          <ModalHeader close={closeBtn} className="header_mo">
            {usuarioSeleccionado && usuarioSeleccionado.nom_doc}
          </ModalHeader>
          <ModalBody>
            <Card>
              <CardBody className="p-0">
                <Row className="justify-content-center">
                  <object
                    data={
                      "data:application/pdf;base64," +
                      usuarioSeleccionado.archivo_per
                    }
                    type="application/pdf"
                    alt="archivo_per"
                    width="400"
                    height="600">
                    <p>
                      Tu navegador no puede mostrar este archivo PDF. Puedes
                      descargarlo
                      <a
                        href={
                          "data:application/pdf;base64," +
                          usuarioSeleccionado.archivo_per
                        }
                        download>
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
              onClick={handleDescargarPdf}>
              <FaIcons.FaDownload />
              Download
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    </div>
  );
}

export default Informe2;
