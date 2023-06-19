import { Html, Head, Main, NextScript } from 'next/document'

/*_document to set lang, load fonts, load scripts before page interactivity, 
collect style sheets for CSS in JS solutions like Styled Components, among a few other things */
export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
