export interface RichText {
    type: string
    text: Text
    annotations: Annotations
    plain_text: string
    href: any
  }
  
  export interface Text {
    content: string
    link: any
  }
  
  export interface Annotations {
    bold: boolean
    italic: boolean
    strikethrough: boolean
    underline: boolean
    code: boolean
    color: string
  }
  