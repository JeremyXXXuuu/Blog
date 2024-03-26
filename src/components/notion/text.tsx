import { cn } from "@/lib/utils";

export default function Text({ title }: { title: any }) {
  if (!title) {
    return null;
  }
  return title.map((value: any) => {
    const {
      annotations: { bold, code, color, italic, strikethrough, underline },
      text,
    } = value;
    return (
      <span
        className={cn(
          "inline",
          // color !== "default" && `text-${color}-500`,
          color === "red" && "text-red-500",
          color === "gray" && "text-gray-500",
          color === "blue" && "text-blue-500",
          color === "green" && "text-green-500",
          color === "purple" && "text-purple-500",
          color === "pink" && "text-pink-500",
          color === "yellow" && "text-yellow-500",
          color === "brown" && "text-brown-500",
          color === "orange" && "text-orange-500",
          color === "cyan" && "text-cyan-500",

          bold && "font-bold",
          code && "bg-input p-0.5 rounded-sm text-pink-600",
          italic && "italic",
          strikethrough && "line-through",
          underline && "underline"
        )}
        key={text.content}
      >
        {text.link ? (
          <a className="underline" href={text.link.url}>
            {text.content}
          </a>
        ) : (
          text.content
        )}
      </span>
    );
  });
}
