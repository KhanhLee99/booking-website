import React from "react";
import PropTypes from "prop-types";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './ReactNotification.scss';

export const NotificationStattus = {
  SUCCESS: 'success',
  ERROR: 'error',
}

const ReactNotificationComponent = ({ title, body, status }) => {
  // let hideNotif = title === "";

  // if (!hideNotif) {
  // toast.info(<Display />);
  // }
  if (status == NotificationStattus.SUCCESS) {
    toast.success(<Display />, {
      toastId: 'success1',
    });
  } else {
    toast.error(<Display />, {
      toastId: 'success1',
    });
  }


  function Display() {
    return (
      <div>
        <h4>{title}</h4>
        <p>{body}</p>
      </div>
    );
  }

  return (
    <ToastContainer
      autoClose={2000}
      hideProgressBar
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss={false}
      draggable
      pauseOnHover={false}
      height={200}
    />
  );
};

ReactNotificationComponent.defaultProps = {
  title: "This is title",
  body: "Some body",
};

ReactNotificationComponent.propTypes = {
  title: PropTypes.string,
  body: PropTypes.string,
};

export default ReactNotificationComponent;