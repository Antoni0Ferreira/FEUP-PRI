
export default function Footer() {
  return (
    <>
      <div className="footer" style={{ position: "fixed", bottom: 0, width: "100%" }}>
        <div className="grid-container lg:grid-cols-4 md:grid-cols-3 sd:grid-cols-1">
          <div className="text-container lg:text-s md:pb-0 pb-1 pt-1">
            <p>Project developed in Proceedings of Information Processing and Retrieval - FEUP © 2023</p>
          </div>
        </div>
      </div>
    </>
  );
}