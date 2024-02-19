import React, { Component } from "react";

class Pdf2 extends Component {
  componentDidMount() {
    if (typeof window.orientation !== "undefined") {
      document.getElementById("enlaceDescargarPdf").click();
      window.close();
    }
  }

  render() {
    return (
      <div style={{ position: "absolute", width: "100%", height: "100%" }}>
        <object
          data={require("../../Admin/documentos/convocatoria/CONVOCATORIA.pdf")}
          type="application/pdf"
          width="100%"
          height="100%">
          <br />
          <a
            href={require("../../Admin/documentos/convocatoria/CONVOCATORIA.pdf")}
            id="enlaceDescargarPdf"
            download="Convocatoria.pdf">
            Tu dispositivo no puede visualizar los PDF, da click aquí para
            descargarlo
          </a>
        </object>
      </div>
    );
  }
}

export default Pdf2;
