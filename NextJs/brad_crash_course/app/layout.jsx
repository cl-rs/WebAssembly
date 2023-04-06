import './globals.css'

export const metadata = {
  title: 'Chad Media',
  description: 'Generated by Chad',
  keywords:'Chad, Cherdleys, chad, cheb, '
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
