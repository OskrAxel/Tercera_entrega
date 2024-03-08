import React, { useState, useEffect } from "react";
import {
  FormGroup,
  Input,
  Button,
  Pagination,
  PaginationItem,
  PaginationLink,
  Form,
  Row,
  Col,
} from "reactstrap";
import "../bec.scss";
import axios from "axios";

function Horarios8() {
  const [data, setData] = useState({
    id: "",
    idBec: "",
    mat_a1: "",
    hor_a1: "",
    hor_a2: "",
    hor_a3: "",
    dias_a1: "",
    mat_b1: "",
    hor_b1: "",
    hor_b2: "",
    hor_b3: "",
    dias_b1: "",
    mat_c1: "",
    hor_c1: "",
    hor_c2: "",
    hor_c3: "",
    dias_c1: "",
    mat_d1: "",
    hor_d1: "",
    hor_d2: "",
    hor_d3: "",
    dias_d1: "",
    mat_e1: "",
    hor_e1: "",
    hor_e2: "",
    hor_e3: "",
    dias_e1: "",
    mat_f1: "",
    hor_f1: "",
    hor_f2: "",
    hor_f3: "",
    dias_f1: "",
    mat_g1: "",
    hor_g1: "",
    hor_g2: "",
    hor_g3: "",
    dias_g1: "",
    semestre: "",
    anio: "",
    anio_carr: "",
  });
  // const iduser = localStorage.getItem("iduser");
  ///
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    console.log(data);
  };
  ///
  const peticionGet = async () => {
    await axios
      .get(`https://bqef-bo.com/api/bec/horario8.php`, {
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
    f.append("semestre", data.semestre);
    f.append("anio", data.anio);
    f.append("anio_carr", data.anio_carr);
    f.append("mat_a1", data.mat_a1);
    f.append("hor_a1", data.hor_a1);
    f.append("hor_a2", data.hor_a2);
    f.append("hor_a3", data.hor_a3);
    f.append("dias_a1", data.dias_a1);
    f.append("mat_b1", data.mat_b1);
    f.append("hor_b1", data.hor_b1);
    f.append("hor_b2", data.hor_b2);
    f.append("hor_b3", data.hor_b3);
    f.append("dias_b1", data.dias_b1);
    f.append("mat_c1", data.mat_c1);
    f.append("hor_c1", data.hor_c1);
    f.append("hor_c2", data.hor_c2);
    f.append("hor_c3", data.hor_c3);
    f.append("dias_c1", data.dias_c1);
    f.append("mat_d1", data.mat_d1);
    f.append("hor_d1", data.hor_d1);
    f.append("hor_d2", data.hor_d2);
    f.append("hor_d3", data.hor_d3);
    f.append("dias_d1", data.dias_d1);
    f.append("mat_e1", data.mat_e1);
    f.append("hor_e1", data.hor_e1);
    f.append("hor_e2", data.hor_e2);
    f.append("hor_e3", data.hor_e3);
    f.append("dias_e1", data.dias_e1);
    f.append("mat_f1", data.mat_f1);
    f.append("hor_f1", data.hor_f1);
    f.append("hor_f2", data.hor_f2);
    f.append("hor_f3", data.hor_f3);
    f.append("dias_f1", data.dias_f1);
    f.append("mat_g1", data.mat_g1);
    f.append("hor_g1", data.hor_g1);
    f.append("hor_g2", data.hor_g2);
    f.append("hor_g3", data.hor_g3);
    f.append("dias_g1", data.dias_g1);
    ///
    f.append("METHOD", "PUT");
    await axios
      .post(`https://bqef-bo.com/api/bec/horario8.php`, f, {
        params: { id: data.idBec },
      })
      .then((response) => {
        setData(response);
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
          <h2 className>Horario 8</h2>
        </div>
        <div id="subt">
          <span>
            <b>Instrucciones:</b> - Llena el formulario con tu horario de clases
            actual y sus debidos horarios.
            <br />- Tomar en cuenta el formato de la hora (AM/PM).
          </span>
        </div>

        <Form id="subt">
          <Row>
            <Col md={3}>
              <h5>Seleccionar Año o Semestre Correspondiente:</h5>
            </Col>
            <Col md={3}>
              <FormGroup>
                <Input
                  name="anio_carr"
                  type="text"
                  placeholder="Año"
                  onChange={handleChange}
                  value={data.anio_carr}
                />
              </FormGroup>
            </Col>
            <Col md={3}>
              <FormGroup>
                <Input
                  name="semestre"
                  type="text"
                  placeholder="I-Semestre"
                  onChange={handleChange}
                  value={data.semestre}
                />
              </FormGroup>
            </Col>
            <Col md={3}>
              <FormGroup>
                <Input
                  name="anio"
                  type="text"
                  onChange={handleChange}
                  value={data.anio}
                />
              </FormGroup>
            </Col>
          </Row>
          <Row className="text-center">
            <Col md={3}>
              <h5>Materias</h5>
            </Col>
            <Col md={3}>
              <h5>Días</h5>
            </Col>
            <Col colSpan={3}>
              <h5>Horas</h5>
            </Col>
          </Row>
          <Row>
            <Col md={3}>
              <Input
                name="mat_a1"
                type="text"
                placeholder="Materia: 1"
                onChange={handleChange}
                value={data.mat_a1}
              />
            </Col>
            <Col md={3}>
              <Input
                name="dias_a1"
                type="text"
                placeholder="Lunes, Martes, Miércoles, Jueves, Viernes"
                onChange={handleChange}
                value={data.dias_a1}
              />
            </Col>
            <Col>
              <Input
                name="hor_a1"
                type="text"
                onChange={handleChange}
                value={data.hor_a1}
              />
            </Col>
            <Col>
              <Input
                name="hor_a2"
                type="text"
                onChange={handleChange}
                value={data.hor_a2}
              />
            </Col>
            <Col>
              <Input
                name="hor_a3"
                type="text"
                onChange={handleChange}
                value={data.hor_a3}
              />
            </Col>
          </Row>
          <Row>
            <Col md={3}>
              <Input
                name="mat_b1"
                type="text"
                placeholder="Materia: 2"
                onChange={handleChange}
                value={data.mat_b1}
              />
            </Col>
            <Col md={3}>
              <Input
                name="dias_b1"
                type="text"
                placeholder="Lunes, Martes, Miércoles, Jueves, Viernes"
                onChange={handleChange}
                value={data.dias_b1}
              />
            </Col>
            <Col>
              <Input
                name="hor_b1"
                type="text"
                onChange={handleChange}
                value={data.hor_b1}
              />
            </Col>
            <Col>
              <Input
                name="hor_b2"
                type="text"
                onChange={handleChange}
                value={data.hor_b2}
              />
            </Col>
            <Col>
              <Input
                name="hor_b3"
                type="text"
                onChange={handleChange}
                value={data.hor_b3}
              />
            </Col>
          </Row>
          <Row>
            <Col md={3}>
              <Input
                name="mat_c1"
                type="text"
                placeholder="Materia: 3"
                onChange={handleChange}
                value={data.mat_c1}
              />
            </Col>
            <Col md={3}>
              <Input
                name="dias_c1"
                type="text"
                placeholder="Lunes, Martes, Miércoles, Jueves, Viernes"
                onChange={handleChange}
                value={data.dias_c1}
              />
            </Col>
            <Col>
              <Input
                name="hor_c1"
                type="text"
                onChange={handleChange}
                value={data.hor_c1}
              />
            </Col>
            <Col>
              <Input
                name="hor_c2"
                type="text"
                onChange={handleChange}
                value={data.hor_c2}
              />
            </Col>
            <Col>
              <Input
                name="hor_c3"
                type="text"
                onChange={handleChange}
                value={data.hor_c3}
              />
            </Col>
          </Row>
          <Row>
            <Col md={3}>
              <Input
                name="mat_d1"
                type="text"
                placeholder="Materia: 4"
                onChange={handleChange}
                value={data.mat_d1}
              />
            </Col>
            <Col md={3}>
              <Input
                name="dias_d1"
                type="text"
                placeholder="Lunes, Martes, Miércoles, Jueves, Viernes"
                onChange={handleChange}
                value={data.dias_d1}
              />
            </Col>
            <Col>
              <Input
                name="hor_d1"
                type="text"
                onChange={handleChange}
                value={data.hor_d1}
              />
            </Col>
            <Col>
              <Input
                name="hor_d2"
                type="text"
                onChange={handleChange}
                value={data.hor_d2}
              />
            </Col>
            <Col>
              <Input
                name="hor_d3"
                type="text"
                onChange={handleChange}
                value={data.hor_d3}
              />
            </Col>
          </Row>
          <Row>
            <Col md={3}>
              <Input
                name="mat_e1"
                type="text"
                placeholder="Materia: 5"
                onChange={handleChange}
                value={data.mat_e1}
              />
            </Col>
            <Col md={3}>
              <Input
                name="dias_e1"
                type="text"
                placeholder="Lunes, Martes, Miércoles, Jueves, Viernes"
                onChange={handleChange}
                value={data.dias_e1}
              />
            </Col>
            <Col>
              <Input
                name="hor_e1"
                type="text"
                onChange={handleChange}
                value={data.hor_e1}
              />
            </Col>
            <Col>
              <Input
                name="hor_e2"
                type="text"
                onChange={handleChange}
                value={data.hor_e2}
              />
            </Col>
            <Col>
              <Input
                name="hor_e3"
                type="text"
                onChange={handleChange}
                value={data.hor_e3}
              />
            </Col>
          </Row>
          <Row>
            <Col md={3}>
              <Input
                name="mat_f1"
                type="text"
                placeholder="Materia: 6"
                onChange={handleChange}
                value={data.mat_f1}
              />
            </Col>
            <Col md={3}>
              <Input
                name="dias_f1"
                type="text"
                placeholder="Lunes, Martes, Miércoles, Jueves, Viernes"
                onChange={handleChange}
                value={data.dias_f1}
              />
            </Col>
            <Col>
              <Input
                name="hor_f1"
                type="text"
                onChange={handleChange}
                value={data.hor_f1}
              />
            </Col>
            <Col>
              <Input
                name="hor_f2"
                type="text"
                onChange={handleChange}
                value={data.hor_f2}
              />
            </Col>
            <Col>
              <Input
                name="hor_f3"
                type="text"
                onChange={handleChange}
                value={data.hor_f3}
              />
            </Col>
          </Row>
          <Row>
            <Col md={3}>
              <Input
                name="mat_g1"
                type="text"
                placeholder="Materia: 7"
                onChange={handleChange}
                value={data.mat_g1}
              />
            </Col>
            <Col md={3}>
              <Input
                name="dias_g1"
                type="text"
                placeholder="Lunes, Martes, Miércoles, Jueves, Viernes"
                onChange={handleChange}
                value={data.dias_g1}
              />
            </Col>
            <Col>
              <Input
                name="hor_g1"
                type="text"
                onChange={handleChange}
                value={data.hor_g1}
              />
            </Col>
            <Col>
              <Input
                name="hor_g2"
                type="text"
                onChange={handleChange}
                value={data.hor_g2}
              />
            </Col>
            <Col>
              <Input
                name="hor_g3"
                type="text"
                onChange={handleChange}
                value={data.hor_g3}
              />
            </Col>
          </Row>
          <div id="fotb">
            <Button color="success" size="lg" onClick={() => peticionPut()}>
              Guardar
            </Button>
          </div>
        </Form>
        <Pagination
          aria-label="Page navigation example"
          className="pagination justify-content-center">
          <PaginationItem>
            <PaginationLink first href="/horarios1" />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="/horarios7" previous />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="/horarios1">1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="/horarios2">2</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="/horarios3">3</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="/horarios4">4</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="/horarios5">5</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="/horarios6">6</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="/horarios7">7</PaginationLink>
          </PaginationItem>
          <PaginationItem active>
            <PaginationLink href="/horarios8">8</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="/horarios9">9</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="/horarios10">10</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="/horarios9" next />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="/horarios10" last />
          </PaginationItem>
        </Pagination>
      </div>
    </div>
  );
}

export default Horarios8;
