"use client";

import React, { useEffect, useState } from 'react'
import Modal from '@/components/Modal';

const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  
    return () => {
      setIsMounted(false);
    }
  }, []);

  if(!isMounted) {
    return null;
  }
  
  return (
    <>
        <Modal />
    </>
  )
}

export default ModalProvider
