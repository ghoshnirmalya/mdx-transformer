import type { NextApiRequest, NextApiResponse } from "next";
import remarkVscode from "gatsby-remark-vscode";
import matter from "gray-matter";
import rehypeRaw from "rehype-raw";
import rehypeStringify from "rehype-stringify";
import remarkParse from "remark-parse";
import remarkToRehype from "remark-rehype";
import { unified } from "unified";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "POST":
      const { source, config } = req.body;
      const { content, data } = matter(source);

      const processor = unified()
        .use(remarkParse)
        .use(remarkVscode.remarkPlugin, {
          theme: "Default Light+",
          // theme: "Nord",
          // extensions: ["nord-visual-studio-code"],
          // theme: "poimandres",
          // extensions: ["pmndrs"],
          // theme: "Shades of Purple",
          // extensions: ["shades-of-purple"],
        })
        .use(remarkToRehype, { allowDangerousHtml: true })
        .use(rehypeRaw)
        .use(rehypeStringify, {
          allowDangerousHtml: true,
          closeSelfClosing: true,
        });

      try {
        const markdown = await processor.process(content);

        res.status(200).json({
          content: markdown.value,
          frontMatter: data,
        });
      } catch (error) {
        console.log(error);

        res.status(422).json({ error });
      }

      break;

    default:
      res.setHeader("Allow", ["POST"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
