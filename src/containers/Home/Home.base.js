import React from 'react';
import Item from 'components/Item';
import Loading from 'components/Loading';
import styles from './Home.module.css';

export default class extends React.Component {
  componentWillMount() {
    this.props.getBuckets();
  }

  renderGroup = ({ Items, BucketId }) => (
    <div key={BucketId} className={styles.itemGroup}>
      <h3>Bucket{BucketId}</h3>

      <div>
        {Items.map(item => (
          <Item
            key={item.ItemId}
            title={item.ItemTitle}
            description={item.Description}
          />
        ))}
      </div>
    </div>
  );

  render() {
    const { buckets, loading } = this.props;

    return (
      <div>
        <header className={styles.header}>InnRoad</header>

        <div className={styles.body}>
          {loading ? <Loading /> : buckets.map(this.renderGroup)}
        </div>
      </div>
    );
  }
}
