// import {useState, useEffect} from 'react';
// import useAuth from '../useAuth/useAuth';


// const useUser = () => {
//     const {user} = useAuth();
//     const [users, setUsers] = useState([]);
//     const email = user?.email;
//     // console.log(email);
//     useEffect(() => {
//         fetch(`https://peaceful-shore-84874.herokuapp.com/users/${email}`)
//             .then((res) => res.json())
//             .then((data) => setUsers(data));
//     }, [email]);
//     return [users, setUsers];
// };

// export default useUser;
export const useUser = (email, setData, setIsLoading) => {
    setIsLoading(true)
    fetch(`https://peaceful-shore-84874.herokuapp.com/users/${email}`)
        .then(res => res.json())
        .then(data => {
            localStorage.setItem("userDetails", JSON.stringify(data));
            setData(data)
        })
        .finally(() => setIsLoading(false))

}