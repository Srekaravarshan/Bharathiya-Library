import React, { useEffect, useState } from "react";
import "./Cart.css";
import Heading from "../../components/typography/Heading";
import { useStateValue } from "../../StateProvider";
import Heading2 from "../../components/typography/Heading2";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";
import Caption from "../../components/typography/Caption";
import Loading from "../loading/Loading";
import CartBook from "../../components/widgets/CartBook";

function Cart() {
  const [{ cart }, dispatch] = useStateValue();
  const [orderedBooks, setBooks] = useState({});
  const [totalCost, setTotalCost] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getBooks = async () => {
      const books = {};
      var totalPrice = 0;
      for (let [bookId, count] of cart) {
        const book = await getDoc(doc(db, `/books/${bookId}`));
        totalPrice += Number(book.data().price);
        books[bookId] = { book: book.data(), count: count };
      }
      setTotalCost(totalPrice);
      setBooks(books);
      setLoading(false);
    };
    getBooks();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="cart page">
      <div className="cart__page">
        <Heading className="cart__heading mb-2">Cart</Heading>
        {/* {orderedBooks.forEach((value))} */}
        {Object.entries(orderedBooks).map(([bookId, value]) => {
          return (
            <CartBook
              key={bookId}
              value={value}
              decrementCost={(cost) => {setTotalCost(totalCost - cost); console.log(totalCost)}}
              incrementCost={(cost) => {setTotalCost(totalCost + cost); console.log(totalCost)}}
              deleteBook={() => {
                setTotalCost(totalCost - orderedBooks[bookId].book.price)
                const updatedOrderedBooks = { ...orderedBooks };
                delete updatedOrderedBooks[bookId];
                console.log(updatedOrderedBooks);
                setBooks(updatedOrderedBooks);
              }}
            />
          );
        })}
        {totalCost > 0 ? (
          <button type="button" className="button cart__checkout--btn">
            Checkout ₹{totalCost}
          </button>
        ) : (
          <Caption>Your Cart is empty</Caption>
        )}
      </div>
    </div>
  );
}

export default Cart;
