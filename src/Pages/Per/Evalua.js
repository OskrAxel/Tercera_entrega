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
    nota_eva: "",
  });
  ////1
  const [fram1, setFram1] = useState();

  const cambioRadioFram1 = (e) => {
    setFram1(e.target.value);
  };
  ///2
  const [fram2, setFram2] = useState();

  const cambioRadioFram2 = (e) => {
    setFram2(e.target.value);
  };
  ///3
  const [fram3, setFram3] = useState();

  const cambioRadioFram3 = (e) => {
    setFram3(e.target.value);
  };
  ///4
  const [fram4, setFram4] = useState();

  const cambioRadioFram4 = (e) => {
    setFram4(e.target.value);
  };
  ////
  const abrirCerrarModalEditar = () => {
    setModalEditar(!modalEditar);
  };

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
  const act = () => {
    window.location.reload();
  };

  const peticionPut = async () => {
    var f = new FormData();
    f.append("p1", fram1);
    f.append("p2", fram2);
    f.append("p3", fram3);
    f.append("p4", fram4);
    f.append("METHOD", "POST");
    await axios
      .post("http://localhost:80/api/per/eva.php", f, {
        params: { id: usuarioSeleccionado.id },
      })
      .then((response) => {
        setData(data.concat(response.data));
        abrirCerrarModalEditar();
        act();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  /////
  const seleccionarUsuario = (Usuario) => {
    setusuarioSeleccionado(Usuario);
    abrirCerrarModalEditar();
  };
  useEffect(() => {
    peticionGet();
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
        elemento.apellido
          .toString()
          .toLowerCase()
          .includes(terminoBusqueda.toLowerCase()) ||
        elemento.email
          .toString()
          .toLowerCase()
          .includes(terminoBusqueda.toLowerCase())
      ) {
        return elemento;
      }
    });
    setData(resultadosBusqueda);
  };
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
        <div className="containerInput">
          <Input
            className="form-control inputBuscar"
            size="lg"
            value={busqueda}
            placeholder="Búsqueda por Nombre, Apellido o Email"
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
              <th>Nombre Completo</th>
              <th>Correo</th>
              <th>Telf/Cel</th>
              <th>Acciones</th>
              <th>Evaluación Sist.</th>
              <th>Evaluación</th>
              <th>Nota Final</th>
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
                    onClick={() => seleccionarUsuario(Usuario)}>
                    <FaIcons.FaClipboardCheck />
                    &nbsp;EVALUAR
                  </button>
                </td>
                <td>{Usuario.nota_eva}</td>
                <td>{Usuario.nota_eva}</td>
                <td>
                  <strong>{Usuario.nota_eva}</strong>
                </td>
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
                disabled
                type="text"
                className="form-control"
                name="nombre"
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
                    <h5>1. Asistencia a las reuniones</h5>
                  </Row>
                  <Row>
                    <Col>
                      <FormGroup>
                        <Input
                          id="radio1"
                          type="radio"
                          name="p1"
                          value="5"
                          checked={fram1 == 5 ? true : false}
                          onChange={cambioRadioFram1}
                        />
                        <Label for="radio1">Bueno</Label>
                      </FormGroup>
                    </Col>
                    <Col>
                      <FormGroup>
                        <Input
                          id="radio2"
                          type="radio"
                          name="p1"
                          value="3"
                          checked={fram1 == 3 ? true : false}
                          onChange={cambioRadioFram1}
                        />
                        <Label for="radio2">Regular</Label>
                      </FormGroup>
                    </Col>
                    <Col>
                      <FormGroup>
                        <Input
                          id="radio3"
                          type="radio"
                          name="p1"
                          value="1"
                          checked={fram1 == "1" ? true : false}
                          onChange={cambioRadioFram1}
                        />
                        <Label for="radio3">Malo</Label>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <h5>2. Puntualidad</h5>
                  </Row>
                  <Row>
                    <Col>
                      <FormGroup>
                        <Input
                          id="radio4"
                          type="radio"
                          name="p2"
                          value="5"
                          checked={fram2 == 5 ? true : false}
                          onChange={cambioRadioFram2}
                        />
                        <Label for="radio4">Bueno</Label>
                      </FormGroup>
                    </Col>
                    <Col>
                      <FormGroup>
                        <Input
                          id="radio5"
                          type="radio"
                          name="p2"
                          value="3"
                          checked={fram2 == 3 ? true : false}
                          onChange={cambioRadioFram2}
                        />
                        <Label for="radio5">Regular</Label>
                      </FormGroup>
                    </Col>
                    <Col>
                      <FormGroup>
                        <Input
                          id="radio6"
                          type="radio"
                          name="p2"
                          value="1"
                          checked={fram2 == 1 ? true : false}
                          onChange={cambioRadioFram2}
                        />
                        <Label for="radio6">Malo</Label>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <h5>3. Compañerismo</h5>
                  </Row>
                  <Row>
                    <Col>
                      <FormGroup>
                        <Input
                          id="radio7"
                          type="radio"
                          name="p3"
                          value="5"
                          checked={fram3 == 5 ? true : false}
                          onChange={cambioRadioFram3}
                        />
                        <Label for="radio7">Bueno</Label>
                      </FormGroup>
                    </Col>
                    <Col>
                      <FormGroup>
                        <Input
                          id="radio8"
                          type="radio"
                          name="p3"
                          value="3"
                          checked={fram3 == 3 ? true : false}
                          onChange={cambioRadioFram3}
                        />
                        <Label for="radio8">Regular</Label>
                      </FormGroup>
                    </Col>
                    <Col>
                      <FormGroup>
                        <Input
                          id="radio9"
                          type="radio"
                          name="p3"
                          value="1"
                          checked={fram3 == 1 ? true : false}
                          onChange={cambioRadioFram3}
                        />
                        <Label for="radio9">Malo</Label>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <h5>4. Cumplimiento reglamento institucional</h5>
                  </Row>
                  <Row>
                    <Col>
                      <FormGroup>
                        <Input
                          id="radio10"
                          type="radio"
                          name="p4"
                          value="5"
                          checked={fram4 == 5 ? true : false}
                          onChange={cambioRadioFram4}
                        />
                        <Label for="radio10">Bueno</Label>
                      </FormGroup>
                    </Col>
                    <Col>
                      <FormGroup>
                        <Input
                          id="radio11"
                          type="radio"
                          name="p4"
                          value="3"
                          checked={fram4 == 3 ? true : false}
                          onChange={cambioRadioFram4}
                        />
                        <Label for="radio11">Regular</Label>
                      </FormGroup>
                    </Col>
                    <Col>
                      <FormGroup>
                        <Input
                          id="radio12"
                          type="radio"
                          name="p4"
                          value="1"
                          checked={fram4 == 1 ? true : false}
                          onChange={cambioRadioFram4}
                        />
                        <Label for="radio12">Malo</Label>
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
