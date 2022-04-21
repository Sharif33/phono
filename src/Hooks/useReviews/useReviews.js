import { useEffect, useState } from 'react';

const useReviews = () => {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        try {
            async function callApi() {
                let data = await fetch(`https://peaceful-shore-84874.herokuapp.com/reviews`);
                data = await data.json();
                setReviews(data)
            }
            callApi();
        }
        catch (error) {
            console.log ('error',error)
          }
    }, []);
    return [reviews, setReviews];
};

export default useReviews;