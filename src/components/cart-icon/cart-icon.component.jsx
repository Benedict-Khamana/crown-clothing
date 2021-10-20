import React from 'react';
import { connect } from 'react-redux';
import { toggleCartHidden } from '../../redux/cart/cart.actions';
import { selectCartItemsCount } from '../../redux/cart/cart.selectors';
// import { ReactComponent as ShoppingIconSVG } from '../../assets/shopping-bag.svg';
import { createStructuredSelector } from 'reselect';
import {
  CartContainer,
  ItemCountContainer,
  ShoppingIcon,
} from './cart-icon.styles';

// import './cart-icon.styles.scss';

const CartIcon = ({ toggleCartHidden, itemCount }) => (
  <CartContainer onClick={toggleCartHidden}>
    <ShoppingIcon />
    <ItemCountContainer>{itemCount}</ItemCountContainer>
  </CartContainer>
);

const mapStateToProps = state =>
  createStructuredSelector({
    // itemCount: selectCartItemsCount(state),
    itemCount: selectCartItemsCount,
  });

const mapDispatchToProps = dispatch => ({
  toggleCartHidden: () => dispatch(toggleCartHidden()),
});

export default connect(mapStateToProps, mapDispatchToProps)(CartIcon);
