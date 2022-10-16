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
import { CircularProgress, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import Footer from '../../../Shared/Footer/Footer';

const ExploreMobiles = () => {
    const [categories, setCategories] = useState([]);
    const [mobiles, setMobiles] = useState([]);
    const [priceH, setPriceH]=useState([]);
    const [spinner, setSpinner] = React.useState(true);

    React.useEffect(() => {
      setTimeout(() => setSpinner(false), 1500)
    }, []);
    
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

 // sorting by Brand
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
         {
            spinner ? <div className='text-center pt-5 my-5'><CircularProgress/></div> 
            :
            <div>
                <div style={{position:"fixed", top: 50 ,right:0, zIndex:1, overflowX:"hidden"}}>
                    <div className="d-flex justify-content-center align-items-center mx-auto px-3 bg-light">
                    <Box centered sx={{ maxWidth: { xs: 270, sm: 500, md: 800,lg: 1100, xl: 1400 },bgcolor: 'background.paper',  px: {xs:0, sm:0 ,md: 15},pt: 3}}>
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
                <Box sx={{ minWidth: 120,pt:3,bgcolor: 'background.paper', overflow:"hidden" }}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Sort by</InputLabel>
                            <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={sorting}
                            label="Sort By"
                            onChange={handleSorting}
                            >
                            <MenuItem onClick={handleHighPrice} value={0}>High to low Price</MenuItem>
                            <MenuItem onClick={handleLowPrice} value={1}>Low to high Price</MenuItem>
                            <MenuItem onClick={handleBrandSort} value={2}>Sort by brand name</MenuItem>
                            <MenuItem onClick={handleNameSort} value={3}>Sort by name ({priceH?.length})</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>  
                    </div>   
                </div>

                <div className="container">
                <div style={{marginTop:"9rem"}} className="row row-cols-1 row-cols-md-4 g-4">                                 
                                               
                                                {
                                                    categories?.map(mobile => <Mobile
                                                    key={mobile._id}
                                                    mobile={mobile}
                                                />) 
                                                }
                                                {
                                                 categories?.length ===0 && <p>No result found. Will be added soon.</p>  
                                                }
                                             
                    </div>
                </div>
                    
            </div>
         }
           
            <Footer/>
        </>
    );
};

export default ExploreMobiles;