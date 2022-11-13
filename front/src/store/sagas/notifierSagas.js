import {takeEvery} from "redux-saga/effects";
import {toast} from "react-toastify";
import {addNotification} from "../actions/notifierActions";

export function* addNotificationSaga({payload}) {
    const {message, variant, options} = payload;

    const defaultOptions = {
        position: "bottom-right",
        autoClose: 3500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    };

    switch (variant) {
        case 'info':
            yield toast.info(message, {...defaultOptions, ...options});
            break;
        case 'success':
            yield toast.success(message, {...defaultOptions, ...options});
            break;
        case 'warn':
            yield toast.warn(message, {...defaultOptions, ...options});
            break;
        case 'error':
            yield toast.error(message, {...defaultOptions, ...options});
            break;
        default:
            console.error('Incorrect type');
    }
}

const notifierSagas = [
    takeEvery(addNotification,addNotificationSaga),
];

export default notifierSagas;