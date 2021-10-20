import React from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import CollectionsOverview from '../../components/collections-overview/collections-overview.component';
import { collection, onSnapshot } from '@firebase/firestore';
import {
  firestore,
  convertCollectionSnapshopToMap,
} from '../../firebase/firebase.utils';
import CollectionPage from '../collection/collection.component';
import { updateCollections } from '../../redux/shop/shop.actions';
class ShopPage extends React.Component {
  unsubscribeFromSnapshot = null;

  componentDidMount() {
    const { updateCollections } = this.props;
    const collectionRef = collection(firestore, 'collections');

    this.unsubscribeFromSnapshot = onSnapshot(collectionRef, async snapshot => {
      const collectionsMap = convertCollectionSnapshopToMap(snapshot);
      updateCollections(collectionsMap);
    });
  }
  render() {
    const { match } = this.props;
    return (
      <div className='shop-page'>
        <Route exact path={`${match.path}`} component={CollectionsOverview} />
        <Route
          path={`${match.path}/:collectionId`}
          component={CollectionPage}
        />
      </div>
    );
  }
}

// const mapStateToProps = {};
const mapDispatchToProps = dispatch => ({
  updateCollections: collectionsMap =>
    dispatch(updateCollections(collectionsMap)),
});

export default connect(null, mapDispatchToProps)(ShopPage);
