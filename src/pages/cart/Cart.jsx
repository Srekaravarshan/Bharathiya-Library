import React, { useEffect, useState } from "react";
import "./Cart.css";
import Heading from "../../components/typography/Heading";
import { useStateValue } from "../../StateProvider";
import Heading2 from "../../components/typography/Heading2";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";
import LoadingWidget from "../../components/widgets/LoadingWidget";
import Caption from "../../components/typography/Caption";

function Cart() {
  const [{ cart }, dispatch] = useStateValue();
  const [orderedBooks, setBooks] = useState({});
  const [totalCost, setTotalCost] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getBooks = async () => {
      const books = {};
      var totalPrice = 0;
      console.log(cart);
      for (let [bookId, count] of cart) {
          const book = await getDoc(doc(db, `/books/${bookId}`));
          totalPrice += book.data().price;
          books[bookId] = { book: book.data(), count: count };
      }
      setTotalCost(totalPrice);
      setBooks(books);
      setLoading(false);
      console.log("orderedBooks");
      console.log(orderedBooks);
    };
    getBooks();
  }, [loading,]);

  if (loading) {
    return <LoadingWidget />;
  }

  return (
    <div className="cart page">
      <div className="cart__page">
        <Heading className="cart__heading mb-2">Cart</Heading>
        {/* {orderedBooks.forEach((value))} */}
        {Object.entries(orderedBooks).map(([bookId, value]) => (
          <div className="cart__book">
            <img src={value.book.cover_url} alt="" className="cart__book--cover" />
            <div className="cart__book--right">
            <div className="cart__book--top">
                
              <Heading2 className="cart__book--title">{value.book.title}</Heading2>
              <Caption>{value.book.author}</Caption>
            </div>
              <div className="cart__book--bottom">
              <Caption className="cart__book--count mb-1">Quantity: {value.count}</Caption>
              <Heading2 className="cart__book--price">Price: ₹{value.book.price}</Heading2>
              </div>
            </div>
          </div>
        ))}
        {
          orderedBooks.length > 0 ? (
        <button className="button cart__checkout--btn">
          Checkout ₹{totalCost}
        </button>

          ) : <Caption>Your Cart is empty</Caption>
        }
      </div>
    </div>
  );
}

export default Cart;
