import Link from 'next/link'
import getCookie from "../lib/getCookie";
import axios from 'axios'

const saludos = ({proveedores}) => {
    return (
        <div>
            <h1>Saludos</h1>
            {proveedores.map(item=>{
                return <h1 key={item._id}>{item.nombre}</h1>
            })}
            <Link href="/">Dashboard</Link>
            <Link href="/saludo/hola">Saludo Hola</Link>
            <Link href="/saludo/chao">Saludo Chao</Link>
        </div>
    )
}

// This function gets called at build time
/*export async function getStaticProps() {
    const response = await axios.get('https://apicloudrun-eqddp726uq-uc.a.run.app/proveedor')
    return {
      props: {
        proveedores:response.data.proveedores,
      }
    }
  }*/

export const getServerSideProps = getCookie(async function ({ req, res }) {
    const authenticate = req.authenticated
    if (!authenticate) {
        return {
            redirect: {
                destination: '/login',
                permanent: false,
            },
        }
    }
    const response = await axios.get('https://apicloudrun-eqddp726uq-uc.a.run.app/proveedor')
    return {
        props: {
            proveedores:response.data.proveedores,
        }
    }
})

export default saludos
