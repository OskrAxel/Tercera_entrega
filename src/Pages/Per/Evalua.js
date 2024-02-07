import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Col,
  Container,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
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
  const [framework, setFramework] = useState(1);

  const cambioRadioFramework = (e) => {
    setFramework(e.target.value);
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
                    onClick={() => seleccionarUsuario(Usuario, "Editar")}
                  >
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
            style={{ color: "white", background: "rgba(18, 80, 61, .85)" }}
          >
            Evaluar Becario
          </ModalHeader>
          <ModalBody>
            <div className="form-group">
              <label>Nombre Becario: </label>
              <br />
              <input
                disabled
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
              <div>
                <Container>
                  <Row>
                    <h5>¿Qué Framework estás utilizando?</h5>
                  </Row>
                  <Row>
                    <Col className="bg-light border">
                      <FormGroup>
                        <Input
                          id="radio1"
                          type="radio"
                          value="1"
                          checked={framework == 1 ? true : false}
                          onChange={cambioRadioFramework}
                        />
                        <Label for="radio1">1</Label>
                      </FormGroup>
                    </Col>
                    <Col className="bg-light border">
                      <FormGroup>
                        <Input
                          id="radio2"
                          type="radio"
                          value="2"
                          checked={framework == 2 ? true : false}
                          onChange={cambioRadioFramework}
                        />
                        <Label for="radio2">2</Label>
                      </FormGroup>
                    </Col>
                    <Col className="bg-light border">
                      <FormGroup>
                        <Input
                          id="radio3"
                          type="radio"
                          value="3"
                          checked={framework == 3 ? true : false}
                          onChange={cambioRadioFramework}
                        />
                        <Label for="radio3">3</Label>
                      </FormGroup>
                    </Col>
                    <Col className="bg-light border">
                      <FormGroup>
                        <Input
                          id="radio4"
                          type="radio"
                          value="4"
                          checked={framework == 4 ? true : false}
                          onChange={cambioRadioFramework}
                        />
                        <Label for="radio4">4</Label>
                      </FormGroup>
                    </Col>
                    <Col className="bg-light border">
                      <FormGroup>
                        <Input
                          id="radio5"
                          type="radio"
                          value="5"
                          checked={framework == 5 ? true : false}
                          onChange={cambioRadioFramework}
                        />
                        <Label for="radio5">5</Label>
                      </FormGroup>
                    </Col>
                  </Row>
                  <br />
                  <Row>
                    <h5>¿Qué Framework estás utilizando?</h5>
                  </Row>
                  <Row>
                    <Col className="bg-light border">
                      <FormGroup>
                        <Input
                          id="radio6"
                          type="radio"
                          value="6"
                          checked={framework == 6 ? true : false}
                          onChange={cambioRadioFramework}
                        />
                        <Label for="radio6">1</Label>
                      </FormGroup>
                    </Col>
                    <Col className="bg-light border">
                      <FormGroup>
                        <Input
                          id="radio7"
                          type="radio"
                          value="7"
                          checked={framework == 7 ? true : false}
                          onChange={cambioRadioFramework}
                        />
                        <Label for="radio7">2</Label>
                      </FormGroup>
                    </Col>
                    <Col className="bg-light border">
                      <FormGroup>
                        <Input
                          id="radio8"
                          type="radio"
                          value="8"
                          checked={framework == 8 ? true : false}
                          onChange={cambioRadioFramework}
                        />
                        <Label for="radio8">3</Label>
                      </FormGroup>
                    </Col>
                    <Col className="bg-light border">
                      <FormGroup>
                        <Input
                          id="radio9"
                          type="radio"
                          value="9"
                          checked={framework == 9 ? true : false}
                          onChange={cambioRadioFramework}
                        />
                        <Label for="radio9">4</Label>
                      </FormGroup>
                    </Col>
                    <Col className="bg-light border">
                      <FormGroup>
                        <Input
                          id="radio10"
                          type="radio"
                          value="10"
                          checked={framework == 10 ? true : false}
                          onChange={cambioRadioFramework}
                        />
                        <Label for="radio10">5</Label>
                      </FormGroup>
                    </Col>
                  </Row>
                  <br />
                  <Row>
                    <h5>¿Qué Framework estás utilizando?</h5>
                  </Row>
                  <Row>
                    <Col className="bg-light border">
                      <FormGroup>
                        <Input
                          id="radio11"
                          type="radio"
                          value="11"
                          checked={framework == 11 ? true : false}
                          onChange={cambioRadioFramework}
                        />
                        <Label for="radio11">1</Label>
                      </FormGroup>
                    </Col>
                    <Col className="bg-light border">
                      <FormGroup>
                        <Input
                          id="radio2"
                          type="radio"
                          value="12"
                          checked={framework == 12 ? true : false}
                          onChange={cambioRadioFramework}
                        />
                        <Label for="radio12">2</Label>
                      </FormGroup>
                    </Col>
                    <Col className="bg-light border">
                      <FormGroup>
                        <Input
                          id="radio13"
                          type="radio"
                          value="13"
                          checked={framework == 13 ? true : false}
                          onChange={cambioRadioFramework}
                        />
                        <Label for="radio13">3</Label>
                      </FormGroup>
                    </Col>
                    <Col className="bg-light border">
                      <FormGroup>
                        <Input
                          id="radio14"
                          type="radio"
                          value="14"
                          checked={framework == 14 ? true : false}
                          onChange={cambioRadioFramework}
                        />
                        <Label for="radio14">4</Label>
                      </FormGroup>
                    </Col>
                    <Col className="bg-light border">
                      <FormGroup>
                        <Input
                          id="radio15"
                          type="radio"
                          value="15"
                          checked={framework == 15 ? true : false}
                          onChange={cambioRadioFramework}
                        />
                        <Label for="radio15">5</Label>
                      </FormGroup>
                    </Col>
                  </Row>
                  <br />
                  <Row>
                    <h5>¿Qué Framework estás utilizando?</h5>
                  </Row>
                  <Row>
                    <Col className="bg-light border">
                      <FormGroup>
                        <Input
                          id="radio16"
                          type="radio"
                          value="16"
                          checked={framework == 16 ? true : false}
                          onChange={cambioRadioFramework}
                        />
                        <Label for="radio16">1</Label>
                      </FormGroup>
                    </Col>
                    <Col className="bg-light border">
                      <FormGroup>
                        <Input
                          id="radio17"
                          type="radio"
                          value="17"
                          checked={framework == 17 ? true : false}
                          onChange={cambioRadioFramework}
                        />
                        <Label for="radio17">2</Label>
                      </FormGroup>
                    </Col>
                    <Col className="bg-light border">
                      <FormGroup>
                        <Input
                          id="radio18"
                          type="radio"
                          value="18"
                          checked={framework == 18 ? true : false}
                          onChange={cambioRadioFramework}
                        />
                        <Label for="radio18">3</Label>
                      </FormGroup>
                    </Col>
                    <Col className="bg-light border">
                      <FormGroup>
                        <Input
                          id="radio19"
                          type="radio"
                          value="19"
                          checked={framework == 19 ? true : false}
                          onChange={cambioRadioFramework}
                        />
                        <Label for="radio19">4</Label>
                      </FormGroup>
                    </Col>
                    <Col className="bg-light border">
                      <FormGroup>
                        <Input
                          id="radio20"
                          type="radio"
                          value="20"
                          checked={framework == 20 ? true : false}
                          onChange={cambioRadioFramework}
                        />
                        <Label for="radio20">5</Label>
                      </FormGroup>
                    </Col>
                  </Row>
                </Container>
              </div>
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
