import * as React from 'react';
import Popover from '@mui/material/Popover';
import ShareIcon from '@mui/icons-material/Share';
import {
  FacebookShareButton,
  FacebookIcon,
  TelegramShareButton,
  TelegramIcon,
  WhatsappShareButton,
  WhatsappIcon
} from "react-share";


const ShareProduct = ({mobile,mobile2}) => {
  const shareUrl = `https://phono-3a490.web.app/mobile/${mobile?._id}`;
  const shareUrl2 = `https://phono-3a490.web.app/mobile2/${mobile2?._id}`;


    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };
  
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;
  
    return (
      <div>
          <ShareIcon className='text-navi' aria-describedby={id}  onClick={handleClick} />
        
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
        >
          <div className='p-3'>
            <div className="d-flex justify-content-between align-items-center">
              <div>
                 <p className='my-auto'>Share via : </p>
              </div>
              <div>
        <FacebookShareButton url={mobile?._id ? shareUrl : shareUrl2} quote={mobile?.name} hashtag={`#Phono`}>
          <FacebookIcon className='mx-2' round={true} size={30} />
        </FacebookShareButton>

        <TelegramShareButton url={mobile?._id ? shareUrl : shareUrl2} title={mobile?.name}>
          <TelegramIcon className='me-2' round={true} size={30} />
        </TelegramShareButton>

        <WhatsappShareButton url={mobile?._id ? shareUrl : shareUrl2} title={mobile?.name}>
          <WhatsappIcon round={true} size={30} />
        </WhatsappShareButton>
              </div>
            </div>
          </div>
        </Popover>
      </div>
    );
};

export default ShareProduct;