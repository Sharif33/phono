import React from 'react';
import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';

const EditUser = ({openUserNow,handleClose,user}) => {
    return (
        <div>
                <Modal
                open={openUserNow}
                onClose={handleClose}
                center
                aria-labelledby="my-modal-title"
                aria-describedby="my-modal-description"
              >
                  <h1>hello.......</h1>
              </Modal>
        </div>
    );
};

export default EditUser;