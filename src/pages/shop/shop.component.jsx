import React from 'react';
import { Route } from 'react-router-dom';

import CollectionsOverview from '../../components/collections-overview/collections-overview.component';
import { collection, onSnapshot } from '@firebase/firestore';
import {
  firestore,
  convertCollectionSnapshopToMap,
} from '../../firebase/firebase.utils';
import CollectionPage from '../collection/collection.component';

class ShopPage extends React.Component {
  unsubscribeFromSnapshot = null;

  componentDidMount() {
    const collectionRef = collection(firestore, 'collections');

    onSnapshot(collectionRef, async snapshot => {
      convertCollectionSnapshopToMap(snapshot);
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

const mapStateToProps = {};

export default ShopPage;
