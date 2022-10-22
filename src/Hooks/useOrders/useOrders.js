import {useState, useEffect} from 'react';
import useAuth from '../useAuth/useAuth';

const useOrders = () => {
    const {user} = useAuth();
    const [orders, setOrders] = useState([]);
    
    const email = user?.email;
    useEffect(() => {
        let isMounted = true;
            fetch(`https://peaceful-shore-84874.herokuapp.com/myOrders/${email}`)
            .then((res) => res.json())
            .then((data) =>{
                if(isMounted ){
                setOrders(data)
                // console.log(data);
            }
            });
        return () => {
            isMounted = false;
            };
        
    }, [email]);
    return [orders, setOrders];
};

export default useOrders;