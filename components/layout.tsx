
// import '../styles/globals.css'
import Navbar from './navbar';


export const metadata = {
    title: {
      default: '',
      template: '',
    },
    description: 'Developer, writer, and creator.',
  };


export default function Layout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return( 
    <div>
        <Navbar/>
        <div>{children}</div>
    </div>
    
    )
  }