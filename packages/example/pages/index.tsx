import { GetServerSideProps, NextPage } from "next";
import markdown from "../content/sample-1.md";

interface IProps {
  content: string;
  frontMatter: {
    [key: string]: string;
  };
}

const mdxTransformerConfig = {
  theme: "dark-plus",
};

const IndexPage: NextPage<IProps> = ({ content, frontMatter }) => {
  const createMarkup = () => {
    return { __html: content };
  };

  return (
    <div>
      <div>
        <div>{frontMatter.category}</div>
        <h1>{frontMatter.title}</h1>
        <div>Published on {frontMatter.date}</div>
      </div>
      <article dangerouslySetInnerHTML={createMarkup()} />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const response = await fetch(`${process.env.API_ENDPOINT}/api/transform`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      source: markdown,
      config: mdxTransformerConfig,
    }),
  });
  const { content, frontMatter } = await response.json();

  return {
    props: {
      content,
      frontMatter,
    },
  };
};

export default IndexPage;
