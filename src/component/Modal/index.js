import React from 'react';

import './Modal.scss';

function Modal({setModal, bg}) {
  
  return (
    <div className="Modal" style={{ backgroundImage: `url(${bg})` }}>
      <button onClick={() => setModal(false)}>Закрыть</button>
    </div>
  );
}

export default Modal;
