import { take, fork, put, call } from 'redux-saga/effects';
import axios from 'axios';
import config from 'constants/config';
import types from 'store/actionTypes';
import { failureEmail, successEmail } from 'store/actionCreators/email';

function* processEmail({ name, email, message, close }) {
  console.log('name, email, message', name, email, message)
  try {
    yield call(axios.post, `https://play.grwth.hk/send-email`, {
      // to: config.EMAIL_SEND_TO,
      // from: config.EMAIL_SEND_FROM || email,
      to: 'markdrake0916@gmail.com',
      from: email,
      subject: `${name} <${email}>`,
      message: message,
    });
    console.log("=== success ==");
    yield put(successEmail());
    if (close) close();
  } catch (e) {
    yield put(failureEmail(e));
  }
}

export function* onRequestEmail() {
  while (true) {
    const action = yield take(types.EMAIL_REQUEST);
    yield fork(processEmail, action);
  }
}