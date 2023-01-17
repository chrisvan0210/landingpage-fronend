import React,{useEffect, useState} from 'react'
import {  Modal } from 'antd';

interface ModalType {
  isOpen : boolean
}

function AddNewModal({isOpen}:ModalType) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => { setIsModalOpen(isModalOpen)},[])
  console.log(isModalOpen);
  return (
    <div>
       <Modal title="Basic Modal" open={isModalOpen}>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </div>
  )
}

export default AddNewModal