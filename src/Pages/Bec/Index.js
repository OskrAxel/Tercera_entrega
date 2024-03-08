import React from "react";
import "./bec.scss";
import { Card, Button, CardTitle, CardText, Col } from "reactstrap";

function Registro({ nombre }) {
  return (
    <div className="d-flex justify-content-center">
      <Col id="colu">
        <Card
          body
          className="text-center"
          style={{
            width: "50rem",
            background: "rgba(206, 207, 201, 1)",
          }}>
          <CardTitle tag="h4">Nota:</CardTitle>
          <CardText>
            <h2>Bienvenido: {nombre}</h2>
            En caso de que haya sido aceptado para recibir y participar de la
            Beca en la institucion BQEF deberá completar el registro de sus
            datos.
            <br />
            <b>Por favor haga clic en el botón a continuación</b>
          </CardText>
          <Button id="but" href="/RegComp">
            Continuar registro
          </Button>
        </Card>
      </Col>
    </div>
  );
}

export default Registro;
