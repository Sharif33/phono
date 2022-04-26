/* eslint-disable eqeqeq */
import { CircularProgress } from '@mui/material';
import React, { useEffect, useState } from 'react';
// import Footer from '../../../Shared/Footer/Footer';
import Header from '../../../Shared/Header/Header';
import Mobile from './Mobile';

const ExploreMobiles = () => {
    const [categories, setCategories] = useState([]);
    const [mobiles, setMobiles] = useState([]);
   
    useEffect(() => {
         try {
        async function callApi() {
            let data = await fetch(`https://peaceful-shore-84874.herokuapp.com/phones`);
            data = await data.json();
            setMobiles(data);
            setCategories(data);
        }
        callApi();
    }
    catch (error) {
        console.log ('error',error);
      }
       /*  fetch(`https://peaceful-shore-84874.herokuapp.com/phones`)
            .then(res => res.json())
            .then(data => {
                setMobiles(data);
                setCategories(data);
                // console.log(data);
            }) */
    }, []);
   

    const filterResult = (mobileBrand) => {
        const result = mobiles.filter(currentData => {
            return currentData.brand === mobileBrand;
        });
        setCategories(result);
        // console.log(result)
    }

const handleSearch = e =>{
        const searchText = e.target.value;
        const matchedMobiles = mobiles.filter(mobile=>mobile.name.toLowerCase().includes(searchText.toLowerCase()));
        setCategories(matchedMobiles);
}

    return (
        <>
         <Header/>
            <div className='bg-light border border-bottom '> </div>
            <div className='bg-light'>
                <div className="container-fluid">
                   
                    <div className="text-center pt-2"> 
                        <h2 className="fw-bold text-primary p-2">Collections</h2>
                        <input placeholder='Enter a mobile name' className='custom-input w-50' type="text" onChange={handleSearch} />
                    </div>
                    <div className='sticky-position'>
                    <div className='text-center d-block'>
                        <button className='btn btn-custom fs-3 w-100 mx-2 mb-2'>Top Brands</button>
                        <button onClick={() => filterResult('Realme')} className='btn btn-custom-3 mx-2 w-100 mb-2'>Realme</button>
                        <button onClick={() => filterResult('Huawei')} className='btn btn-custom-3 mx-2 w-100 mb-2'>Huawei</button>
                        <button onClick={() => filterResult('Samsung')} className='btn btn-custom-3 mx-2 w-100 mb-2'>Samsung</button>
                        <button onClick={() => filterResult('Xiomi')} className='btn btn-custom-3 mx-2 w-100 mb-2'>Xiomi</button>
                        <button onClick={() => filterResult('Symphony')} className='btn btn-custom-3 mx-2 w-100 mb-2'>Symphony</button>
                        <button onClick={() => filterResult('Walton')} className='btn btn-custom-3 mx-2 w-100 mb-2'>Walton</button>
                        <button onClick={() => filterResult('Oppo')} className='btn btn-custom-3 mx-2 w-100 mb-2'>Oppo</button>
                        <button onClick={() => setCategories(mobiles)} className='btn btn-custom-3 mx-2 w-100 mb-2'>All</button>

                    </div>
                </div>

                       <div className='scroll-position'>
                           <div className="row row-cols-1 row-cols-md-2 m-2 g-4">
                            {
                            categories.length == 0 ?
                            <div className="w-100 text-center">
                                <CircularProgress />
                            </div>
                            :
                            categories.map(mobile => <Mobile
                                key={mobile._id}
                                mobile={mobile}
                            />)
                        }
                           </div>
                       
                       </div>
                    
                </div>
            </div>
            {/* <Footer/> */}
        </>
    );
};

export default ExploreMobiles;