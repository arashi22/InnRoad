import { takeLatest } from 'redux-saga/effects';
import * as C from 'redux/constants';
import request from 'utils/request';

const getBuckets = request({
  method: 'get',
  url: '/api/buckets'
});

export default function* sagas() {
  yield takeLatest(C.GET_BUCKETS, getBuckets);
}
