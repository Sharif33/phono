import { useState, useEffect } from 'react';
import { getStoredCart } from '../../utilities/fakedb';


const useCart = () => {
    const [addCart, setAddCart] = useState([]);

    useEffect(() => {
        const savedCart = getStoredCart();
        const keys = Object.keys(savedCart);
        fetch('https://peaceful-shore-84874.herokuapp.com/phones/byKeys', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(keys)
        })
            .then(res => res.json())
            .then(products => {
                if (products.length) {
                    const storedCart = [];
                    for (const key in savedCart) {
                        const addedProduct = products.find(product => product.key === key);
                        if (addedProduct) {
                            // set quantity
                            const quantity = savedCart[key];
                            addedProduct.quantity = quantity;
                            storedCart.push(addedProduct);
                        }
                    }
                    setAddCart(storedCart);
                }
            })


    }, []);

    return [addCart, setAddCart];
}

export default useCart;