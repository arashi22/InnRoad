import { compose } from 'redux';
import { connect } from 'react-redux';
import { getBuckets } from 'redux/home';

export default compose(
  connect(
    state => ({
      buckets: state.home.buckets,
      loading: state.home.loading
    }),
    {
      getBuckets
    }
  )
);
