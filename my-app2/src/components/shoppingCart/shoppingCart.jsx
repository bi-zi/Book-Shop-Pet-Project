import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { removeItemById } from '../../store/reducers/cart.actions';
import './shoppingCart.css';
//import { useDispatch } from 'react-redux';

const ShoppingCart = ({ items, total, itemsCount, removeItem }) => {
  const [cardConnect, setCardConnect] = useState(items);

  let newPosts=[];
  newPosts = items;

  const countPlus = (id) => {
    newPosts.map((post) => {
      if (post.id === id) {
        post.counter++;
      }
    });
    setCardConnect(newPosts.concat([]));
  };

  const countMinus = (id) => {
    newPosts.map((post) => {
      if (post.id === id) {
        post.counter--;
      }
    });
    setCardConnect(newPosts.concat([]));
  };

  return (
    <div className="cart">
      <div className="menu">
        <div className="goods_quantity">Корзина: {itemsCount}</div>
        <div className="remove_all_products">Удалить все товары</div>
      </div>

      <div className="cart_container">
        {itemsCount > 0 ? (
          <div className="total_price">{total}</div>
        ) : (
          <div className="empty_basket">Ваша корзина пуста</div>
        )}

        {newPosts.map((book) => {
          return (
            <div className="product" key={book.id}>
              <div className="product_info">
                <div className="product_cart_name">{book.bookName}</div>
                <div className="product_cart_author">{book.authorName}</div>
              </div>

              <div key={book?.id} className="product_counter">
                {book.counter > 1 ? (
                  <button className="counter_minus" onClick={() => countMinus(book.id)}>
                    —
                  </button>
                ) : (
                  <button className="counter_minus">—</button>
                )}
                <div className="counter_number">{book.counter}</div>
                <button className="counter_plus" onClick={() => countPlus(book.id)}>
                  +
                </button>
              </div>

              <div className="product_cost">
                <div className="product_price">{book.price * book.counter} ₽</div>
                <div className="price_multiplication">
                  {book?.price} ₽ x {book.counter}шт
                </div>
              </div>

              <div className="removeProduct">
                <button onClick={() => removeItem(book.id)}>X</button>
              </div>

              <Link to={`/Book/${book.id}`}>
                <div className="product_cart_book">
                  <div className="product_cart_settings">
                    <img height="250px" width="150px" src={book.imageUrl} alt="" />
                  </div>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const mapStateToProps = ({ cart: { cartItems } }) => ({
  items: cartItems,
  total: cartItems.reduce((acc, item) => (acc += item.price * item.quantity), 0),
  itemsCount: cartItems.reduce((acc, item) => (acc += item.quantity), 0),
});

const mapDispatchToProps = (dispatch) => ({
  removeItem: (id) => dispatch(removeItemById(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingCart);

