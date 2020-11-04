import React from 'react';

import './Modal.scss';

function Modal({setModal, bg}) {
  
  return (
    <div className="Modal" style={{ backgroundImage: `url(${bg})` }}>
      <button className="Modal__btn" onClick={() => setModal(false)}>Закрыть</button>
    </div>
  );
}

export default Modal;
