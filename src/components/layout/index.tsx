import Navbar from "../navbar";

export const metadata = {
  title: 'Next.js',
  description: 'Generated by Next.js',
}


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return <div className="h-screen">
        <Navbar />
        <div>
            { children }
        </div>
  </div>

}