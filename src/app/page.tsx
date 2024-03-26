import { Container } from '@mui/material';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { UrlTesterSection } from '@/modules/hostname-tester/containers/home-page/url-tester-section';
import { getSession, withPageAuthRequired } from '@auth0/nextjs-auth0';
import Head from 'next/head';

export default withPageAuthRequired(
  async () => {
    const session = await getSession();
    const user = session?.user;
    const userRoles = user && user['/roles'];

    return (
      <div className="App">
        <Head>
          <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests" />
        </Head>
        <Container>
          {userRoles && userRoles[0] === 'Hostname check' ? (
            <UrlTesterSection />
          ) : (
            <div>
              Ви неавторизований користувач. Зверніться і надайте ваш e-mail {user && user.email}{' '}
              для того, щоб отримати дозвіл на використання програми
            </div>
          )}
        </Container>
      </div>
    );
  },
  { returnTo: '/' }
);
