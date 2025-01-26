import Nav from '@components/Nav';
import '@styles/globals.css';
import Provider from '@components/Provider';

export const metadata = {
    title : "Promptopia",
    description : "Discover & Share AI Prompts"
}

const RootLayout = ({children}) => {
  return (
    <html>
        <body>
            <Provider>
                <div className="main">
                    <div className="bg-green-200"/>
                </div>

                <main className='app'>
                    <Nav />
                    {children}
                </main>
            </Provider>
        </body> 
    </html>
  )
}

export default RootLayout;
