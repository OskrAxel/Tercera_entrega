import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "reactstrap";
import { Table, Button } from "reactstrap";
import * as FaIcons from "react-icons/fa";
import axios from "axios";
import "../Bec/bec.scss";
import { Link } from "react-router-dom";

function Evalua() {
  const baseUrl = "http://localhost:80/api/bec/";
  const [data, setData] = useState([]);
  const [modalEditar, setModalEditar] = useState(false);
  const [usuarioSeleccionado, setusuarioSeleccionado] = useState({
    id: "",
    nombre: "",
    apellido: "",
    email: "",
    contrasena: "",
    celular: "",
    carrera: "",
    anio: "",
    nom_pad: "",
    nom_mad: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setusuarioSeleccionado((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    console.log(usuarioSeleccionado);
  };

  const abrirCerrarModalEditar = () => {
    setModalEditar(!modalEditar);
  };

  const peticionGet = async () => {
    await axios
      .get(baseUrl)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const peticionPut = async () => {
    var f = new FormData();
    f.append("nombre", usuarioSeleccionado.nombre);
    f.append("apellido", usuarioSeleccionado.apellido);
    f.append("email", usuarioSeleccionado.email);
    f.append("contrasena", usuarioSeleccionado.contrasena);
    f.append("celular", usuarioSeleccionado.celular);
    f.append("carrera", usuarioSeleccionado.carrera);
    f.append("anio", usuarioSeleccionado.anio);
    f.append("nom_pad", usuarioSeleccionado.nom_pad);
    f.append("nom_mad", usuarioSeleccionado.nom_mad);
    f.append("METHOD", "PUT");
    await axios
      .post(baseUrl, f, { params: { id: usuarioSeleccionado.id } })
      .then((response) => {
        var dataNueva = data;
        dataNueva.map((Usuario) => {
          if (Usuario.id === usuarioSeleccionado.id) {
            Usuario.nombre = usuarioSeleccionado.nombre;
            Usuario.apellido = usuarioSeleccionado.apellido;
            Usuario.email = usuarioSeleccionado.email;
            Usuario.contrasena = usuarioSeleccionado.contrasena;
            Usuario.celular = usuarioSeleccionado.celular;
            Usuario.carrera = usuarioSeleccionado.carrera;
            Usuario.anio = usuarioSeleccionado.anio;
            Usuario.nom_pad = usuarioSeleccionado.nom_pad;
            Usuario.nom_mad = usuarioSeleccionado.nom_mad;
          }
        });
        setData(dataNueva);
        abrirCerrarModalEditar();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  /////
  const seleccionarUsuario = (Usuario, caso) => {
    abrirCerrarModalEditar();
  };

  useEffect(() => {
    peticionGet();
  }, []);

  return (
    <div id="main_content">
      <div className="tra">
        <div className="tra title-form">
          <h2 className>Listado Becarios</h2>
        </div>
        <div id="subt">
          <Link
            to={"http://localhost:80/api/PDF/reporte_pdf_becarios.php"}
            target="_blank"
          >
            <Button color="primary" size="lg">
              <FaIcons.FaFileDownload /> Reporte
            </Button>
          </Link>
        </div>
        <br />
        <br />
        <Table responsive="sm" id="tabl">
          <thead>
            <tr className="text-center tra title-form">
              <th>#</th>
              <th>Nombre Completo</th>
              <th>Correo</th>
              <th>Telf/Cel</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {data.map((Usuario) => (
              <tr className="text-center" key={Usuario.id}>
                <td>{Usuario.id}</td>
                <td>
                  {Usuario.nombre} {Usuario.apellido}
                </td>
                <td>{Usuario.email}</td>
                <td>{Usuario.celular}</td>
                <td>
                  <button
                    className="btn btn-secondary"
                    onClick={() => seleccionarUsuario(Usuario, "Editar")}
                  >
                    EVALUAR
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        <Modal isOpen={modalEditar}>
          <ModalHeader
            style={{ color: "white", background: "rgba(18, 80, 61, .85)" }}
          >
            Evaluar Becario
          </ModalHeader>
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
              <label>Apellidos: </label>
              <br />
              <input
                type="text"
                className="form-control"
                name="apellido"
                onChange={handleChange}
                value={usuarioSeleccionado && usuarioSeleccionado.apellido}
              />
              <br />
              <FormGroup tag="fieldset">
                <legend>Radio Buttons</legend>
                <FormGroup check>
                  <Input name="radio1" type="radio" />{" "}
                  <Label check>
                    Option one is this and that—be sure to include why it‘s
                    great
                  </Label>
                </FormGroup>
                <FormGroup check>
                  <Input name="radio1" type="radio" />{" "}
                  <Label check>
                    Option two can be something else and selecting it will
                    deselect option one
                  </Label>
                </FormGroup>
                <FormGroup check disabled>
                  <Input disabled name="radio1" type="radio" />{" "}
                  <Label check>Option three is disabled</Label>
                </FormGroup>
              </FormGroup>
            </div>
          </ModalBody>
          <ModalFooter>
            <button className="btn btn-success" onClick={() => peticionPut()}>
              GUARDAR
            </button>
            {"   "}
            <button
              className="btn btn-danger"
              onClick={() => abrirCerrarModalEditar()}
            >
              Cancelar
            </button>
          </ModalFooter>
        </Modal>
      </div>
    </div>
  );
}

export default Evalua;
