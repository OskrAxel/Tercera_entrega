import React, { useState, useEffect } from "react";
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
import axios from "axios";
import * as FaIcons from "react-icons/fa";
//
const COLORS = ["#ce93d8", "#5c6bc0", "#b39ddb", "#4dd0e1"];
//

const Dashboard = () => {
  ////GET BECARIOS AÑOS
  const [charData, setCharData] = useState([]);

  const peticionGet1bec = async () => {
    var f = new FormData();
    f.append("METHOD", "1BEC");
    await axios
      .post("http://localhost:80/api/adm/dashboard/", f)
      .then((response) => {
        console.log(response.data);
        setCharData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  ////GET BECARIOS CIUDADES
  const [charDataC, setCharDataC] = useState([]);

  const peticionGetbecC = async () => {
    var f = new FormData();
    f.append("METHOD", "CIUBEC");
    await axios
      .post("http://localhost:80/api/adm/dashboard/", f)
      .then((response) => {
        console.log(response.data);
        setCharDataC(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  ////GET BECARIOS
  const [dataB, setDataB] = useState([]);

  const peticionGetB = async () => {
    var f = new FormData();
    f.append("METHOD", "BEC");
    await axios
      .post("http://localhost:80/api/adm/dashboard/", f)
      .then((response) => {
        console.log(response.data);
        setDataB(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  ////GET PERSONAL
  const [dataP, setDataP] = useState([]);
  const peticionGetP = async () => {
    var f = new FormData();
    f.append("METHOD", "PER");
    await axios
      .post("http://localhost:80/api/adm/dashboard/", f)
      .then((response) => {
        console.log(response.data);
        setDataP(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  ////
  ////GET FECHA
  const [dataF, setDataF] = useState([]);

  const peticionGetF = async () => {
    var f = new FormData();
    f.append("METHOD", "FEC");
    await axios
      .post("http://localhost:80/api/adm/dashboard/", f)
      .then((response) => {
        console.log(response.data);
        setDataF(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  ////
  ////GET INFORMES
  const [dataI, setDataI] = useState([]);

  const peticionGetI = async () => {
    var f = new FormData();
    f.append("METHOD", "INF");
    await axios
      .post("http://localhost:80/api/adm/dashboard/", f)
      .then((response) => {
        console.log(response.data);
        setDataI(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  ////
  useEffect(() => {
    peticionGet1bec();
    peticionGetbecC();
    peticionGetB();
    peticionGetP();
    peticionGetF();
    peticionGetI();
  }, []);
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
            <div className="row g-0">
              <div
                className="col-md-4"
                style={{
                  width: "110px",
                }}>
                <FaIcons.FaUserGraduate size="ms" />
              </div>
              <CardBody className="col-md-8">
                <CardTitle tag="h5">Cuentas</CardTitle>
                <CardSubtitle className="mb-2 text-muted" tag="h6">
                  Becarios
                </CardSubtitle>
                <CardText>
                  {dataB.map((item) => (
                    <b key={item.id}>{item.CBec}</b>
                  ))}
                </CardText>

                <Button className="btn-success" href="./usuarios">
                  Ver
                </Button>
              </CardBody>
            </div>
          </Card>
          <Card
            color=""
            style={{
              color: "black",
              width: "18rem",
            }}>
            <div className="row g-0">
              <div
                className="col-md-4"
                style={{
                  width: "110px",
                }}>
                <FaIcons.FaUserTie size="ms" />
              </div>
              <CardBody className="col-md-8">
                <CardTitle tag="h5">Cuentas</CardTitle>
                <CardSubtitle className="mb-2 text-muted" tag="h6">
                  Personal
                </CardSubtitle>
                <CardText>
                  {dataP.map((item) => (
                    <b key={item.id}>{item.CPer}</b>
                  ))}
                </CardText>
                <Button className="btn-success" href="./personal">
                  Ver
                </Button>
              </CardBody>
            </div>
          </Card>
          <Card
            color=""
            style={{
              color: "black",
              width: "18rem",
            }}>
            <div className="row g-0">
              <div
                className="col-md-4"
                style={{
                  width: "110px",
                }}>
                <FaIcons.FaReadme size="ms" />
              </div>
              <CardBody className="col-md-8">
                <CardTitle tag="h5">Informes</CardTitle>
                <CardSubtitle className="mb-2 text-muted" tag="h6">
                  Entregados
                </CardSubtitle>
                <CardText>
                  {dataI.map((item) => (
                    <b key={item.id_doc}>{item.CInf}</b>
                  ))}
                </CardText>
                <Button className="btn-success" href="./informe2">
                  Ver
                </Button>
              </CardBody>
            </div>
          </Card>
          <Card
            color=""
            style={{
              color: "black",
              width: "18rem",
            }}>
            <div className="row g-0">
              <div
                className="col-md-4"
                style={{
                  width: "110px",
                }}>
                <FaIcons.FaRegCalendarCheck size="ms" />
              </div>
              <CardBody className="col-md-8">
                <CardTitle tag="h5">Fecha Entrega</CardTitle>
                <CardSubtitle className="mb-2 text-muted" tag="h6">
                  Informes
                </CardSubtitle>
                <CardText>
                  {dataF.map((item) => (
                    <b key={item.id}>{item.fecha}</b>
                  ))}
                </CardText>
                <Button disabled className="btn-success">
                  Ver
                </Button>
              </CardBody>
            </div>
          </Card>
        </CardGroup>
        {/* // */}
        <Row>
          <Col sm="6">
            <Card body>
              <CardTitle tag="h5">Historico de registros:</CardTitle>
              <CardText className="text-center">Becarios</CardText>
              <ResponsiveContainer width="100%" aspect={2}>
                <BarChart
                  data={charData}
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
                  <Bar dataKey="BECARIOS" fill="#6b48ff" />
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </Col>
          <Col sm="6">
            <Card body>
              <CardTitle tag="h5">Registro según región:</CardTitle>
              <CardText className="text-center">Becarios</CardText>
              <ResponsiveContainer width="100%" aspect={2}>
                <PieChart>
                  <Pie
                    dataKey="region"
                    data={charDataC}
                    innerRadius={60}
                    outerRadius={150}
                    fill="#82ca9d">
                    {charDataC.map((entry, index) => (
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
      </div>
    </div>
  );
};

export default Dashboard;
