import React from "react";
import "../Bec/bec.scss";
import {
  Button,
  Card,
  CardBody,
  CardTitle,
  CardText,
  CardSubtitle,
  CardGroup,
  Row,
  Col,
} from "reactstrap";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { PieChart, Pie, Cell } from "recharts";
//
const COLORS = [
  "#ce93d8",
  "#5c6bc0",
  "#b39ddb",
  "#4dd0e1",
  "#f48fb1",
  "#d500f9",
];
//
const data = [
  { anio: "2018", conclusion: 10, inscripciones: 60 },
  { anio: "2019", conclusion: 25, inscripciones: 70 },
  { anio: "2020", conclusion: 15, inscripciones: 65 },
  { anio: "2021", conclusion: 35, inscripciones: 85 },
  { anio: "2022", conclusion: 12, inscripciones: 48 },
  { anio: "2023", conclusion: 30, inscripciones: 69 },
  { anio: "2024", conclusion: 15, inscripciones: 78 },
];
const Analisis = () => {
  return (
    <div id="main">
      <div className="tral">
        <CardGroup>
          <Card
            color=""
            style={{
              color: "black",
              width: "18rem",
            }}>
            <CardBody>
              <CardTitle tag="h5">Cuentas</CardTitle>
              <CardSubtitle className="mb-2 text-muted" tag="h6">
                Becarios
              </CardSubtitle>
              <CardText>Ver</CardText>
              <Button className="btn-success">Ver</Button>
            </CardBody>
          </Card>
          <Card
            color=""
            style={{
              color: "black",
              width: "18rem",
            }}>
            <CardBody>
              <CardTitle tag="h5">Becarios</CardTitle>
              <CardSubtitle className="mb-2 text-muted" tag="h6">
                Habilitados
              </CardSubtitle>
              <CardText>Ver</CardText>
              <Button href="./becarios" className="btn-success">
                Ver
              </Button>
            </CardBody>
          </Card>
          <Card
            color=""
            style={{
              color: "black",
              width: "18rem",
            }}>
            <CardBody>
              <CardTitle tag="h5">Patrocinadores</CardTitle>
              <CardSubtitle className="mb-2 text-muted" tag="h6">
                Registrados
              </CardSubtitle>
              <CardText>Ver</CardText>
              <Button href="./patro" className="btn-success">
                Ver
              </Button>
            </CardBody>
          </Card>
          <Card
            color=""
            style={{
              color: "black",
              width: "18rem",
            }}>
            <CardBody>
              <CardTitle tag="h5">Fecha Entrega</CardTitle>
              <CardSubtitle className="mb-2 text-muted" tag="h6">
                Informes
              </CardSubtitle>
              <CardText>Ver</CardText>
              <Button className="btn-success">Ver</Button>
            </CardBody>
          </Card>
        </CardGroup>
        {/* // */}
        <Row>
          <Col sm="6">
            <Card body>
              <CardTitle tag="h5">
                Registro inscripciones/conclusion de becas
              </CardTitle>
              <CardText>
                With supporting text below as a natural lead-in to additional
                content.
              </CardText>
              <ResponsiveContainer width="100%" aspect={2}>
                <BarChart
                  data={data}
                  width={300}
                  height={200}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}>
                  <CartesianGrid strokeDasharray="4 1 2" />
                  <XAxis dataKey="anio" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="inscripciones" fill="#6b48ff" />
                  <Bar dataKey="conclusion" fill="#1ee3cf" />
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </Col>
          <Col sm="6">
            <Card body>
              <CardTitle tag="h5">Special Title Treatment</CardTitle>
              <CardText>
                With supporting text below as a natural lead-in to additional
                content.
              </CardText>
              <ResponsiveContainer width="100%" aspect={2}>
                <PieChart>
                  <Pie
                    dataKey="inscripciones"
                    data={data}
                    innerRadius={60}
                    outerRadius={150}
                    fill="#82ca9d">
                    {data.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </Card>
          </Col>
        </Row>
        {/* //graficos con rechart */}
        {/* <ResponsiveContainer width="50%" aspect={2}>
          <BarChart
            data={data}
            width={300}
            height={200}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="4 1 2" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="weight" fill="#6b48ff" />
            <Bar dataKey="age" fill="#1ee3cf" />
          </BarChart>
        </ResponsiveContainer> */}
        {/* <div style={{ width: "50%", height: 400 }}>
          <ResponsiveContainer>
            <PieChart>
              <Pie
                dataKey="weight"
                data={data}
                innerRadius={60}
                outerRadius={85}
                fill="#82ca9d"
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div> */}
      </div>
    </div>
  );
};

export default Analisis;
