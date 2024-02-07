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
import axios, { Axios } from "axios";
import "../Bec/bec.scss";
import { Link } from "react-router-dom";

function Evalua() {
  const baseUrl = "http://localhost:80/api/bec/";
  const [data, setData] = useState([]);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);
  const [usuarioSeleccionado, setusuarioSeleccionado] = useState({
    id: "",
    nombre: "",
    apellido: "",
    email: "",
    contrasena: "",
    celular: "",
    nota_eva: "",
  });
  ////
  var radioState = false;
  function test(element) {
    if (radioState == false) {
      check();
      radioState = true;
    } else {
      uncheck();
      radioState = false;
    }
  }
  function check() {
    document.getElementById("radioBtn").checked = true;
  }
  function uncheck() {
    document.getElementById("radioBtn").checked = false;
  }
  ////
  const [eva, setEva] = useState(1);

  const cambioRadioEva = (e) => {
    setEva(e.target.value);
  };
  ////
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
  const abrirCerrarModalEliminar = () => {
    setModalEliminar(!modalEliminar);
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
    setusuarioSeleccionado(Usuario);

    caso === "Editar" ? abrirCerrarModalEditar() : abrirCerrarModalEliminar();
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
            target="_blank">
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
              <th>Evaluación</th>
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
                    onClick={() => seleccionarUsuario(Usuario, "Editar")}>
                    EVALUAR
                  </button>
                </td>
                <td>{Usuario.nota_eva}</td>
              </tr>
            ))}
          </tbody>
        </Table>

        <Modal isOpen={modalEditar}>
          <ModalHeader
            style={{ color: "white", background: "rgba(18, 80, 61, .85)" }}>
            Evaluar Becario
          </ModalHeader>
          <ModalBody>
            <div className="form-group">
              <label>Nombre Becario: </label>
              <br />
              <input
                type="text"
                className="form-control"
                name="nombre"
                onChange={handleChange}
                value={
                  usuarioSeleccionado &&
                  usuarioSeleccionado.nombre +
                    " " +
                    usuarioSeleccionado.apellido
                }
              />
              <br />
              {/* <Input className="mb-3" name="becarios" type="select">
                {data.map((Usuario) => (
                  <option key={Usuario.id} value={Usuario.id}>
                    {Usuario.nombre} {Usuario.apellido}
                  </option>
                ))}
              </Input> */}
              <FormGroup tag="fieldset">
                <legend>
                  Seleccione las opciones: /Posibilidad de entregar el informe a
                  tiempo
                </legend>
                <FormGroup>
                  <Input
                    name="radio1"
                    type="radio"
                    checked={eva == 1 ? true : false}
                    onChange={cambioRadioEva}
                  />{" "}
                  <Label for="radio1">Asistencia a las reuniones</Label>
                </FormGroup>
                <FormGroup>
                  <Input
                    name="radio2"
                    type="radio"
                    checked={eva == 2 ? true : false}
                    onChange={cambioRadioEva}
                  />{" "}
                  <Label for="radio2">Puntualidad</Label>
                </FormGroup>
                <FormGroup>
                  <Input
                    name="radio3"
                    type="radio"
                    checked={eva == 3 ? true : false}
                    onChange={cambioRadioEva}
                  />{" "}
                  <Label for="radio3">Compañerismo</Label>
                </FormGroup>
                <FormGroup>
                  <Input
                    name="radio4"
                    type="radio"
                    checked={eva == 4 ? true : false}
                    onChange={cambioRadioEva}
                  />{" "}
                  <Label for="radio4">
                    Cumplimiento reglamento institucional
                  </Label>
                </FormGroup>
                <input
                  type="radio"
                  name="name"
                  id="radioBtn"
                  onClick={() => test(this)}
                />{" "}
                Radio
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
              onClick={() => abrirCerrarModalEditar()}>
              Cancelar
            </button>
          </ModalFooter>
        </Modal>
      </div>
    </div>
  );
}

export default Evalua;
