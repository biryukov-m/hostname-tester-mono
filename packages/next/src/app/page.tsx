import { Container } from '@mui/material';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { UrlTesterSection } from '@/modules/hostname-tester/containers/home-page/url-tester-section';

export default function Home() {
  return (
    <div className="App">
      <Container>
        <h1>Check Websites</h1>
        <a href="/api/auth/login">Login</a>
        <a href="/api/auth/logout">Logout</a>
        <UrlTesterSection />
      </Container>
    </div>
  );
}
