import { Fragment, useState, useEffect } from "react";
import Link from "next/link";

import Text from "./text";
import styles from "@/styles/post.module.css";

import { Block } from "@/types/notion";
import hljs from "highlight.js";
import "highlight.js/styles/github-dark-dimmed.css";
import Image from "next/image";

//todo types

// Image Modal Component
function ImageModal({
  src,
  alt,
  caption,
  isOpen,
  onClose,
}: {
  src: string;
  alt: string;
  caption?: string;
  isOpen: boolean;
  onClose: () => void;
}) {
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      // Prevent background scroll when modal is open
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div className="relative max-w-full max-h-full">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white bg-black bg-opacity-50 rounded-full w-8 h-8 flex items-center justify-center hover:bg-opacity-70 transition-all z-10"
          aria-label="Close modal"
        >
          ✕
        </button>
        <div className="relative">
          <Image
            src={src}
            alt={alt}
            width={1200}
            height={800}
            className="max-w-full max-h-[90vh] object-contain"
            onClick={(e) => e.stopPropagation()}
          />
          {caption && (
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 text-white p-2 text-center">
              {caption}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ImageBlock Component with modal functionality
function ImageBlock({ block }: { block: Block }) {
  const [modalImage, setModalImage] = useState<{
    src: string;
    alt: string;
    caption?: string;
  } | null>(null);

  const src =
    block.image.type === "external"
      ? block.image.external.url
      : block.image.file.url;
  const caption = block.image.caption ? block.image.caption[0]?.plain_text : "";
  const alt = caption || "block img";

  const openModal = () => {
    setModalImage({ src, alt, caption });
  };

  const closeModal = () => {
    setModalImage(null);
  };

  return (
    <>
      <figure>
        <div
          className="h-auto max-w-full shadow-2xl cursor-pointer hover:shadow-xl transition-all duration-300 relative group"
          onClick={openModal}
          title="Click to view image in modal"
        >
          <Image
            src={src}
            width={500}
            height={500}
            alt={alt}
            className="rounded-lg transition-transform duration-300 group-hover:scale-105"
          />
          {/* Overlay with zoom icon */}
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 rounded-lg flex items-center justify-center">
            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white bg-opacity-90 rounded-full p-2">
              <svg
                className="w-6 h-6 text-gray-700"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                />
              </svg>
            </div>
          </div>
        </div>
        {caption && (
          <figcaption className="text-center text-gray-600 mt-2 text-sm">
            {caption}
          </figcaption>
        )}
      </figure>

      <ImageModal
        src={modalImage?.src || ""}
        alt={modalImage?.alt || ""}
        caption={modalImage?.caption}
        isOpen={!!modalImage}
        onClose={closeModal}
      />
    </>
  );
}

// YouTube Video Component
function YouTubeEmbed({ videoId, title }: { videoId: string; title?: string }) {
  return (
    <div className="relative w-full aspect-video">
      <iframe
        className="absolute top-0 left-0 w-full h-full rounded-lg shadow-lg"
        src={`https://www.youtube.com/embed/${videoId}`}
        title={title || "YouTube video"}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      />
    </div>
  );
}

// Vimeo Video Component
function VimeoEmbed({ videoId, title }: { videoId: string; title?: string }) {
  return (
    <div className="relative w-full aspect-video">
      <iframe
        className="absolute top-0 left-0 w-full h-full rounded-lg shadow-lg"
        src={`https://player.vimeo.com/video/${videoId}`}
        title={title || "Vimeo video"}
        frameBorder="0"
        allow="autoplay; fullscreen; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}

// Video Block Component with YouTube and Vimeo support
function VideoBlock({ block }: { block: Block }) {
  const src =
    block.video.type === "external"
      ? block.video.external.url
      : block.video.file.url;

  const caption = block.video.caption ? block.video.caption[0]?.plain_text : "";

  // Check if it's a YouTube URL
  const getYouTubeVideoId = (url: string): string | null => {
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  // Check if it's a Vimeo URL
  const getVimeoVideoId = (url: string): string | null => {
    const regExp = /^.*(vimeo\.com\/)([0-9]+)/;
    const match = url.match(regExp);
    return match ? match[2] : null;
  };

  const youtubeVideoId = getYouTubeVideoId(src);
  const vimeoVideoId = getVimeoVideoId(src);

  if (youtubeVideoId) {
    return (
      <figure className="my-4">
        <YouTubeEmbed videoId={youtubeVideoId} title={caption} />
        {caption && (
          <figcaption className="text-center text-gray-600 mt-2 text-sm">
            {caption}
          </figcaption>
        )}
      </figure>
    );
  }

  if (vimeoVideoId) {
    return (
      <figure className="my-4">
        <VimeoEmbed videoId={vimeoVideoId} title={caption} />
        {caption && (
          <figcaption className="text-center text-gray-600 mt-2 text-sm">
            {caption}
          </figcaption>
        )}
      </figure>
    );
  }

  // For other videos, use regular video element
  return (
    <figure className="my-4">
      <video
        controls
        className="w-full rounded-lg shadow-lg"
        style={{ maxHeight: "500px" }}
      >
        <source src={src} type="video/mp4" />
        <source src={src} type="video/webm" />
        <source src={src} type="video/ogg" />
        Your browser does not support the video tag.
      </video>
      {caption && (
        <figcaption className="text-center text-gray-600 mt-2 text-sm">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

export function renderBlock(block: Block, theme?: string) {
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
        <ul className="list-disc list-inside space-y-1 ml-4">
          {block[type].children.map((child: Block) =>
            renderBlock(child, theme)
          )}
        </ul>
      );
    }
    case "numbered_list": {
      return (
        <ol className="list-decimal list-inside space-y-1 ml-4">
          {block[type].children.map((child: Block) =>
            renderBlock(child, theme)
          )}
        </ol>
      );
    }
    case "bulleted_list_item":
    case "numbered_list_item":
      return (
        <li key={block.id} className="list-item">
          {/* Render the main rich text content if it exists */}
          {block[type].rich_text && block[type].rich_text.length > 0 && (
            <Text title={block[type].rich_text} />
          )}

          {/* Render any child blocks (like images, code blocks, nested content, etc.) */}
          {block.children && block.children.length > 0 && (
            <div className="mt-2 ml-6">
              {block.children.map((child) => (
                <div key={child.id} className="mb-2">
                  {renderBlock(child, theme)}
                </div>
              ))}
            </div>
          )}

          {/* Render nested lists using the specialized function */}
          {!!block[type].children && (
            <div className="mt-1">{renderNestedList(block)}</div>
          )}
        </li>
      );
    case "to_do":
      return (
        <div key={block.id}>
          <label htmlFor={id} className="flex items-start gap-2">
            <input
              type="checkbox"
              id={id}
              defaultChecked={block[type].checked}
              className="mt-1"
            />
            <div className="flex-1">
              {/* Render the main rich text content if it exists */}
              {block[type].rich_text && block[type].rich_text.length > 0 && (
                <Text title={block[type].rich_text} />
              )}

              {/* Render any child blocks within the to-do item */}
              {block.children?.map((child) => (
                <Fragment key={child.id}>{renderBlock(child, theme)}</Fragment>
              ))}
            </div>
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
            <Fragment key={child.id}>{renderBlock(child, theme)}</Fragment>
          ))}
        </details>
      );
    case "child_page":
      return (
        <div className={styles.childPage}>
          <strong>{block[type]?.title}</strong>
          {block.children.map((child) => renderBlock(child, theme))}
        </div>
      );
    case "image": {
      return <ImageBlock block={block} />;
    }
    case "video": {
      return <VideoBlock block={block} />;
    }
    case "divider":
      return <hr key={id} />;
    case "quote":
      return (
        <blockquote key={id}>{block[type].rich_text[0].plain_text}</blockquote>
      );
    case "code":
      const { language } = block[type];
      if (language !== "plain text" && !hljs.getLanguage(language)) {
        console.warn(`No language support for code block: ${language}`);
      }
      const code = block[type].rich_text[0].plain_text;
      const highlightedCode = hljs.getLanguage(language)
        ? hljs.highlight(code, { language }).value
        : hljs.highlightAuto(code).value;
      return (
        <pre
          className="bg-secondary flex p-3 rounded-lg overflow-x-auto"
          style={{ whiteSpace: "pre-wrap" }}
        >
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
          {block.children.map((childBlock) => renderBlock(childBlock, theme))}
        </div>
      );
    }
    case "column": {
      return (
        <div>{block.children.map((child) => renderBlock(child, theme))}</div>
      );
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
