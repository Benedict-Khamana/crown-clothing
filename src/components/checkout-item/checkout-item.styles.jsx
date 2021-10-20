import styled from 'styled-components';

export const CheckoutItemContainer = styled.div`
  width: 100%;
  display: flex;
  min-height: 100px;
  border-bottom: 1px solid darkgrey;
  padding: 15px 0;
  font-size: 20px;
  align-items: center;
`;

export const ImageContainer = styled.div`
  width: 23%;
  padding-right: 15px;
  img {
    width: 100%;
    height: 100%;
  }
`;

export const TextContainer = styled.span`
  width: 23%;
`;

export const QuantityContainer = styled(TextContainer)`
  display: flex;
  span {
    margin: 0 10px;
  }
  div {
    cursor: pointer;
    transform: scale(1);
    transition: all 0.2s ease;
    &:hover {
      transform: scale(1.25);
    }
    &:active {
      transform: scale(1.1);
    }
  }
`;

export const RemoveButtonContainer = styled.div`
  padding-left: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
  transform-origin: center;
  &:hover {
    transform: scale(1.25);
  }
  &:active {
    transform: scale(1.1);
  }
`;
