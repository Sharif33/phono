/* eslint-disable eqeqeq */
// import { CircularProgress } from '@mui/material';
import React, { useEffect, useState } from 'react';
// import Footer from '../../../Shared/Footer/Footer';
import Header from '../../../Shared/Header/Header';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Mobile from './Mobile';
import {Helmet} from "react-helmet";
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import Footer from '../../../Shared/Footer/Footer';

const ExploreMobiles = () => {
    const [categories, setCategories] = useState([]);
    const [mobiles, setMobiles] = useState([]);
    const [priceH, setPriceH]=useState([]);
    
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

    const [sorting, setSorting] = React.useState('');

    const handleSorting = (event) => {
      setSorting(event.target.value);
    };
 
    // sorting high to low price
    const sortHigh =()=>{
        const highPrice = categories?.sort((a,b)=>a.price < b.price ? 1 : -1);
        return highPrice;
    } 
    const handleHighPrice = ()=>{
        const hPrice = sortHigh();
       
        // console.log(hPrice);
        setPriceH(hPrice?.map((mobile) =>{
            return <Mobile
            key={mobile._id}
            mobile={mobile}
        />
        } ))
    }

    // sorting low to high price
    const sortLow =()=>{
        const lowPrice = categories?.sort((a,b)=>a.price > b.price ? 1 : -1);
        return lowPrice;
    } 
    const handleLowPrice = ()=>{
        const lPrice = sortLow();
       
        // console.log(hPrice);
        setPriceH(lPrice?.map((mobile) =>{
            return <Mobile
            key={mobile._id}
            mobile={mobile}
        />
        } ))
    }
    // sorting by Name
    const sortName =()=>{
        const nameSort = categories?.sort((a,b)=>a.name > b.name ? 1 : -1);
        return nameSort;
    } 
    const handleNameSort = ()=>{
        const sortNm = sortName();
       
        // console.log(sortNm);
        setPriceH(sortNm?.map((mobile) =>{
            return <Mobile
            key={mobile._id}
            mobile={mobile}
        />
        } ))
    }

 // sorting by Name
 const sortBrand =()=>{
    const brandSort = categories?.sort((a,b)=>a.brand > b.brand ? 1 : -1);
    return brandSort;
} 
const handleBrandSort = ()=>{
    const sortB = sortBrand();
   
    // console.log(sortNm);
    setPriceH(sortB?.map((mobile) =>{
        return <Mobile
        key={mobile._id}
        mobile={mobile}
    />
    } ))
}

    return (
        <>
          <Helmet>
                <meta charSet="utf-8" />
                <title>Phono | Shop : All collections</title>
                <link rel="canonical" href="/mobiles" />
            </Helmet>
         <Header/>
            <div>
                <div className="container">
                    <div style={{position:"fixed", top: 50 ,right:5, zIndex:1, overflowX:"hidden"}} className="d-flex justify-content-evenly align-items-center mx-auto">
                        <Box centered sx={{ maxWidth: { xs: 320, sm: 500, md: 800,lg: 1100, xl: 1400 }, bgcolor: 'background.paper', px: {xs:0, sm:0 ,md: 15},pt: 3}}>
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
                    <Box sx={{ minWidth: 120,bgcolor: 'background.paper',pt:3, overflow:"hidden" }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Sort by</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={sorting}
          label="Sort By"
          onChange={handleSorting}
        >
          <MenuItem  onClick={handleHighPrice} value={0}>High to low Price</MenuItem>
          <MenuItem  onClick={handleLowPrice} value={1}><span className="text-danger">Low to high Price</span></MenuItem>
          <MenuItem onClick={handleBrandSort} value={2}>Sorted brand name</MenuItem>
          <MenuItem onClick={handleNameSort} value={3}>Sorted name ({priceH?.length})</MenuItem>
        </Select>
      </FormControl>
    </Box>
                    </div>
                    
                    
                    
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
                    <div style={{marginTop:"9rem"}} className="row row-cols-1 row-cols-md-4 g-4">
                                                
                                               
                                                {
                                                    categories.length !== 0 &&  categories?.map(mobile => <Mobile
                                                    key={mobile._id}
                                                    mobile={mobile}
                                                />)
                                                }
                                               {
                                                   categories.length === 0 && <h5>Not Available.</h5>
                                               }
                                            
                                            </div>
                </div>
            </div>
            <Footer/>
        </>
    );
};

export default ExploreMobiles;