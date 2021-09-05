import { toHtml } from "hast-util-to-html";
import { toHast } from "mdast-util-to-hast";
import type { HastNode } from "mdast-util-to-hast/lib";
import type { NextApiRequest, NextApiResponse } from "next";
import { remark } from "remark";
import remarkShikiTwoslash from "remark-shiki-twoslash";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "POST":
      const { source } = req.body;

      const markdownAST = remark().parse(source);

      try {
        await remarkShikiTwoslash({
          theme: "dark-plus",
        })(markdownAST);

        const hast = toHast(markdownAST, {
          allowDangerousHtml: true,
        }) as HastNode;
        const html = toHtml(hast, {
          allowDangerousHtml: true,
        });

        res.status(200).json({ html });
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
