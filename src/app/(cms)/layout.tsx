import type {ReactNode} from "react"
import "../globals.css"

export default function RootLayout({ children }: {children:ReactNode}) {
    return (
      <html lang="en">
        <head>
          <link
            rel="icon"
            href="https://johnhenry.github.io/image/iajh.png"
            type="image/png"
          ></link>
          <link
            href="https://fonts.googleapis.com/icon?family=Material+Icons"
            rel="stylesheet"
          />
        </head>
        <body id="outstatic">{children}</body>
      </html>
    )
  }