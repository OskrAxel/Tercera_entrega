import React, { useState, useEffect } from "react";
import { jsPDF } from "jspdf";
import { Button } from "reactstrap";
import axios from "axios";
import "jspdf-autotable";

function PDD() {
  const factura = {
    numero: "123456",
    producto: "Pïzza",
    cantidad: 5,
    precio: 20,
    fecha: "2023-06-11",
    cliente: "Angelo",
    total: "100.00",
  };

  ///
  const [data, setData] = useState([]);
  const baseUrl = "http://localhost:80/api/bec/";
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
  useEffect(() => {
    peticionGet();
  }, []);
  ////
  const generarPDF = () => {
    const doc = new jsPDF();

    //Encabezado de la factura
    doc.text(`Factura`, 95, 20);
    // doc.text(`Numero de Factura: ${factura.nombre}`, 10, 20);
    // doc.text(`Fecha: ${factura.fecha}`, 10, 30);
    // doc.text(`Cliente: ${factura.cliente}`, 10, 40);
    // doc.text(`Total: ${factura.total}`, 10, 50);

    //crear una tabla para los detalles de la factura
    const columns = [
      "Numero",
      "Producto",
      "Cantidad",
      "Precio",
      "Fecha",
      "Total",
    ];
    const res = [
      [
        `${data.numero}`,
        `${factura.producto}`,
        `${factura.cantidad}`,
        `${factura.precio}`,
        `${factura.fecha}`,
        `${factura.total}`,
      ],
    ];

    doc.autoTable({
      startY: 30,
      head: [columns],
      body: res,
    });

    //Guardar PDF con un nombre especifico
    doc.save(`factura_${factura.numero}.pdf`);
  };
  return (
    <div>
      <h1>FACTURA</h1>
      <h4>Aqui va el logo</h4>
      <p>Numero factura: {factura.numero}</p>
      <p>Fecha: {factura.fecha}</p>
      <p>Cliente: {factura.cliente}</p>
      <p>Total: {factura.total}</p>
      {data.map((Usuario) => (
        <tr className="text-center" key={Usuario.id}>
          <td>{Usuario.id}</td>
          <td>{Usuario.nombre}</td>
          <td>{Usuario.apellido}</td>
          <td>{Usuario.email}</td>
          <td>{Usuario.carrera}</td>
          <td>{Usuario.anio}</td>
          <td>{Usuario.celular}</td>
          <td>{Usuario.ciudad}</td>
          <td>{Usuario.direccion}</td>
          <td>{Usuario.nom_pad}</td>
          <td>{Usuario.nom_mad}</td>
        </tr>
      ))}
      <Button onClick={generarPDF}>Generar PDF</Button>
    </div>
  );
}
export default PDD;
