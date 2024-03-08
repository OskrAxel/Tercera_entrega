import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Protected(props) {
  const naviget = useNavigate();
  const { Component } = props;
  useEffect(() => {
    let login = localStorage.getItem("login");
    if (!login) {
      localStorage.setItem("loginStatus", "Por favor inicie sesión!");
      naviget("/", { replace: true });
    }
  }, [naviget]);

  return <Component />;
}
