import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Style.scss";
import * as FaIcons from "react-icons/fa";
import { Button, Input, InputGroup, InputGroupText } from "reactstrap";

function LoginAdm() {
  const navigate = useNavigate();
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");

  useEffect(() => {
    let login = localStorage.getItem("login");
    if (login) {
      navigate("/dashboard");
    }
    let loginStatus = localStorage.getItem("loginStatus");
    if (loginStatus) {
      setError(loginStatus);
      setTimeout(function () {
        localStorage.clear();
        window.location.reload();
      }, 3000);
    }
    setTimeout(function () {
      setMsg("");
    }, 5000);
  }, [msg]);

  const handleInputChange = (e, type) => {
    switch (type) {
      case "user":
        setError("");
        setUser(e.target.value);
        if (e.target.value === "") {
          setError("Nombre de usuario vacío");
        }
        break;
      case "pass":
        setError("");
        setPass(e.target.value);
        if (e.target.value === "") {
          setError("Contraseña esta vacía");
        }
        break;
      default:
    }
  };

  function loginSubmit() {
    if (user !== "" && pass != "") {
      var url = "https://bqef-bo.com/api/loginAdm.php";
      var headers = {
        Accept: "application/json",
        "Content-type": "application/json",
      };
      var Data = {
        user: user,
        pass: pass,
      };
      fetch(url, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(Data),
      })
        .then((response) => response.json())
        .then((response) => {
          console.log(response);
          if (
            response[0].result === "Usuario no válido!" ||
            response[0].result === "Contraseña no válida!"
          ) {
            setError(response[0].result);
          } else {
            setMsg(response[0].result);
            setTimeout(function () {
              localStorage.setItem("login", true);
              localStorage.setItem("user", user);
              navigate("/dashboard");
            }, 5000);
          }
        })
        .catch((err) => {
          setError(err);
          console.log(err);
        });
    } else {
      setError("Llenar todos los campos!");
    }
  }
  return (
    <>
      <div id="form">
        <div className="text-center">
          <h1 className="im">
            <FaIcons.FaUserSecret />
          </h1>
          <h2>INICIAR SESIÓN ADMIN</h2>
          <br />
        </div>
        <br />
        <p>
          {error !== "" ? (
            <span className="error">{error}</span>
          ) : (
            <span className="success">{msg}</span>
          )}
        </p>
        <InputGroup>
          <InputGroupText>
            <FaIcons.FaUserAlt style={{ color: "rgb(17, 119, 167)" }} />
          </InputGroupText>
          <Input
            className="form-control"
            type="text"
            placeholder="Usuario"
            value={user}
            onChange={(e) => handleInputChange(e, "user")}
          />
        </InputGroup>
        <br />
        <InputGroup>
          <InputGroupText>
            <FaIcons.FaLock style={{ color: "rgb(17, 119, 167)" }} />
          </InputGroupText>
          <Input
            className="form-control"
            type="password"
            placeholder="Contraseña"
            value={pass}
            onChange={(e) => handleInputChange(e, "pass")}
          />
        </InputGroup>
        <br />
        <Button className="bt" onClick={loginSubmit}>
          INGRESAR
        </Button>
      </div>
    </>
  );
}
export default LoginAdm;
