import type { AppProps } from "next/app";
import "../styles/code.css";

const NextApp = ({ Component, pageProps }: AppProps) => {
  return <Component {...pageProps} />;
};
export default NextApp;
