import matter from "gray-matter";
import type { NextApiRequest, NextApiResponse } from "next";
import { serialize } from "next-mdx-remote/serialize";
import remarkShikiTwoslash from "remark-shiki-twoslash";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "POST":
      const { source } = req.body;
      const { content, data } = matter(source);
      const mdxSource = await serialize(content, {
        scope: data,
        mdxOptions: {
          remarkPlugins: [[remarkShikiTwoslash, { theme: "dark-plus" }]],
          rehypePlugins: [],
          compilers: [],
        },
      });

      const a = { source: mdxSource, frontMatter: data };

      res.status(200).json({ source: mdxSource, frontMatter: data });

      break;

    default:
      res.setHeader("Allow", ["POST"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
