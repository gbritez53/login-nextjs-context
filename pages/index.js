import React, { useContext } from "react";
import Link from "next/link";
import Head from "next/head";
import useUser from "../lib/useUser";
import { AuthGlobal } from "../context/store/Auth";
import { logoutUser } from "../context/actions/autenticacion.action";

const index = () => {
  const context = useContext(AuthGlobal);
  const user = useUser("/login");

  if (!user || !user.isAuthenticated) {
    return null;
  }
  const cerrarSesion = () => {
    logoutUser(context.dispatch);
  };
  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>
      <h1>Dashboard</h1>
      <Link href="/otro">Otro</Link>
      <Link href="/saludos">Saludos</Link>
      <button onClick={cerrarSesion}>Cerrar Sesión</button>
    </>
  );
};

export default index;
