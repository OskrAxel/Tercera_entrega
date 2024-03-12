import React from "react";
import "../Bec/bec.scss";
import { Card, Button, CardTitle, CardText, Col } from "reactstrap";
const user = localStorage.getItem("user");
function Ini({ nombre }) {
  return (
    <div className="d-flex p-5 justify-content-center">
      <Col id="colu">
        <Card
          body
          className="text-center"
          style={{
            width: "50rem",
            background: "rgba(232, 232, 232, 0.65)",
          }}>
          <CardTitle tag="h4">Nota:</CardTitle>
          <CardText>
            <h2>Bienvenido: {user}</h2>
            En caso de que no haya registrado sus datos personales continuar con
            el registro
            <br />
            <p></p>
            <b>Por favor haga clic en el botón a continuación</b>
          </CardText>
          <Button id="but" href="./regper">
            Continuar registro
          </Button>
        </Card>
      </Col>
    </div>
  );
}

export default Ini;
