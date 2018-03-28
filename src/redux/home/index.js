import { createAction, handleActions } from 'redux-actions';
import * as C from 'redux/constants';
import { requestPending, requestSuccess, requestFail } from 'utils/request';

// ------------------------------------
// Actions
// ------------------------------------

export const getBuckets = createAction(C.GET_BUCKETS);

// ------------------------------------
// Reducer
// ------------------------------------

const initialState = {
  buckets: [],
  loading: false
};

export default handleActions(
  {
    [requestPending(C.GET_BUCKETS)]: state => ({
      ...state,
      buckets: [],
      loading: true
    }),
    [requestSuccess(C.GET_BUCKETS)]: (state, { payload }) => ({
      ...state,
      buckets: payload,
      loading: false
    }),
    [requestFail(C.GET_BUCKETS)]: state => ({
      ...state,
      loading: false
    })
  },

  initialState
);
