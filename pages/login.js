import React, {useState, useContext} from 'react'
import useUser from "../lib/useUser";
import axios from 'axios'
import Cookies from 'js-cookie'
import jwt_decode from "jwt-decode";

import { AuthGlobal } from "../context/store/Auth";
import {logoutUser, setCurrentUser} from "../context/actions/autenticacion.action";

const login = () => {
    const context = useContext(AuthGlobal);
    console.log(context)
    const [correo, setcorreo] = useState("");
    const [clave, setclave] = useState("");
    const [error, seterror] = useState(null);

    const user = useUser("/" , true);
    if (user.isAuthenticated) {
        return null;
    }

    const handleSubmit = e => {
        e.preventDefault();
        const user = { correo, clave };

        if (correo === "" || clave === "") {
            seterror("Ingrese datos correctamente");
        } else {
            loginUser(user);
        }

    };

    const loginUser = user => {
        const {correo, clave} = user
        axios.post('http://localhost:3001/server/login', {
            correo,
            clave
        })
            .then( response => {
                if (response.data.ok === true) {
                    jwtToken(response.data.token)
                } else {
                    seterror(response.data.err.message)
                    logoutUser(context.dispatch);
                }
            })
            .catch( error => {
                seterror(error.response.data.err.message)
                logoutUser(context.dispatch);
            });
    };

    const jwtToken = token => {
        Cookies.set('jwt', token, { expires: 7 });

        const decoded = jwt_decode(token);
        console.log(decoded)
        seterror(null)
        context.dispatch(setCurrentUser(decoded));
    }
    return (
        <>
            <form onSubmit={handleSubmit}>
                <h1>Login</h1>
                <div>
                    <input
                        placeholder="Ingrese Usuario"
                        onChange={(e) => setcorreo(e.target.value)}
                        id="correo"
                        name="correo"
                        value={correo}
                        autoComplete="off"
                    />
                    <input
                        type="password"
                        placeholder="Ingrese Clave"
                        onChange={(e) => setclave(e.target.value)}
                        id="clave"
                        name="clave"
                        value={clave}
                    />
                    <br />

                    <button type="submit">Ingresar</button>
                    {error ? <h1>{error} </h1> : null}
                </div>
            </form>
        </>
    )
}

export default login
