import React, { useState, useEffect } from "react";
import { FormGroup, Input, Row, Form, Col, Label, Button } from "reactstrap";
import "./bec.scss";
import axios from "axios";
import Swal from "sweetalert2";

function RegComp() {
  const [data, setData] = useState({
    id: "",
    nombre: "",
    apellido: "",
    email: "",
    id_bec: "",
    carrera: "",
    celular: "",
    institucion: "",
    anio: "",
    ciudad: "",
    direccion: "",
    nom_pad: "",
    nom_mad: "",
  });
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
      .get(`https://bqef-bo.com/api/bec/bec.php`, {
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
  const act = () => {
    window.location.reload();
  };
  const peticionPut = async () => {
    var f = new FormData();
    f.append("nombre", data.nombre);
    f.append("apellido", data.apellido);
    f.append("email", data.email);
    f.append("carrera", data.carrera);
    f.append("celular", data.celular);
    f.append("institucion", data.institucion);
    f.append("anio", data.anio);
    f.append("ciudad", data.ciudad);
    f.append("direccion", data.direccion);
    f.append("nom_pad", data.nom_pad);
    f.append("nom_mad", data.nom_mad);
    f.append("METHOD", "PUT");
    await axios
      .post(`https://bqef-bo.com/api/bec/bec.php`, f, {
        params: { id: data.id },
      })
      .then((response) => {
        setData(response.data);
        console.log(response.data);
        mostrarAlertaU();
        act();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    peticionGet();
  }, []);
  ////ALERTAS
  const mostrarAlertaU = () => {
    Swal.fire({
      confirmButtonColor: "#2E8B57",
      title: "Éxito!",
      text: "Registro Actualizado.",
      timer: 5000,
      icon: "success",
    });
  };
  return (
    <div id="main_content">
      <div className="tra">
        <div className="tra title-form">
          <h2 className>Registro Becario</h2>
        </div>
        <Form className="frm">
          <Row>
            <Col md={4}>
              <FormGroup>
                <Label>Nombres:{data.id}</Label>
                <Input
                  name="nombre"
                  type="text"
                  onChange={handleChange}
                  value={data.nombre}
                />
              </FormGroup>
            </Col>
            <Col md={4}>
              <FormGroup>
                <Label>Apellidos:</Label>
                <Input
                  name="apellido"
                  type="text"
                  onChange={handleChange}
                  value={data.apellido}
                />
              </FormGroup>
            </Col>
            <Col md={4}>
              <FormGroup>
                <Label>ID Usuario:</Label>
                <Input
                  disabled
                  name="id_bec"
                  type="text"
                  // onChange={handleChange}
                  value={data.id_bec}
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col md={4}>
              <FormGroup>
                <Label>Universidad/Institución:</Label>
                <Input
                  name="institucion"
                  type="text"
                  onChange={handleChange}
                  value={data.institucion}
                />
              </FormGroup>
            </Col>
            <Col md={3}>
              <FormGroup>
                <Label>Carrera:</Label>
                <Input
                  name="carrera"
                  type="text"
                  onChange={handleChange}
                  value={data.carrera}
                />
              </FormGroup>
            </Col>
            <Col md={3}>
              <FormGroup>
                <Label>Correo:</Label>
                <Input
                  name="email"
                  type="text"
                  onChange={handleChange}
                  value={data.email}
                />
              </FormGroup>
            </Col>

            <Col md={2}>
              <FormGroup>
                <Label>Celular:</Label>
                <Input
                  name="celular"
                  type="text"
                  onChange={handleChange}
                  value={data.celular}
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <FormGroup>
                <Label>Ciudad:</Label>
                <Input
                  name="ciudad"
                  type="text"
                  onChange={handleChange}
                  value={data.ciudad}
                />
              </FormGroup>
            </Col>
            <Col md={5}>
              <FormGroup>
                <Label>Dirección:</Label>
                <Input
                  name="direccion"
                  type="text"
                  onChange={handleChange}
                  value={data.direccion}
                />
              </FormGroup>
            </Col>
            <Col md={1}>
              <FormGroup>
                <Label>Año Inicio:</Label>
                <Input
                  name="anio"
                  type="text"
                  onChange={handleChange}
                  value={data.anio}
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <FormGroup>
                <Label>Nombre Padre:</Label>
                <Input
                  name="nom_pad"
                  type="text"
                  onChange={handleChange}
                  value={data.nom_pad}
                />
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label>Nombre Madre:</Label>
                <Input
                  name="nom_mad"
                  type="text"
                  onChange={handleChange}
                  value={data.nom_mad}
                />
              </FormGroup>
            </Col>
          </Row>
          <Button
            className="btn btn-success"
            size="lg"
            onClick={() => peticionPut()}>
            Guardar
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default RegComp;
