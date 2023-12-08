export default function Footer() {
    return (
        <>
            <div className="footer" style={{ position: "fixed", bottom: 0, width: "100%" }}>
                <div className="grid-container">
                    <div className="text-container">
                        <p>Project developed in Proceedings of Information Processing and Retrieval - FEUP © 2023</p>
                        <p><a href="/aboutUs">About Us</a></p>
                    </div>
                </div>
            </div>
        </>
    );
}