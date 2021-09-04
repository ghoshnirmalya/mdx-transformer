import { GetServerSideProps, NextPage } from "next";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";

interface IProps {
  data: {
    source: MDXRemoteSerializeResult<Record<string, unknown>>;
    frontMatter: {
      [key: string]: any;
    };
  };
}

const IndexPage: NextPage<IProps> = ({ data }) => {
  return (
    <>
      <h1>{data.frontMatter.title}</h1>
      <MDXRemote {...data.source} />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const githubResponse = await fetch(
    "https://raw.githubusercontent.com/shikijs/twoslash/main/packages/remark-shiki-twoslash/test/fixtures/highlight.md"
  );
  const githubContent = await githubResponse.text();

  console.log(githubContent);

  const response = await fetch("http://localhost:3000/api/transform", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      source: githubContent,
    }),
  });
  const data = await response.json();

  return {
    props: {
      data,
    },
  };
};

export default IndexPage;
