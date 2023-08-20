
import { RichText } from "../app/posts/[id]/types";

export function parseRichText(text: RichText[], className: string): { className: string; content: string; }[] {
  const parsedText = text.map((t: RichText) => {
    let updatedClassName = className;

    for (const [key, value] of Object.entries(t.annotations)) {
      if (value && key !== "color") {
        updatedClassName += " inline";
        switch (key) {
          case "bold":
            updatedClassName += " font-bold";
            break;
          case "italic":
            updatedClassName += " italic";
            break;
          case "strikethrough":
            updatedClassName += " line-through";
            break;
          case "underline":
            updatedClassName += " underline";
            break;
          // Add more cases for other annotations if needed
          default:
            break;
        }
      }
    }
    return { className: updatedClassName.trim(), content: t.plain_text };
  });
  // console.log(parsedText);
  return parsedText;
}


export function parseRichText1(text: RichText[]): {content: string, styles: string[] }[] {
  const parsedText = text.map((t: RichText) => {
    const styles = [];
    for (const [key, value] of Object.entries(t.annotations)) {
      if (value && key !== "color") {

        switch (key) {
          case "bold":
            styles.push("bold");
            break;
          case "italic":
            styles.push("italic");
            break;
          case "strikethrough":
            styles.push("line-through");
            break;
          case "underline":
            styles.push("underline");
            break;
          // Add more cases for other annotations if needed
          default:
            break;
        }
      }
    }
    return { styles: styles , content: t.plain_text };
  });
  // console.log(parsedText);
  return parsedText;
}
