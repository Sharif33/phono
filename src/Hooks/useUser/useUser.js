import {useState, useEffect} from 'react';
import useAuth from '../useAuth/useAuth';

/* 
const useUser = () => {
    const {user} = useAuth();
    const [users, setUsers] = useState([]);
    

    useEffect(() => {
        
        fetch(`https://peaceful-shore-84874.herokuapp.com/users/${user?.email}`)
            .then((res) => res.json())
            .then((data) => setUsers([data]));
    }, [user?.email]);
    return [users, setUsers];
};

export default useUser;
 */

const useUser = () => {
    const {user} = useAuth();
    const [users, setUsers] = useState([]);

    useEffect(() => {
        try {
            async function callApi() {
                let data = await fetch(`https://peaceful-shore-84874.herokuapp.com/usersEmail/${user?.email}`);
                data = await data.json();
                setUsers([data])
            }
            callApi();
        }
        catch (error) {
            console.log ('error',error)
          }
    }, [user.email]);
    return [users, setUsers];
};

export default useUser;


/* export const useUser = (email, setData, setIsLoading) => {
    setIsLoading(true)
    fetch(`https://peaceful-shore-84874.herokuapp.com/users/${email}`)
        .then(res => res.json())
        .then(data => {
            localStorage.setItem("userDetails", JSON.stringify(data));
            setData(data)
        })
        .finally(() => setIsLoading(false))

} */