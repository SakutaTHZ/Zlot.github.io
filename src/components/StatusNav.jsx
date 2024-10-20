import { useState, useEffect } from "react";
import { MdHistoryEdu, MdClose } from "react-icons/md";

const StatusNav = ({ children }) => {
  const [isClosed, setIsClosed] = useState(true);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Tab" || event.key === "l") {
        event.preventDefault();
        setIsClosed((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div
      className={`statusNav ${
        isClosed ? "closed" : ""
      } fixed left-0 top-0 w-full md:w-96 h-screen  z-50`}
    >
      {/* Render children (History component) */}
      <div className="history-container h-full px-5 overflow-y-scroll">
        {children}
      </div>
      <div className="tab">
        <span
          className="cursor-pointer"
          onClick={() => setIsClosed((prev) => !prev)}
        >
          {isClosed ? <MdHistoryEdu size={25} /> : <MdClose size={25} />}
        </span>
      </div>
    </div>
  );
};

export default StatusNav;
