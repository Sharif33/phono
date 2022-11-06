import { useEffect, useState } from 'react';

const useReviews = () => {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        let isMounted = true;
        if(isMounted ){
         try {
            async function callApi() {
                let data = await fetch(`https://phono-server-production.up.railway.app/reviews`);
                data = await data.json();
                setReviews(data)
            }
            callApi();
        }
        catch (error) {
            console.log ('error',error)
          }   
        }
        return () => {
            isMounted = false;
            };
        
    }, []);
    return [reviews, setReviews];
};

export default useReviews;