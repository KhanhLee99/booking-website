import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

export function alertConfirm(title = '', message = '', actionYes) {
    return confirmAlert({
        title: title,
        message: message,
        buttons: [
            {
                label: 'Yes',
                onClick: actionYes,
            },
            {
                label: 'No',
            }
        ],
    });
}

export function alertSuccess(title = '', message = '') {
    return confirmAlert({
        title: title,
        message: message,
        buttons: [
            {
                label: 'Ok',
            }
        ],
    });
}