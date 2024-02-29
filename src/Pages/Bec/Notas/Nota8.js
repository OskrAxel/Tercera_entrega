import React, { useState, useEffect } from "react";
import {
  Input,
  Button,
  Form,
  Row,
  Col,
  DropdownToggle,
  DropdownItem,
  DropdownMenu,
  UncontrolledDropdown,
} from "reactstrap";
import "../bec.scss";
import axios from "axios";

function Nota8() {
  const [data, setData] = useState({
    id: "",
    idBec: "",

    mat_a1: "",
    nota_a1: "",

    mat_b1: "",
    nota_b1: "",

    mat_c1: "",
    nota_c1: "",

    mat_d1: "",
    nota_d1: "",

    mat_e1: "",
    nota_e1: "",

    mat_f1: "",
    nota_f1: "",

    mat_g1: "",
    nota_g1: "",

    semestre: "",
    anio: "",
    anio_carr: "",
  });
  const iduser = localStorage.getItem("iduser");
  ///
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    console.log(data);
  };
  const act = () => {
    window.location.reload();
  };
  ///
  const peticionGet = async () => {
    await axios
      .get(`http://localhost:80/api/bec/nota8.php`, {
        params: {
          id: localStorage.getItem("iduser"),
        },
      })
      .then((response) => {
        console.log(response.data);
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const peticionPut = async () => {
    var f = new FormData();
    ///)

    f.append("nota_a1", data.nota_a1);

    f.append("nota_b1", data.nota_b1);

    f.append("nota_c1", data.nota_c1);

    f.append("nota_d1", data.nota_d1);

    f.append("nota_e1", data.nota_e1);

    f.append("nota_f1", data.nota_f1);

    f.append("nota_g1", data.nota_g1);

    ///
    f.append("METHOD", "PUT");
    await axios
      .post(`http://localhost:80/api/bec/nota8.php`, f, {
        params: { id: data.idBec },
      })
      .then((response) => {
        setData(response);
        act();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    peticionGet();
  }, []);
  return (
    <div id="main_content">
      <div className="tra">
        <div className="tra title-form">
          <h2 className>Notas: {iduser}</h2>
        </div>
        <Form id="tab_not">
          <UncontrolledDropdown direction="down">
            <DropdownToggle caret color="danger">
              Registrar Notas
            </DropdownToggle>
            <DropdownMenu className="drop-menu">
              <DropdownItem href="./nota1">Primer Semestre</DropdownItem>
              <DropdownItem href="./nota2">Segundo Semestre</DropdownItem>
              <DropdownItem href="./nota3">Tercer Semestre</DropdownItem>
              <DropdownItem href="./nota4">Cuarto Semestre</DropdownItem>
              <DropdownItem href="./nota5">Quinto Semestre</DropdownItem>
              <DropdownItem href="./nota6">Sexto Semestre</DropdownItem>
              <DropdownItem href="./nota7">Septimo Semestre</DropdownItem>
              <DropdownItem disabled href="./nota8">
                Octavo Semestre
              </DropdownItem>
              <DropdownItem href="./nota9">Noveno Semestre</DropdownItem>
              <DropdownItem href="./nota10">Decimo Semestre</DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
          <hr></hr>
          <Row className="text-center header_mo ">
            <Col
              md={6}
              style={{
                border: "1.5px solid #1a5a41",
              }}
            >
              <h5>Materia</h5>
            </Col>
            <Col
              md={2}
              style={{
                border: "1.5px solid #1a5a41",
              }}
            >
              <h5>Nota</h5>
            </Col>
            <Col
              md={2}
              style={{
                border: "1.5px solid #1a5a41",
              }}
            >
              <h5>Semestre</h5>
            </Col>
            <Col
              md={2}
              style={{
                border: "1.5px solid #1a5a41",
              }}
            >
              <h5>Año</h5>
            </Col>
          </Row>
          <Row>
            <Col
              md={6}
              style={{
                border: "1.5px solid #1a5a41",
              }}
            >
              {data.mat_a1}
            </Col>
            <Col
              md={2}
              style={{
                border: "1.5px solid #1a5a41",
              }}
            >
              <Input
                name="nota_a1"
                type="text"
                onChange={handleChange}
                value={data.nota_a1}
              />
            </Col>
            <Col
              md={2}
              style={{
                textAlign: "center",
                border: "1.5px solid #1a5a41",
              }}
            >
              {data.semestre}
            </Col>
            <Col
              md={2}
              style={{
                textAlign: "center",
                border: "1.5px solid #1a5a41",
              }}
            >
              {data.anio}
            </Col>
          </Row>
          <Row>
            <Col
              md={6}
              style={{
                border: "1.5px solid #1a5a41",
              }}
            >
              {data.mat_b1}
            </Col>
            <Col
              md={2}
              style={{
                border: "1.5px solid #1a5a41",
              }}
            >
              <Input
                name="nota_b1"
                type="text"
                onChange={handleChange}
                value={data.nota_b1}
              />
            </Col>
            <Col
              md={2}
              style={{
                textAlign: "center",
                border: "1.5px solid #1a5a41",
              }}
            >
              {data.semestre}
            </Col>
            <Col
              md={2}
              style={{
                textAlign: "center",
                border: "1.5px solid #1a5a41",
              }}
            >
              {data.anio}
            </Col>
          </Row>
          <Row>
            <Col
              md={6}
              style={{
                border: "1.5px solid #1a5a41",
              }}
            >
              {data.mat_c1}
            </Col>
            <Col
              md={2}
              style={{
                border: "1.5px solid #1a5a41",
              }}
            >
              <Input
                name="nota_c1"
                type="text"
                onChange={handleChange}
                value={data.nota_c1}
              />
            </Col>
            <Col
              md={2}
              style={{
                textAlign: "center",
                border: "1.5px solid #1a5a41",
              }}
            >
              {data.semestre}
            </Col>
            <Col
              md={2}
              style={{
                textAlign: "center",
                border: "1.5px solid #1a5a41",
              }}
            >
              {data.anio}
            </Col>
          </Row>
          <Row>
            <Col
              md={6}
              style={{
                border: "1.5px solid #1a5a41",
              }}
            >
              {data.mat_d1}
            </Col>
            <Col
              md={2}
              style={{
                border: "1.5px solid #1a5a41",
              }}
            >
              <Input
                name="nota_d1"
                type="text"
                onChange={handleChange}
                value={data.nota_d1}
              />
            </Col>
            <Col
              md={2}
              style={{
                textAlign: "center",
                border: "1.5px solid #1a5a41",
              }}
            >
              {data.semestre}
            </Col>
            <Col
              md={2}
              style={{
                textAlign: "center",
                border: "1.5px solid #1a5a41",
              }}
            >
              {data.anio}
            </Col>
          </Row>
          <Row>
            <Col
              md={6}
              style={{
                border: "1.5px solid #1a5a41",
              }}
            >
              {data.mat_e1}
            </Col>
            <Col
              md={2}
              style={{
                border: "1.5px solid #1a5a41",
              }}
            >
              <Input
                name="nota_e1"
                type="text"
                onChange={handleChange}
                value={data.nota_e1}
              />
            </Col>
            <Col
              md={2}
              style={{
                textAlign: "center",
                border: "1.5px solid #1a5a41",
              }}
            >
              {data.semestre}
            </Col>
            <Col
              md={2}
              style={{
                textAlign: "center",
                border: "1.5px solid #1a5a41",
              }}
            >
              {data.anio}
            </Col>
          </Row>
          <Row>
            <Col
              md={6}
              style={{
                border: "1.5px solid #1a5a41",
              }}
            >
              {data.mat_f1}
            </Col>
            <Col
              md={2}
              style={{
                border: "1.5px solid #1a5a41",
              }}
            >
              <Input
                name="nota_f1"
                type="text"
                onChange={handleChange}
                value={data.nota_f1}
              />
            </Col>
            <Col
              md={2}
              style={{
                textAlign: "center",
                border: "1.5px solid #1a5a41",
              }}
            >
              {data.semestre}
            </Col>
            <Col
              md={2}
              style={{
                textAlign: "center",
                border: "1.5px solid #1a5a41",
              }}
            >
              {data.anio}
            </Col>
          </Row>
          <Row>
            <Col
              md={6}
              style={{
                border: "1.5px solid #1a5a41",
              }}
            >
              {data.mat_g1}
            </Col>
            <Col
              md={2}
              style={{
                border: "1.5px solid #1a5a41",
              }}
            >
              <Input
                name="nota_g1"
                type="text"
                onChange={handleChange}
                value={data.nota_g1}
              />
            </Col>
            <Col
              md={2}
              style={{
                textAlign: "center",
                border: "1.5px solid #1a5a41",
              }}
            >
              {data.semestre}
            </Col>
            <Col
              md={2}
              style={{
                textAlign: "center",
                border: "1.5px solid #1a5a41",
              }}
            >
              {data.anio}
            </Col>
          </Row>
          <div id="fotb">
            <Button color="success" size="lg" onClick={() => peticionPut()}>
              Guardar
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default Nota8;
