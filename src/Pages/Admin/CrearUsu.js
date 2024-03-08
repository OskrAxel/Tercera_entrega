import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function ListUser() {
  const navigate = useNavigate();

  const [inputs, setInputs] = useState([]);

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };
  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .post("https://bqef-bo.com/api/user/save", inputs)
      .then(function (response) {
        console.log(response.data);
        navigate("/");
      });
  };
  return (
    <div>
      <h1>Crear Usuario</h1>
      <form onSubmit={handleSubmit}>
        <table cellSpacing="10">
          <tbody>
            <tr>
              <th>
                <label>Nombres y apellidos: </label>
              </th>
              <td>
                <input type="text" name="nombre" onChange={handleChange} />
                <br />
                <input type="text" name="apellido" onChange={handleChange} />
              </td>
            </tr>
            <tr>
              <th>
                <label>Email: </label>
              </th>
              <td>
                <input type="text" name="email" onChange={handleChange} />
              </td>
            </tr>
            <tr>
              <th>
                <label>Clave: </label>
              </th>
              <td>
                <input type="text" name="password" onChange={handleChange} />
              </td>
            </tr>
            <tr>
              <th>
                <label>Celular: </label>
              </th>
              <td>
                <input type="text" name="celular" onChange={handleChange} />
              </td>
            </tr>
            <tr>
              <td colSpan="2" align="right">
                <button>Guardar</button>
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    </div>
  );
}
