import React from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import { collection, getDocs, onSnapshot } from '@firebase/firestore';
import {
  firestore,
  convertCollectionSnapshopToMap,
} from '../../firebase/firebase.utils';

import CollectionsOverview from '../../components/collections-overview/collections-overview.component';
import CollectionPage from '../collection/collection.component';

import { updateCollections } from '../../redux/shop/shop.actions';

import WithSpinner from '../../components/with-spinner/with-spinner.component';
const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);

class ShopPage extends React.Component {
  state = {
    loading: true,
  };

  unsubscribeFromSnapshot = null;
  // https://firestore.googleapis.com/v1/projects/crown-clothing-d09fb
  // /databases/(default)/documents/
  componentDidMount() {
    const { updateCollections } = this.props;
    const collectionRef = collection(firestore, 'collections');

    //? WITH fetch
    // fetch(
    //   'https://firestore.googleapis.com/v1/projects/crown-clothing-d09fb/databases/(default)/documents/collections'
    // )
    //   .then(response => response.json())
    //   .then(collections => console.log(collections));

    //? WITH getDocs
    getDocs(collectionRef).then(snapshot => {
      const collectionsMap = convertCollectionSnapshopToMap(snapshot);
      updateCollections(collectionsMap);
      this.setState({ loading: false });
    });

    //? WITH onSnapshot
    // this.unsubscribeFromSnapshot = onSnapshot(collectionRef, async snapshot => {
    //   const collectionsMap = convertCollectionSnapshopToMap(snapshot);
    //   updateCollections(collectionsMap);
    //   this.setState({ loading: false });
    // });
  }

  render() {
    const { match } = this.props;
    const { loading } = this.state;
    return (
      <div className='shop-page'>
        <Route
          exact
          path={`${match.path}`}
          render={props => (
            <CollectionsOverviewWithSpinner isLoading={loading} {...props} />
          )}
        />
        <Route
          path={`${match.path}/:collectionId`}
          render={props => (
            <CollectionPageWithSpinner isLoading={loading} {...props} />
          )}
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
