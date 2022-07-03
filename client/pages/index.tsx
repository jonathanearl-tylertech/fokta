import type { NextPage } from 'next';
import Head from 'next/head';
import { GetServerSideProps } from 'next';
import { getUserSession } from '../lib/userSession';
import { ParsedUrlQuery } from 'querystring';
import { useEffect } from 'react';

const Home: NextPage = (props: any) => {
  useEffect(() => {
    console.log(document.referrer);
  })

  const handler = (e: any) => {
    // console.log(window.history)
    // console.log(document.referrer)
    // console.log(e);
    console.log('helloworld2');
  }

  return (
    <div>
      <Head>
        <title>Fokta | Login</title>
      </Head>
      <main style={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}>
        <div style={{
          width: "306px",
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}>
          <header>
            <img src='logo-wide.png' style={{ width: '300px', height: '200px' }} />
          </header>
          email
          <input 
          onChange={handler}
          style={{
            fontSize: '2em',
            marginBottom: '1em',
          }} type="text" />
          password
          <input style={{
            fontSize: '2em',
            marginBottom: '1em',
          }} type="text" />
        </div>
      </main>

    </div>
  )
}
export default Home

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   const { req, res, resolvedUrl, query } = context;
//   const { client_id } = query;
//   const client = await getClient(client_id as string);

//   const errors: Array<{ msg: string }> = await validateClient(query, client);
//   if (errors.length > 0)
//     return { props: { errors } };

//   // resolve org data
//   const redirectUrl = resolvedUrl ?? '/app/dashboard';
//   const user = await getUserSession(req, res);
//   if (!user)
//     return { props: { redirectUrl } };
//   // create code -> tied to user and authserver?
//   return { redirect: { destination: redirectUrl, permanent: false, }, };
// }

// const getClient = async (client_id: string) => {
//   if (!client_id)
//     return null;

//   const data = await fetch(`http://localhost:5001/api/v1/clients/${client_id}`);
//   if (data.ok)
//     return data.json();

//   return null;
// }

// const validateClient = async (query: ParsedUrlQuery, client: any) => {
//   const { client_id, redirect_uri, response_type, scope } = query;

//   const errors: Array<{ msg: string }> = [];
//   if (!client_id)
//     errors.push({ msg: `client_id is required.` });

//   if (client_id && !client)
//     errors.push({ msg: `client_id ${client_id} not found.` });

//   if (!scope?.includes('openid'))
//     errors.push({ msg: `scope openid is required.` });

//   if (client
//     && !client.redirect_uris.includes('*')
//     && !client.redirect_uris.includes(redirect_uri))
//     errors.push({ msg: `redirect_url ${redirect_uri} not found.` });

//   if (response_type !== 'code')
//     errors.push({ msg: `response_type ${response_type} not supported. only code flow allowed` });

//   return errors;
// }

