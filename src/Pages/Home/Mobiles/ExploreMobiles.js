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
import { CircularProgress, MenuItem, } from '@mui/material';
import Footer from '../../../Shared/Footer/Footer';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import axios from 'axios';
import CartModal from '../Cart/CartModal';

const ExploreMobiles = () => {
    const [categories, setCategories] = useState([]);
    const [mobiles, setMobiles] = useState([]);
    const [priceH, setPriceH]=useState([]);
    const [spinner, setSpinner] = React.useState(true);

    const brands = ['Nokia','Samsung','Xiomi','Infinix','Realme','Vivo','Huawei','OnePlus','iPhone','Motorola','Oppo','Walton','Tecno','Symphony','Lenevo','Asus','Google'];

    React.useEffect(() => {
      setTimeout(() => setSpinner(false), 1500)
    }, []);
    
    const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

   
    useEffect(() => {
       axios.get(`https://phono-server-production.up.railway.app/mobiles`).then((response)=>{
        setMobiles(response.data);
        setCategories(response.data);
       });
       /*  fetch(`https://phono-server-production.up.railway.app/phones`)
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
            <>
                <Box sx={{background:"rgba(255, 255, 255, 0.7)",backdropFilter: "blur(20px)",position:"fixed", top: 50 ,right:0, zIndex:1, overflowX:"hidden"}}>
                <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={0}>
        <Grid item xs={12} md={10}>
            <Box centered sx={{ maxWidth: { xs: "100vw", sm:"100vw" },  px: {xs:0, sm:0 ,md: 15},pt: 3}}>
                                <Tabs
                                    value={value}
                                    onChange={handleChange}
                                    variant="scrollable"
                                    scrollButtons
                                    allowScrollButtonsMobile
                                    aria-label="scrollable force tabs example"
                                >
                                    <Tab onClick={() => setCategories(mobiles)} label="All" />
                                    {
                                        brands.map(brand=>
                                            <Tab onClick={() => filterResult(brand)} key={brand} label={brand} />
                                            )
                                    }
                                    
                                    <Tab onClick={() => setCategories(mobiles)} label="All" />
                                </Tabs>
                                </Box>
        </Grid>
        <Grid item xs={12} md={2}>
                <Box component="form" sx={{pt:2,textAlign:'center',  overflow:"hidden" ,'& .MuiTextField-root': { m: 1, minWidth: {xs:'70vw', sm:'70vw',md:'13vw'} }}}>
                        <TextField
                        id="filled-select-currency"
                        select
                        label='Sort By'
                        defaultValue="status"
                        value={sorting}
                        size="small"
                        onChange={handleSorting}
                        //   helperText={value? `${searchOrder?.length} order`:`Please select order status`}
                        variant='outlined'
                        >
                            <MenuItem onClick={handleHighPrice} value={0}>High to low Price</MenuItem>
                            <MenuItem onClick={handleLowPrice} value={1}>Low to high Price</MenuItem>
                            <MenuItem onClick={handleBrandSort} value={2}>Sort by brand</MenuItem>
                            <MenuItem onClick={handleNameSort} value={3}> {priceH && "Sort by name"}</MenuItem>
                        </TextField>       
                                    </Box>
        </Grid>
      </Grid>
    </Box>  
                </Box>

                <Box sx={{mt:{md:"9rem", xs:'13rem'}}} className="container">
                    <CartModal/>
                <div className="row row-cols-1 row-cols-md-4 g-4">                                 
                                               
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
                </Box>
                    
            </>
         }
           
            <Footer/>
        </>
    );
};

export default ExploreMobiles;