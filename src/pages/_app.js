import { SessionProvider } from 'next-auth/react';
// import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/style.css';
import '../styles/responsive.css';
import '../styles/binasea.css';
import '../styles/shortcodes.css';
import '../styles/font-awesome.css';
import '../styles/bootstrap.css';
import '../styles/jquery.fancybox.min.css';
import '../styles/animate.css';

export default function MyApp({ Component, pageProps }) {
  return (
    <SessionProvider session={pageProps.session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
} 