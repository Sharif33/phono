import React,{useState, useEffect} from 'react';
import {AiOutlineStar,AiFillProject } from "react-icons/ai";
import Rating from '@mui/material/Rating';
// import useReviews from '../../Hooks/useReviews/useReviews';
import usePhones from '../../Hooks/usePhones/usePhones';
import useAuth from '../../Hooks/useAuth/useAuth';
import UserDashboard from './UserDashboard';
import { FiCheck, FiRefreshCcw, FiShoppingCart, FiTruck } from "react-icons/fi";
import CreditScoreIcon from '@mui/icons-material/CreditScore';
import {CalendarViewMonth} from '@mui/icons-material';
import PaymentIcon from '@mui/icons-material/Payment';
import AnalyticsIcon from '@mui/icons-material/Analytics';
// import useOrders from '../../Hooks/useOrders/useOrders';
// import useAuth from '../../Hooks/useAuth/useAuth';
// import about from "../../images/about.jpg";

const DashboardHome = () => {
    const {admin}= useAuth();

// Phone Collection Section
    const [mobiles] = usePhones();
    const [offers,setOffers] = useState([]);
   
    useEffect(() => {
        fetch(`https://peaceful-shore-84874.herokuapp.com/phones`)
            .then(res => res.json())
            .then(data => setOffers(data))
    }, []);

     const [cReview,setCreview] = useState([]);
    useEffect(() => {
        fetch(`https://peaceful-shore-84874.herokuapp.com/cReviews`)
            .then(res => res.json())
            .then(data => setCreview(data))
    }, []);
    // const [orders] = useOrders();

    const [orders, setOrders] = useState([]);
    // console.log(orders);

    useEffect(() => {
        let isMounted = true;
        fetch(`https://peaceful-shore-84874.herokuapp.com/orders`)
            .then((res) => res.json())
            .then((data) => {
                if(isMounted ){
                   setOrders(data);
                    }
            }
            );
            return () => {
                isMounted = false;
                };
    }, [orders]);

    // Get  order status
const pendingOrder = orders?.filter(element => 
       (element?.status === "Pending...")
      );
const processingOrder = orders?.filter(element => 
       (element?.status === "Processing" || element?.status === "Packed" || element?.status === "Shipped")
      );
const deliveredOrder = orders?.filter(element => 
       (element?.status === "Delivered")
      );  
/* const CancelOrder = orders?.filter(element => 
       (element?.status === "Cancel")
      );   */


    const lastUpdate = mobiles.slice(-1).pop();
    const lastOffer = offers.slice(-1).pop();
    // const firstUpload = mobiles.slice(1);
    
        const earnOrder = orders?.filter(element => (element?.payment));
        const earning = (earnOrder?.reduce((total,currentItem) =>  total  = ( total + currentItem.total ), 0 ));

        const monthlyEarn = earnOrder?.filter(element => 
            (new Date(element?.date).getMonth() === new Date().getMonth() ));
        const tmEarning = (monthlyEarn?.reduce((total,currentItem) =>  total  = ( total + currentItem.total ), 0 ));

        const tdyEarn = earnOrder?.filter(element => 
            (new Date(element?.date).getDate() === new Date().getDate() ));
        const tdyEarning = (tdyEarn?.reduce((total,currentItem) =>  total  = ( total + currentItem.total ), 0 ));
        // console.log(tdyEarning);

        // User review Section
        //   const [reviews] = useReviews();
        const total=(cReview.reduce((total,currentItem) =>  total = parseFloat(total + currentItem.rating) , 0 ));

        const avg =(total/(cReview?.length)).toFixed(1);
    return (
        <div>
            {
                admin ? <div>
            {/* <div className='text-center'>
                <h1 style={{fontSize:"10vw"}} className='text-navi'>{time.toLocaleTimeString()}</h1>
                 <h1 className='text-lightest-slate'>{date}</h1>
            </div> */}
            
            <div className='row row-cols-1 row-cols-md-3 m-1 g-4'>
                <div className="col">
                    <div className="d-md-flex justify-content-between align-items-center bg-cart p-2 rounded">
                        <div className='m-auto'>
                            <PaymentIcon  style={{fontSize:"15vw"}}  className='w-100'/>
                        </div>
                        <div className='text-center w-100'>
                              <h5 className=''>Today's Earn: <br /> <span className="fs-1 text-pink"> {tdyEarning}</span></h5> 
                              <h5 className='text-light-slate'> <span className="font-custom">Orders:</span> <br /> <small className='text-pink'>{tdyEarn?.length}</small> </h5>
                        </div>
                    </div>
                </div>
                <div className="col">
                <div className="d-md-flex justify-content-between align-items-center bg-cart p-2 rounded">
                        <div className='m-auto'>
                            <CalendarViewMonth  style={{fontSize:"15vw"}}  className='w-100'/>
                        </div>
                        <div className='text-center w-100'>
                              <h5 className=''>This Month's Earn: <br /> <span className="fs-1 text-pink"> {tmEarning}</span></h5> 
                              <h5 className='text-light-slate'> <span className="font-custom">Orders:</span> <br /> <small className='text-pink'>{monthlyEarn?.length}</small> </h5>
                        </div>
                    </div>
                </div>
                <div className="col">
                <div className="d-md-flex justify-content-between align-items-center bg-cart p-2 rounded">
                        <div className='m-auto'>
                            <CreditScoreIcon  style={{fontSize:"15vw"}}  className='w-100'/>
                        </div>
                        <div className='text-center w-100'>
                              <h5 className=''>Total Earn: <br /> <span className="fs-1 text-pink"> {earning}</span></h5> 
                              <h5 className='text-light-slate'> <span className="font-custom">Complete orders:</span> <br /> <small className='text-pink'>{earnOrder?.length}</small> </h5>
                        </div>
                    </div>
                </div>
            </div>
            
                <div className="row row-cols-2 row-cols-md-4 m-2 g-2">
                    <div className="col">
                    <div className="d-flex justify-content-start align-items-center border m-auto py-2 rounded">
                    <div className="mx-2 p-3 rounded-circle bg-cart">
                            <FiShoppingCart className='fs-2 '/>
                        </div>
                        <div className='text-start'>
                              <small className='text-light-slate'>Total Order</small> <br /> <span className="text-navi fs-3 fw-bold"> {orders?.length}</span>
                        </div>
                    </div>
                </div>
                    <div className="col">
                    <div className="d-flex justify-content-start align-items-center border m-auto py-2 rounded">
                    <div className="mx-2 p-3 rounded-circle bg-cart">
                            <FiRefreshCcw className='fs-2 '/>
                        </div>
                        <div className='text-start'>
                              <small className='text-light-slate'>Order Pending </small> <br /> <span className="text-navi fs-3 fw-bold"> {pendingOrder?.length}</span>
                        </div>
                    </div>
                </div>
                    <div className="col">
                    <div className="d-flex justify-content-start align-items-center border m-auto py-2 rounded">
                        <div className="mx-2 p-3 rounded-circle bg-cart">
                            <FiTruck className='fs-2 '/>
                        </div>
                        
                        <div className='text-start'>
                              <small className='text-light-slate'>Order Processing </small> <br /> <span className="text-navi fs-3 fw-bold"> {processingOrder?.length}</span>
                        </div>
                    </div>
                </div>
                    <div className="col">
                    <div className="d-flex justify-content-start align-items-center border m-auto py-2 rounded">
                    <div className="mx-2 p-3 rounded-circle bg-cart">
                            <FiCheck className='fs-2 '/>
                        </div>
                        <div className='text-start'>
                              <small className='text-light-slate'>Order Delivered </small> <br /> <span className="text-navi fs-3 fw-bold"> {deliveredOrder?.length}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className='row row-cols-1 row-cols-md-3 g-4'>
                <div className="col">
                    <div className="d-md-flex justify-content-between align-items-center bg-cart p-2 rounded">
                        <div className='m-auto'>
                            <AnalyticsIcon  style={{fontSize:"15vw"}}  className='w-100'/>
                        </div>
                        <div className='text-center w-100'>
                              <h5 className=''>Total Products: <br /> <span className="fs-1 text-pink"> {(mobiles?.length) + (offers?.length)}</span></h5> 
                              <h5 className='text-light-slate'> <span className="font-custom">Last Product:</span> <br /> <small className='text-pink'>{lastUpdate?.name}</small> </h5>
                            {/*   {
                                  mobiles?.map(mob=>
                                    <div key={mob._id}>
                                        <h5>{mob?.updated_date}</h5>
                                    </div>)
                              } */}
                        </div>
                    </div>
                </div>
                <div className="col">
                    <div className="d-md-flex justify-content-between align-items-center bg-cart p-2 rounded">
                        <div className='m-auto'>
                            <AiFillProject  style={{fontSize:"15vw"}}  className='p-2 w-100'/>
                        </div>
                        <div className='text-center w-100'>
                              <h5 className=''>Flash Sale Products: <br /><span className="fs-1 text-pink">{offers?.length}</span></h5>
                              <h5 className=''> <span className="font-custom">Last Upload:</span> <br /> <small className='text-pink'>{lastOffer?.name}</small> </h5>
                        </div>
                    </div>
                </div>
                <div className="col">
                <div className="d-md-flex justify-content-between align-items-center bg-cart p-2 rounded">
                        <div className='m-auto'>
                            <AiOutlineStar  style={{fontSize:"15vw"}}  className='p-2 w-100'/>
                        </div>
                        <div className='text-center w-100'>
                              <h5 className=''>Shop Reviews: <br /><span className="fs-1 text-pink"> {cReview?.length}</span></h5>
                              <h5 className=''>Avg. Ratings: <br /> <Rating name="half-rating-read" value={Number(avg)} precision={0.1} readOnly /> <span className="fs-3 text-pink"> {avg}</span></h5>
                              
                        </div>
                    </div>
                </div>
            </div>
        </div> : <UserDashboard/>
            }
         
        </div>
    );
};

export default DashboardHome;