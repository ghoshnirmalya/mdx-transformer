import { GetServerSideProps, NextPage } from "next";

interface IProps {
  html: string;
}

const IndexPage: NextPage<IProps> = ({ html }) => {
  const createMarkup = () => {
    return { __html: html };
  };

  return <div dangerouslySetInnerHTML={createMarkup()} />;
};

export const getServerSideProps: GetServerSideProps = async () => {
  const githubResponse = await fetch(
    "https://raw.githubusercontent.com/ghoshnirmalya/mdx-transformer/main/content/sample.md?token=ABQYPU65EOKZS7E553SUZRDBGRWN2"
  );
  const githubContent = await githubResponse.text();

  const response = await fetch("http://localhost:3000/api/transform", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      source: githubContent,
    }),
  });
  const { html } = await response.json();

  return {
    props: {
      html,
    },
  };
};

export default IndexPage;
