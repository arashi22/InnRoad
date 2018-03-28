import axios from 'axios';
import { call, put } from 'redux-saga/effects';

axios.defaults.baseURL = 'http://roadmapservice.azurewebsites.net';

const request = ({
  type,
  method,
  url,
  headers,
  payloadOnSuccess,
  payloadOnFail
}) =>
  function* api(action = {}) {
    const { data, params, onUploadProgress, success, fail } =
      action.payload || {};

    const requestType = type || action.type;

    try {
      if (requestType) {
        yield put({
          type: requestPending(requestType),
          payload: action.payload
        });
      }

      const res = yield call(axios.request, {
        url: typeof url === 'string' ? url : url && url(action),
        method: method.toLowerCase(),
        headers: headers || {},
        data,
        params,
        onUploadProgress
      });

      if (requestType) {
        yield put({
          type: requestSuccess(requestType),
          payload: payloadOnSuccess
            ? payloadOnSuccess(res.data, action)
            : res.data
        });
      }

      success && success(res.data);

      return res.data;
    } catch (err) {
      const errRes = err.response;

      if (requestType) {
        yield put({
          type: requestFail(requestType),
          payload: payloadOnFail ? payloadOnFail(errRes, action) : errRes
        });
      }

      fail && fail(errRes);

      return null;
    }
  };

export const requestPending = type => `${type}/pending`;
export const requestSuccess = type => `${type}/success`;
export const requestFail = type => `${type}/fail`;

export default request;
