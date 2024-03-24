import { Fragment } from "react";
import Link from "next/link";

import Text from "./text";
import styles from "@/styles/post.module.css";

import { Block } from "@/types/notion";
import hljs from "highlight.js";
import "highlight.js/styles/github.css";

//todo types

export function renderBlock(block: Block) {
  const { type, id } = block;

  switch (type) {
    case "paragraph":
      return (
        <p>
          <Text title={block[type].rich_text} />
        </p>
      );
    case "heading_1":
      return (
        <h1>
          <Text title={block[type].rich_text} />
        </h1>
      );
    case "heading_2":
      return (
        <h2>
          <Text title={block[type].rich_text} />
        </h2>
      );
    case "heading_3":
      return (
        <h3>
          <Text title={block[type].rich_text} />
        </h3>
      );
    case "bulleted_list": {
      return (
        <ul>
          {block[type].children.map((child: Block) => renderBlock(child))}
        </ul>
      );
    }
    case "numbered_list": {
      return (
        <ol>
          {block[type].children.map((child: Block) => renderBlock(child))}
        </ol>
      );
    }
    case "bulleted_list_item":
    case "numbered_list_item":
      return (
        <li key={block.id}>
          <Text title={block[type].rich_text} />
          {/* eslint-disable-next-line no-use-before-define */}
          {!!block[type].children && renderNestedList(block)}
        </li>
      );
    case "to_do":
      return (
        <div>
          <label htmlFor={id}>
            <input
              type="checkbox"
              id={id}
              defaultChecked={block[type].checked}
            />{" "}
            <Text title={block[type].rich_text} />
          </label>
        </div>
      );
    case "toggle":
      return (
        <details>
          <summary>
            <Text title={block[type].rich_text} />
          </summary>
          {block.children?.map((child) => (
            <Fragment key={child.id}>{renderBlock(child)}</Fragment>
          ))}
        </details>
      );
    case "child_page":
      return (
        <div className={styles.childPage}>
          <strong>{block[type]?.title}</strong>
          {block.children.map((child) => renderBlock(child))}
        </div>
      );
    case "image": {
      const src =
        block[type].type === "external"
          ? block[type].external.url
          : block[type].file.url;
      const caption = block[type].caption
        ? block[type].caption[0]?.plain_text
        : "";
      return (
        <figure>
          <img src={src} alt={caption} />
          {caption && <figcaption>{caption}</figcaption>}
        </figure>
      );
    }
    case "divider":
      return <hr key={id} />;
    case "quote":
      return (
        <blockquote key={id}>{block[type].rich_text[0].plain_text}</blockquote>
      );
    case "code":
      const { language } = block[type];
      if (language !== "plaintext" && !hljs.getLanguage(language)) {
        console.warn(`No language support for code block: ${language}`);
      }
      const code = block[type].rich_text[0].plain_text;
      const highlightedCode = hljs.getLanguage(language)
        ? hljs.highlight(code, { language }).value
        : hljs.highlightAuto(code).value;
      return (
        <pre className="bg-secondary flex p-3 rounded-lg overflow-x-auto">
          <code
            className={`language-${language}`}
            dangerouslySetInnerHTML={{ __html: highlightedCode }}
          />
        </pre>
      );
    case "file": {
      const srcFile =
        block[type].type === "external"
          ? block[type].external.url
          : block[type].file.url;
      const splitSourceArray = srcFile.split("/");
      const lastElementInArray = splitSourceArray[splitSourceArray.length - 1];
      const captionFile = block[type].caption
        ? block[type].caption[0]?.plain_text
        : "";
      return (
        <figure>
          <div className={styles.file}>
            📎{" "}
            <Link href={srcFile} passHref>
              {lastElementInArray.split("?")[0]}
            </Link>
          </div>
          {captionFile && <figcaption>{captionFile}</figcaption>}
        </figure>
      );
    }
    case "bookmark": {
      const href = block[type].url;
      return (
        <a
          href={href}
          target="_blank"
          rel="noreferrer noopener"
          className={styles.bookmark}
        >
          {href}
        </a>
      );
    }
    case "table": {
      return (
        <table className={styles.table}>
          <tbody>
            {block.children?.map((child, index) => {
              const RowElement =
                block[type].has_column_header && index === 0 ? "th" : "td";
              return (
                <tr key={child.id}>
                  {child.table_row?.cells?.map((cell: Block, i: number) => (
                    // eslint-disable-next-line react/no-array-index-key
                    <RowElement key={`${cell.plain_text}-${i}`}>
                      <Text title={cell} />
                    </RowElement>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      );
    }
    case "column_list": {
      return (
        <div className={styles.row}>
          {block.children.map((childBlock) => renderBlock(childBlock))}
        </div>
      );
    }
    case "column": {
      return <div>{block.children.map((child) => renderBlock(child))}</div>;
    }
    default:
      return `❌ Unsupported block (${
        type === "unsupported" ? "unsupported by Notion API" : type
      })`;
  }
}

export function renderNestedList(blocks: Block) {
  const { type } = blocks;
  const value = blocks[type];
  if (!value) return null;

  const isNumberedList = value.children[0].type === "numbered_list_item";

  if (isNumberedList) {
    return <ol>{value.children.map((block: Block) => renderBlock(block))}</ol>;
  }
  return <ul>{value.children.map((block: Block) => renderBlock(block))}</ul>;
}
