
import { RichText } from "../app/posts/[id]/types";

export function parseRichText(text: RichText[], className: string) {
    const content = text.map((t: RichText) => {
        for (const [key, value] of Object.entries(t.annotations)) {
          if(value) {
            switch(key){
                // case "color" :
                // case "code" :
                case "bold" :
                  className += "font-bold "
                case "italic" :
                  className += "italic "
                case "strikethrough" :
                  className += "line-through "
                case "underline" :
                  className += "underline "
            }
          }
        }
        return t.plain_text;
      }).join("");
      return {content, className}
}