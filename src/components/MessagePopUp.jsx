import { useEffect, useState } from "react";

const MessagePopUp = ({ message }) => {
  const [showPopup, setShowPopup] = useState(true);

  // Auto dismiss after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPopup(false);
    }, 5000);

    return () => clearTimeout(timer); // Clean up the timer if the component is unmounted
  }, []);

  if (!showPopup) return null; // If the popup is dismissed, return null

  return (
    <div
      className="popupMessage fixed top-4 left-1/2 transform -translate-x-1/2 text-black font-semibold py-2 px-4 rounded-md min-w-[200px] h-[50px] flex items-center justify-center shadow-lg z-[100] cursor-pointer"
      onClick={() => setShowPopup(false)} // Dismiss when clicked
    >
      {message}
    </div>
  );
};

export default MessagePopUp;
