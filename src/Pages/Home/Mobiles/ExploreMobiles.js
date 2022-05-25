/* eslint-disable eqeqeq */
import { CircularProgress } from '@mui/material';
import React, { useEffect, useState } from 'react';
// import Footer from '../../../Shared/Footer/Footer';
import Header from '../../../Shared/Header/Header';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Mobile from './Mobile';

const ExploreMobiles = () => {
    const [categories, setCategories] = useState([]);
    const [mobiles, setMobiles] = useState([]);
    
    const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

   
    useEffect(() => {
         try {
        async function callApi() {
            let data = await fetch(`https://peaceful-shore-84874.herokuapp.com/mobiles`);
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

/* const handleSearch = e =>{
        const searchText = e.target.value;
        const matchedMobiles = mobiles.filter(mobile=>mobile.name.toLowerCase().includes(searchText.toLowerCase()));
        setCategories(matchedMobiles);
} */

    return (
        <>
         <Header/>
            <div>
                <div className="container">
                  {/*  
                    <div className="text-center pt-2"> 
                        <h2 className="fw-bold text-primary p-2">Collections</h2>
                        <input placeholder='Enter a mobile name' className='custom-input w-50' type="text" onChange={handleSearch} />
                    </div> */}
                    <Box sx={{ maxWidth: { xs: 320, sm: 600, md: 900,lg: 1200, xl: 1536 }, bgcolor: 'background.paper', py: 2 }}>
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        variant="scrollable"
                        scrollButtons
                        allowScrollButtonsMobile
                        aria-label="scrollable force tabs example"
                    >
                        <Tab onClick={() => setCategories(mobiles)} label="All" />
                        <Tab onClick={() => filterResult('Nokia')} label="Nokia" />
                        <Tab onClick={() => filterResult('Realme')} label="Realme" />
                        <Tab onClick={() => filterResult('Vivo')} label="Vivo" />
                        <Tab onClick={() => filterResult('Huawei')} label="Huawei" />
                        <Tab onClick={() => filterResult('Samsung')} label="Samsung" />
                        <Tab onClick={() => filterResult('OnePlus')} label="OnePlus" />
                        <Tab onClick={() => filterResult('iPhone')} label="iPhone" />
                        <Tab onClick={() => filterResult('Xiomi')} label="Xiomi" />
                        <Tab onClick={() => filterResult('Infinix')} label="Infinix" />
                        <Tab onClick={() => filterResult('Motorola')} label="Motorola" />
                        <Tab onClick={() => filterResult('Oppo')} label="Oppo" />
                        <Tab onClick={() => filterResult('Walton')} label="Walton" />
                        <Tab onClick={() => filterResult('Tecno')} label="Tecno" />
                        <Tab onClick={() => filterResult('Symphony')} label="Symphony" />
                        <Tab onClick={() => filterResult('Lenevo')} label="Lenevo" />
                        <Tab onClick={() => filterResult('Asus')} label="Asus" />
                        <Tab onClick={() => filterResult('Google')} label="Google" />
                        <Tab onClick={() => setCategories(mobiles)} label="All" />
                    </Tabs>
                    </Box>
                   {/*  <div className='sticky-position'>
                    <div className='text-center d-block'>
                        <button className='btn btn-custom fs-3 w-100 mx-2 mb-2'>Top Brands</button>
                        <button onClick={() => filterResult('Realme')} className='btn btn-custom-3 mx-2 w-100 mb-2'>Realme</button>
                        <button onClick={() => filterResult('Vivo')} className='btn btn-custom-3 mx-2 w-100 mb-2'>Vivo</button>
                        <button onClick={() => filterResult('Huawei')} className='btn btn-custom-3 mx-2 w-100 mb-2'>Huawei</button>
                        <button onClick={() => filterResult('Samsung')} className='btn btn-custom-3 mx-2 w-100 mb-2'>Samsung</button>
                        <button onClick={() => filterResult('Xiomi')} className='btn btn-custom-3 mx-2 w-100 mb-2'>Xiomi</button>
                        <button onClick={() => filterResult('Infinix')} className='btn btn-custom-3 mx-2 w-100 mb-2'>Infinix</button>
                        <button onClick={() => filterResult('Motorola')} className='btn btn-custom-3 mx-2 w-100 mb-2'>Motorola</button>
                        <button onClick={() => filterResult('Oppo')} className='btn btn-custom-3 mx-2 w-100 mb-2'>Oppo</button>
                        <button onClick={() => setCategories(mobiles)} className='btn btn-custom-3 mx-2 w-100 mb-2'>All</button>

                    </div>
                </div> */}
                    <div className="row row-cols-1 row-cols-md-4 m-2 g-4">
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
                       {/* <div className='scroll-position'>
                       </div> */}
                    
                </div>
            </div>
            {/* <Footer/> */}
        </>
    );
};

export default ExploreMobiles;