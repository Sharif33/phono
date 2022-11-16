/* import axios from 'axios';
import { useState, useEffect } from 'react'; */
import useAuth from '../useAuth/useAuth';
import { useQuery } from 'react-query';

/* 
const useUser = () => {
    const {user} = useAuth();
    const [users, setUsers] = useState([]);
    

    useEffect(() => {
        
        fetch(`https://phono-server-production.up.railway.app/users/${user?.email}`)
            .then((res) => res.json())
            .then((data) => setUsers([data]));
    }, [user?.email]);
    return [users, setUsers];
};

export default useUser;
 */

const useUser = () => {
    const { user } = useAuth();
    // const [defaultAdrs, setdefaultAdrs] = useState('');
    // console.log('udtdd:',defaultAdrs);

    /*   const defaultAdrs = users?.find((ue)=>{
          return ue.email === user.email;
      }) */
    // console.log(defaultAdrs);

    const { isLoading, error, data: defaultAdrs } = useQuery('userData', () =>
     fetch(`https://phono-server-production.up.railway.app/usersEmail/${user.email}`).then(res =>
       res.json()
     )    
   )
//   setdefaultAdrs(data);
// console.log(defaultAdrs);
   if (isLoading) return 'Loading...'
 
   if (error) return 'An error has occurred: ' + error.message
    

  /*   useEffect(() => {
        axios.get(`https://phono-server-production.up.railway.app/usersEmail/${user.email}`).then((response) => {
            setdefaultAdrs(response.data);
        });
    }, [user.email]); */

    /*   useEffect(() => {
          try {
              async function callApi() {
                  let data = await fetch(`https://phono-server-production.up.railway.app/usersEmail/${user.email}`);
                  data = await data.json();
                  setUsers([data])
              }
              callApi();
          }
          catch (error) {
              // console.log ('error',error)
            }
      }, [user.email]); */
    return defaultAdrs;
};

export default useUser;


/* export const useUser = (email, setData, setIsLoading) => {
    setIsLoading(true)
    fetch(`https://phono-server-production.up.railway.app/users/${email}`)
        .then(res => res.json())
        .then(data => {
            localStorage.setItem("userDetails", JSON.stringify(data));
            setData(data)
        })
        .finally(() => setIsLoading(false))

} */