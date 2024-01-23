import React, { useState, useEffect } from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { Table, Button } from "reactstrap";
import * as FaIcons from "react-icons/fa";
import axios from "axios";

const CargaDoc = () => {
  const abrirCerrarModalInsertar = () => {
    setModalInsertar(!modalInsertar);
  };
  //modal ver

  const [modalVer, setModalVer] = useState(false);
  const abrirCerrarModalVer = () => {
    setModalVer(!modalVer);
  };

  const [usuarioSeleccionado, setusuarioSeleccionado] = useState({
    id_doc: "",
    nom_doc: "",
    nom_usu: "",
    archivo_per: "",
    f_cargado: "",
  });
  useEffect(() => {
    getImagenes();
  }, []);

  async function getImagenes() {
    const res = await axios.get("http://localhost:80/api/inf/");
    setLista(res.data);
    console.log(res.data);
  }
  //modal editar
  const [modalEditar, setModalEditar] = useState(false);
  const abrirCerrarModalEditar = () => {
    setModalEditar(!modalEditar);
  };
  //modal eliminar

  const [modalEliminar, setModalEliminar] = useState(false);
  const abrirCerrarModalEliminar = () => {
    setModalEliminar(!modalEliminar);
  };
  const seleccionarUsuario = (Usuario, caso) => {
    setusuarioSeleccionado(Usuario);

    caso === "Editar" ? abrirCerrarModalEditar() : abrirCerrarModalEliminar();
  };

  async function deleteImagen(id_doc) {
    const res = await axios.delete(
      "http://localhost:80/api/inf/?id_doc=" + id_doc
    );
    abrirCerrarModalEliminar();
    getImagenes();
    console.log(res.data);
  }

  const [lista, setLista] = useState([]);
  const [data, setData] = useState([]);
  const [modalInsertar, setModalInsertar] = useState(false);
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
            onClick={() => abrirCerrarModalInsertar()}>
            <FaIcons.FaFileDownload /> Reporte
          </Button>
          <Button
            style={{ float: "right" }}
            color="success"
            size="lg"
            onClick={() => abrirCerrarModalInsertar()}>
            <FaIcons.FaPlus /> Añadir
          </Button>
        </div>
        <br />
        <Table responsive="sm" id="tabl">
          <thead>
            <tr className="text-center tra title-form">
              <th>Nombre documento</th>
              <th>Fecha cargado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {lista.map((item) => (
              <tr className="text-center" key={item.id_doc}>
                {/* <td>{item.id_doc}</td> */}
                <td>{item.nom_doc}</td>
                <td>{item.f_cargado}</td>
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
                    onClick={() => abrirCerrarModalVer()}>
                    Descargar
                  </button>{" "}
                  <button
                    className="btn btn-warning"
                    onClick={() => seleccionarUsuario(item, "Editar")}>
                    Visualizar
                  </button>{" "}
                  <button
                    className="btn btn-danger"
                    onClick={() => seleccionarUsuario(item, "Eliminar")}>
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default CargaDoc;
