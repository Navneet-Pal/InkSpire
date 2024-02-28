import '@styles/global.css';
import Navbar from '@components/Navbar';
import Provider from '@components/Provider';


export const metadata = {
  title: 'InkSpire',
  description: 'Discover & share AI Prompts',
  
}

export default function RootLayout({ children }) {
 return (
    <html lang="en">
    <head><link rel="icon" href="assets/images/logo.svg" sizes="any" /></head>
      <body>
        <Provider>

          <div className="main">
            <div className='gradient'/>
          </div>

          <main className='app'>
            <Navbar/>
            {children}
          </main>

        </Provider>
      </body>
    </html>
  )
}
