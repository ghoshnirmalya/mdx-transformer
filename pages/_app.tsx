import type { AppProps } from "next/app";
import "../styles/shiki-twoslash.css";

const NextApp = ({ Component, pageProps }: AppProps) => {
  return <Component {...pageProps} />;
};
export default NextApp;
