import React from 'react'
import Heading2 from '../typography/Heading2'
import { ReactComponent as AddIcon } from "./../../assets/icons/add-fill.svg";
import { ReactComponent as SubIcon } from "./../../assets/icons/subtract-fill.svg";
import { ReactComponent as DeleteIcon } from "./../../assets/icons/delete-bin-7-line.svg";
import Caption from '../typography/Caption';
import { useState } from 'react';

function CartBook({ value, deleteBook, decrementCost, incrementCost }) {

    const [count, setCount] = useState(value.count);

    var increaseBookQuantity = (value) => {
        value.count += 1;
        setCount(value.count);
        incrementCost(parseInt(value.book.price))
    }

    var decreaseBookQuantity = (value) => {
        if (value.count == 1) deleteBook()
        else {
            value.count -= 1;
            setCount(value.count);
            console.log(parseInt(value.book.price));
            decrementCost(parseInt(value.book.price))
        }
    }
    return (
        <div className="cart__book">
            <div className="cart__book--left">
                <img src={value.book.cover_url} alt="" className="cart__book--cover" />
                <div className="cart__book--right">
                    <div className="cart__book--top">
                        <Heading2 className="cart__book--title">{value.book.title}</Heading2>
                        <Caption>{value.book.author}</Caption>
                    </div>
                    <div className="cart__book--bottom">
                        <Caption className="cart__book--count mb-1">Quantity: {value.count}</Caption>
                        <Heading2 className="cart__book--price">Price: ₹{value.book.price} x {value.count} = {value.count*value.book.price}</Heading2>
                    </div>
                </div>
            </div>
            <div className="cart__book--actions">
                <button onClick={() => decreaseBookQuantity(value)} className="cart__actions--button button">{value.count == 1 ? (<DeleteIcon className='cart__actions--icon'/>): (<SubIcon className='cart__actions--icon'/>)}</button>
                <p className="cart__actions--count">{count}</p>
                <button onClick={() => increaseBookQuantity(value)} className="cart__actions--button button"><AddIcon className="cart__actions--icon" /></button>
            </div>
        </div>
    )
}

export default CartBook