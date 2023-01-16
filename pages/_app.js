import { appWithTranslation } from 'next-i18next';
import Header from '../components/Header';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Header />
      <main className='container mx-auto'>
        <Component {...pageProps} />
      </main>
    </>
  );
}

export default appWithTranslation(MyApp);
