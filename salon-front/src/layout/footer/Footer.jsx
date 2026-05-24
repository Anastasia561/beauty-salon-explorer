import "./Footer.css";

const Footer = () => {
    return (
        <footer className="footer">
            <p className="footer-text">
                © {new Date().getFullYear()} Beauty Salon System
            </p>
        </footer>
    );
};

export default Footer;