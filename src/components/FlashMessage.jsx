import React, { useEffect, useState } from "react";
import { MdErrorOutline, MdCheckCircleOutline } from "react-icons/md";

function FlashMessage({ duration, severity, message }) {
  const [showMessage, setShowMessage] = useState(true);

  useEffect(() => {
    let unmounted = false;

    window.setTimeout(() => {
      if (!unmounted) {
        setShowMessage(false);
      }
    }, duration);

    return () => {
      unmounted = true;
    };
  }, [duration]);

  return (
    showMessage && (
      <div className="flex flex-row">
        <p className={`flex flash-${severity}`} data-testid="flash-message">
          <span className="flex items-center mr-1">
            {severity === "info" ? (
              <MdCheckCircleOutline />
            ) : (
              <MdErrorOutline />
            )}
          </span>
          {message}
        </p>
      </div>
    )
  );
}

export default FlashMessage;
