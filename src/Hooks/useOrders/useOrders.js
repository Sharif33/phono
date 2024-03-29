import axios from 'axios';
import {useState, useEffect} from 'react';
import useAuth from '../useAuth/useAuth';

const useOrders = () => {
    const {user} = useAuth();
    const [orders, setOrders] = useState([]);
    const email = user?.email;

    useEffect(() => {
        axios.get(`https://phono-server-production.up.railway.app/myOrders/${email}`).then((response) => {
          setOrders(response.data);
        });
      }, [email]);

    /* useEffect(() => {
        let isMounted = true;
            fetch(`https://phono-server-production.up.railway.app/myOrders/${email}`)
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
        
    }, [email]); */
    return [orders, setOrders];
};

export default useOrders;