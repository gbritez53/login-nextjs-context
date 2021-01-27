import React from 'react'
import useUser from "../../lib/useUser";

const Posts = ({postData}) => {
    const user = useUser("/login" );
    if (!user || !user.isAuthenticated) {
        return null;
    }
    return (
        <div>
            <h1>Posts {postData}</h1>
            <img src="/vercel.svg" alt="Vercel Logo" className="logo" />
        </div>
    )
}
export async function getStaticPaths() {
    // Return a list of possible value for id
    const paths = [{params:{id:'ssg-ssr'}},{params:{id:'pre-rendering'}}]
    return {
        paths,
        fallback:false
    }
}

export async function getStaticProps(context) {
    const postData = context.params.id
    return {
      props: {
        postData
      }
    }
  }


export default Posts
