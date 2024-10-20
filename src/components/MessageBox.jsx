import React, { useState, useEffect } from "react";

const MessageBox = ({messageText,customClass})=>{

    return (
        <div className={`messageBox fixed animate-appear -top-8 min-w-32 px-2 py-2 text-2xl flex justify-center items-center z-50 ${customClass}`}>
            {messageText}
        </div>
    )
}

export default MessageBox;