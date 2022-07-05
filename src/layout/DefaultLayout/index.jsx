import Header from '../../components/Header';
import Footer from '../../components/Footer';

function DefauLayout({ children }) {
    return (
        <>
            <Header></Header>
                {children}
            <Footer></Footer>
        </>
    );
}

export default DefauLayout;
