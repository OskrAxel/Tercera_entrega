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
  Modal,
  ModalBody,
  ModalHeader,
} from "reactstrap";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { Bar, Doughnut } from "react-chartjs-2";
import axios from "axios";
import * as FaIcons from "react-icons/fa";
//

const Analisis = () => {
  ////GET BECARIOS AÑOS
  const [anio, setAnio] = useState([]);
  const [anioB, setAnioB] = useState([]);

  const peticionGet1bec = async () => {
    var f = new FormData();
    f.append("METHOD", "1BEC");
    await axios
      .post("http://localhost:80/api/adm/dashboard/", f)
      .then((response) => {
        console.log(response.data);
        var respuesta = response.data;
        var auxAnio = [],
          auxAnioB = [];
        respuesta.map((elemento) => {
          auxAnio.push(elemento.anio);
          auxAnioB.push(elemento.Incritos);
        });
        setAnio(auxAnio);
        setAnioB(auxAnioB);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  ////GET BECARIOS CIUDADES
  const [ciudad, setCiudad] = useState([]);
  const [region, setRegion] = useState([]);

  const peticionGetbecC = async () => {
    var f = new FormData();
    f.append("METHOD", "CIUBEC");
    await axios
      .post("http://localhost:80/api/adm/dashboard/", f)
      .then((response) => {
        console.log(response.data);
        var respuesta = response.data;
        var auxCiu = [],
          auxReg = [];
        respuesta.map((elemento) => {
          auxCiu.push(elemento.ciudad);
          auxReg.push(elemento.region);
        });
        setCiudad(auxCiu);
        setRegion(auxReg);
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
  ////GET FECHA INFORMES
  const [dataFI, setDataFI] = useState([]);

  const peticionGetFI = async () => {
    var f = new FormData();
    f.append("METHOD", "FINF");
    await axios
      .post("http://localhost:80/api/adm/dashboard/", f)
      .then((response) => {
        console.log(response.data);
        setDataFI(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
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
    peticionGetFI();
  }, []);
  ////GRAFICO BARRAS
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    ArcElement,
    Tooltip,
    Legend
  );
  const data = {
    labels: anio,
    datasets: [
      {
        label: "Incritos",
        backgroundColor: "rgba(153, 102, 255, 0.5)",
        borderColor: "rgb(153, 102, 255, 0.7)",
        borderWidth: 3,
        hoverBackgroundColor: "rgba(153, 102, 255, 0.8)",
        hoverBorderColor: "rgba(153, 102, 255)",
        data: anioB,
      },
    ],
  };
  const opciones = {
    maintainAspectRatio: false,
    responsive: true,
    ticks: {
      font: {
        size: 15,
        weight: "bold",
      },
    },
    plugins: {
      legend: {
        labels: {
          font: {
            size: 15,
            weight: "bold",
          },
        },
      },
    },
  };
  /////GRAFICO PIE
  const dataPie = {
    labels: ciudad,
    datasets: [
      {
        label: "# miembros",
        data: region,
        backgroundColor: [
          "rgba(255, 99, 132, 0.5)",
          "rgba(54, 162, 235, 0.5)",
          "rgba(255, 206, 86, 0.5)",
          "rgba(75, 192, 192, 0.5)",
          "rgba(153, 102, 255, 0.5)",
          "rgba(255, 159, 64, 0.5)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 0.7)",
          "rgba(54, 162, 235, 0.7)",
          "rgba(255, 206, 86, 0.7)",
          "rgba(75, 192, 192, 0.7)",
          "rgba(153, 102, 255, 0.7)",
          "rgba(255, 159, 64, 0.7)",
        ],
        hoverBackgroundColor: [
          "rgba(255, 99, 132, 0.8)",
          "rgba(54, 162, 235, 0.8)",
          "rgba(255, 206, 86, 0.8)",
          "rgba(75, 192, 192, 0.8)",
          "rgba(153, 102, 255, 0.8)",
          "rgba(255, 159, 64, 0.8)",
        ],
        hoverBorderColor: [
          "rgba(255, 99, 132)",
          "rgba(54, 162, 235)",
          "rgba(255, 206, 86)",
          "rgba(75, 192, 192)",
          "rgba(153, 102, 255)",
          "rgba(255, 159, 64)",
        ],
        borderWidth: 3,
      },
    ],
  };
  const opcionesPie = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
        labels: {
          font: {
            size: 15,
            weight: "bold",
          },
        },
      },
    },
  };
  var cont = 1;
  var est = "";
  /////dataFI
  const [modalVer, setModalVer] = useState(false);
  const abrirCerrarModalVer = () => {
    setModalVer(!modalVer);
  };
  ////
  const closeBtn = (
    <Button className="close" onClick={() => abrirCerrarModalVer()}>
      &times;
    </Button>
  );
  return (
    <div id="main">
      <div className="tral">
        <CardGroup>
          <Card
            color=""
            style={{
              color: "black",
              width: "18rem",
            }}
          >
            <div className="row g-0">
              <CardBody className="col-md-4">
                <CardTitle tag="h5">Cuentas</CardTitle>
                <CardSubtitle className="mb-2 text-muted" tag="h6">
                  Becarios
                </CardSubtitle>
                <CardText>
                  {dataB.map((item) => (
                    <b key={item.id} style={{ color: "rgb(33 33 185)" }}>
                      {item.CBec}
                    </b>
                  ))}
                </CardText>
                <Button className="btn-success" href="./usuarios">
                  Ver
                </Button>
              </CardBody>
              <CardBody
                className="col-md-8"
                style={{
                  width: "70px",
                  backgroundColor: "rgba(217, 83, 79, 0.7)",
                  alignItems: "center",
                  display: "flex",
                  justifyContent: "center",
                  fontSize: "8rem",
                  boxSizing: "border-box",
                }}
              >
                <FaIcons.FaUserGraduate />
              </CardBody>
            </div>
          </Card>

          <Card
            color=""
            style={{
              color: "black",
              width: "18rem",
            }}
          >
            <div className="row g-0">
              <CardBody className="col-md-4">
                <CardTitle tag="h5">Cuentas</CardTitle>
                <CardSubtitle className="mb-2 text-muted" tag="h6">
                  Personal
                </CardSubtitle>
                <CardText>
                  {dataP.map((item) => (
                    <b key={item.id} style={{ color: "rgb(33 33 185)" }}>
                      {item.CPer}
                    </b>
                  ))}
                </CardText>
                <Button className="btn-success" href="./personal">
                  Ver
                </Button>
              </CardBody>
              <CardBody
                className="col-md-8"
                style={{
                  width: "70px",
                  backgroundColor: "rgba(217, 83, 79, 0.7)",
                  alignItems: "center",
                  display: "flex",
                  justifyContent: "center",
                  fontSize: "8rem",
                  boxSizing: "border-box",
                }}
              >
                <FaIcons.FaUserTie />
              </CardBody>
            </div>
          </Card>
          <Card
            color=""
            style={{
              color: "black",
              width: "18rem",
            }}
          >
            <div className="row g-0">
              <CardBody className="col-md-4">
                <CardTitle tag="h5">Informes</CardTitle>
                <CardSubtitle className="mb-2 text-muted" tag="h6">
                  Entregados
                </CardSubtitle>
                <CardText>
                  {dataI.map((item) => (
                    <b key={item.id_doc} style={{ color: "rgb(33 33 185)" }}>
                      {item.CInf}
                    </b>
                  ))}
                </CardText>
                <Button className="btn-success" href="./informe2">
                  Ver
                </Button>
              </CardBody>
              <CardBody
                className="col-md-8"
                style={{
                  width: "70px",
                  backgroundColor: "rgba(217, 83, 79, 0.7)",
                  alignItems: "center",
                  display: "flex",
                  justifyContent: "center",
                  fontSize: "8rem",
                  boxSizing: "border-box",
                }}
              >
                <FaIcons.FaReadme />
              </CardBody>
            </div>
          </Card>
          <Card
            color=""
            style={{
              color: "black",
              width: "18rem",
            }}
          >
            <div className="row g-0">
              <CardBody className="col-md-4">
                <CardTitle tag="h5">Fecha Entrega</CardTitle>
                <CardSubtitle className="mb-2 text-muted" tag="h6">
                  Informes
                </CardSubtitle>
                <CardText>
                  {dataF.map((item) => (
                    <b key={item.id_fech} style={{ color: "rgb(33 33 185)" }}>
                      {item.fecha}
                    </b>
                  ))}
                </CardText>
                <Button disabled className="btn-success">
                  Ver
                </Button>
              </CardBody>
              <CardBody
                className="col-md-8"
                style={{
                  width: "70px",
                  backgroundColor: "rgba(217, 83, 79, 0.7)",
                  alignItems: "center",
                  display: "flex",
                  justifyContent: "center",
                  fontSize: "8rem",
                  boxSizing: "border-box",
                }}
              >
                <FaIcons.FaRegCalendarCheck />
              </CardBody>
            </div>
          </Card>
        </CardGroup>
        {/* // */}
        <Row>
          <Col sm="6">
            <Card body>
              <CardTitle tag="h5">Histórico de registros:</CardTitle>
              <CardText
                className="text-center"
                style={{ color: "rgb(33 33 185)" }}
              >
                <b>Becarios</b>
              </CardText>
              <div style={{ width: "100%", height: "400px" }}>
                <Bar data={data} options={opciones} />
              </div>
            </Card>
          </Col>
          <Col sm="6">
            <Card body>
              <CardTitle tag="h5">Registro según región:</CardTitle>
              <CardText
                className="text-center"
                style={{ color: "rgb(33 33 185)" }}
              >
                <b>Becarios</b>
              </CardText>
              <div style={{ width: "100%", height: "400px" }}>
                <Doughnut data={dataPie} options={opcionesPie} />
              </div>
            </Card>
          </Col>
        </Row>
      </div>
      <Button
        className="btn btn-danger btn-lg b-seg"
        style={{
          fontSize: 18,
          bottom: "14%",
          right: 0,
          position: "absolute",
          border: 0,
          borderRadius: 10,
        }}
        onClick={() => abrirCerrarModalVer()}
      >
        <FaIcons.FaExclamationCircle />
        &nbsp; AVISO
      </Button>

      {/* Modal VER */}
      <Modal isOpen={modalVer} size="xl">
        <ModalHeader className="header_m" close={closeBtn}>
          Reporte Entrega Informes
        </ModalHeader>
        <ModalBody>
          <Card>
            <CardBody className="p-0">
              <Row className="justify-content-center">
                <object
                  data={"http://localhost:80/api/PDF/reporte_pdf_Informes.php"}
                  type="application/pdf"
                  width="400"
                  height="600"
                >
                  <div
                    style={{
                      position: "absolute",
                      width: "100%",
                      height: "100%",
                    }}
                  ></div>
                </object>
              </Row>
            </CardBody>
          </Card>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default Analisis;
