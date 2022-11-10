// import React, {useContext} from 'react';
import React, {useEffect} from 'react';
import { Box, Button, ButtonGroup, Divider, Grid, IconButton, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { decrement, getTotal, increment, removeFromCart } from '../../../Redux/slices/cartSlice';
import { addToFvrt, removeFromFvrt } from '../../../Redux/slices/fvrtSlice';
// import { Favourite } from '../../../Contexts/AuthProvider/FavContext';
import Header from '../../../Shared/Header/Header';
// import Mobile from './Mobile';
import { Link } from 'react-router-dom';
import Footer from '../../../Shared/Footer/Footer';
import { numberFormat } from '../../../Shared/numberFormat';
import {Helmet} from "react-helmet";
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { RiDeleteBin6Fill,RiShoppingBag3Fill } from "react-icons/ri";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import RemoveOutlinedIcon from '@mui/icons-material/RemoveOutlined';

const Cart = () => {  
    // const {cart} = useContext(Favourite);
    const dispatch = useDispatch();
    const {addToCart, cartTotal, cartTotalQuantity, shipping, tax, delivery} = useSelector((state) => state.cart);

    // console.log(addToCart);
    
    useEffect(() => {
        dispatch(getTotal());
      }, [addToCart, dispatch]);

      const toFvrt = useSelector((state) => state.fvrt);

    return (
        <>
        <div style={{backgroundColor:"#EEF2FF"}}>
           <Helmet>
                <meta charSet="utf-8" />
                <title>Phono | Cart</title>
                <link rel="canonical" href="/cart" />
            </Helmet>
           <Header/>
           {
               addToCart.length ? <div  style={{minHeight:"100vh"}} className="container-lg py-4">
                   <div className='text-center my-4'>
                       <h1> <RiShoppingBag3Fill style={{color:"#183153"}}/> <span className='text-secondary fw-bold'> {addToCart?.length}</span> item(s)</h1>
                       <h1> <span style={{color:"#183153"}} className="fw-bold">Tk</span> <span className='text-secondary'> {numberFormat(cartTotal+shipping+tax).slice(3)}</span></h1>
                   </div>
        <Box sx={{ flexGrow: 1,}}>
            <Grid container spacing={2}>
                <Grid item xs={12} md={8}>
                <Typography variant='body2'>
                        Estimated Delivery: <span className="text-navi fw-bold">{delivery}</span>      
                </Typography>
                    
                    <TableContainer>
            
            <Table>
                <TableBody>
                    {
                    addToCart.map((mobile) => (
                        <TableRow 
                            key={mobile?._id}
                            sx={{ border: 0 } }
                        >
                            <TableCell sx={{py:0, textAlign:'center'}} >
                                {
                                    mobile?.os ? 
                                    <Link title='See Details' to={`/mobile/${mobile._id}`}> <img style={{width:"2rem"}} src={mobile.image} alt="" />
                                    {/* <span className="m-1 text-navi">
                                        &#x9F3;{numberFormat(mobile.price).slice(3,-3)}
                                        <small className='text-secondary'>/1</small>	
                                    </span> */}
                                    </Link>
                                    :
                                    <Link title='See Details' to={`/mobile2/${mobile._id}`}> <img style={{width:"2.5rem"}} src={mobile.image} alt="" />
                                    {/*  <span className="m-1 text-navi">
                                        &#x9F3;{numberFormat(mobile.price).slice(3,-3)}
                                        <small className='text-secondary'>/1</small>	
                                    </span> */}
                                    </Link>
                                }
                            
                            </TableCell>

                            <TableCell  align="left">
                                {mobile?.name}
                            <br />
                                <Typography variant='caption' className='text-secondary'>
                                    &#x9F3;{numberFormat(mobile.price).slice(3,-3)}
                                </Typography>                                   
                            </TableCell>
                            <TableCell  align="center">
            <Box sx={{display: 'flex',flexDirection: 'column', alignItems: 'center','& > *': { m: 1,}, }}>
                <ButtonGroup className='bg-cart' color="secondary" size="small" variant="text" aria-label="outlined button group">

                    <Button onClick={() => dispatch(decrement(mobile))}><RemoveOutlinedIcon style={{color:"#183153", fontSize:'1.2em'}}/></Button>

                    <Button className='bg-light'>{mobile?.cartQuantity}</Button>

                    <Button onClick={() => dispatch(increment(mobile))}><AddOutlinedIcon style={{color:"#183153", fontSize:'1.25em'}}/></Button>

                </ButtonGroup>
            </Box>
                            {/* <div className="m-auto">
                                        <div className="d-flex justify-content-between align-items-center border">
                                                <button className='btn btn-cart rounded-0' onClick={() => dispatch(decrement(mobile))}> - </button>
                                                <span className='mw-qty'>{mobile?.cartQuantity}</span>
                                                <button className='btn btn-cart rounded-0' onClick={() => dispatch(increment(mobile))}> + </button>
                                        </div>
                                </div> */}
                                <div className='mt-1'>
                                    <span className='text-navi fw-bold'>
                                        &#x9F3;{numberFormat(mobile.price * mobile.cartQuantity).slice(3,-3)}
                                    </span>
                                    <span><small className='text-secondary'>/{mobile?.cartQuantity}</small></span> 
                                </div>
                            </TableCell>
                            <TableCell  align="center">
                            <div className='d-flex justify-content-evenly'>
                                {
                                    toFvrt?.addToFvrt.find((ft)=> ft?._id === mobile._id ) ? 
                                    <IconButton 
                                    onClick={() => dispatch(removeFromFvrt(mobile))} 
                                    >
                                        <FavoriteIcon sx={{color:"#183153"}}/>
                                    </IconButton>
                                    : 
                                    <IconButton 
                                    onClick={() => dispatch(addToFvrt(mobile))} 
                                    >
                                        <FavoriteBorderIcon sx={{color:"#183153"}}/>
                                    </IconButton>
                                }

                            <IconButton 
                            onClick={() => dispatch(removeFromCart(mobile))} 
                            color='error'
                            >
                                <RiDeleteBin6Fill />
                            </IconButton>
        </div>
                            </TableCell>
                            {/*  <TableCell sx={{border: '0px'}} align="center">{numberFormat(mobile.price).slice(3,-3)}	&#x9F3;</TableCell>
                            <TableCell sx={{border: '0px'}} align="center">{numberFormat(mobile.price * mobile.cartQuantity).slice(3,-3)}	&#x9F3;</TableCell> */}
                            
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
                </Grid>
                <Grid item xs={12} md={4}>    
                    <List sx={{ bgcolor: 'background.paper' }}>
                        <Typography sx={{textAlign:'center', py:1}} variant='h5'>
                            Cart Summary
                        </Typography>
                        <ListItem secondaryAction={addToCart?.length}>
                            <ListItemText primary='Total Items'/>   
                        </ListItem>

                        <ListItem secondaryAction={cartTotalQuantity}>
                            <ListItemText primary='Items Quantity'/>   
                        </ListItem>
                        
                        <ListItem secondaryAction={
                            <span>
                                {numberFormat(cartTotal).slice(3,-3)}&#x9F3;
                            </span>       
                        }>
                            <ListItemText primary='Subtotal'/>   
                        </ListItem>

                        <ListItem secondaryAction={
                            <span>
                                {numberFormat(tax).slice(3)}&#x9F3;
                            </span>       
                        }>
                            <ListItemText primary='Tax'/>   
                        </ListItem>

                        <ListItem secondaryAction={
                            <span>
                                {shipping}&#x9F3;
                            </span>       
                        }>
                            <ListItemText primary='Shipping'/>   
                        </ListItem>
                        <Divider/>
                        <ListItem secondaryAction={
                            <span>
                                {numberFormat(cartTotal + shipping + tax).slice(3)}&#x9F3;
                            </span>       
                        }>
                            <ListItemText primary='Total'/>   
                        </ListItem>

                        <Typography sx={{px:1, color:'indigo'}}  variant='caption'>
                            *Billing info & voucher in next page.
                        </Typography>
                            
                        <Link to={`/placeOrder`}>
                            <Button fullWidth sx={{borderRadius:0}} color="secondary" size="large"  variant="contained">PROCEED TO CHECKOUT</Button>
                        </Link>
                    </List>
                </Grid>
            </Grid>
        </Box>
        </div>
        : 
        <div style={{minHeight:"100vh"}} className='text-center pt-5'>
            {/* <img src={emptyBag} alt="" className="img-fluid p-3" /> <br /> <br /> */}
            <div className="d-flex justify-content-center p-3">
             <lottie-player src="https://assets8.lottiefiles.com/packages/lf20_3VDN1k.json"  background="transparent"  speed="4"  style={{width:"20rem"}}  loop  autoplay></lottie-player>   
            </div>
            
            <h4>Your shopping bag is empty, Please add some products before you checkout.</h4> <br />
            <Link to={`/mobiles`}><button className="btn btn-lg btn-pink">Start shopping now</button></Link>
            
        </div>
           }
                
               
           {/* <div className="row row-cols-1 row-cols-md-2 m-2 g-4">
           {
               addToCart?.map((mobile)=>(
                  <Mobile
                  mobile={mobile}
                  key={mobile.id}
                  /> 
               ))
           }
           </div> */}
           {/* <div style={{paddingTop:"70px"}}>
               <h1>{cart.length}</h1>
           </div>
           {
               cart.map((mobile)=>(
                  <Mobile
                  mobile={mobile}
                  key={mobile.id}
                  /> 
               ))
           } */}
           <Footer/>
       </div>
        </>
       
         
    );
};

export default Cart;