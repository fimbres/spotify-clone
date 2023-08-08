"use client";

import React, { useState } from 'react'
import Modal from './Modal';
import { Price, ProductWithPrice } from '@/types';
import Button from './Button';
import { useUser } from '@/hooks/useUser';
import { toast } from 'react-hot-toast';
import { postData } from '@/libs/helpers';
import { getStripe } from '@/libs/stripeClient';
import { useSubscribeModal } from '@/hooks/useSubscribe';

interface SubscribeModalProps {
    products: ProductWithPrice[];
}

const SubscribeModal: React.FC<SubscribeModalProps> = ({ products }) => {
  const { onClose, isOpen } = useSubscribeModal();
  const [priceIdLoading, setPriceIdLoading] = useState<string>('');
  const { user, isLoading, subscription } = useUser();
  let content = (
    <div className='text-center'>
        No products available.
    </div>
  );

  const handleChange = (open: boolean) => {
    if(!open) {
        onClose();
    }
  }

  const formatPrice = (price: Price) => {
    const priceString = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: price.currency,
        minimumFractionDigits: 2
    }).format(
        (price?.unit_amount || 0) / 100,
    );

    return priceString;
  };

  const handleCheckout = async (price: Price) => {
    if(!user) {
        toast.error('Must be logged in.');
        return;
    }

    if(subscription) {
        toast.error('Already subscribed.');
        return;
    }

    try {
        setPriceIdLoading(price.id);
        const { sessionId } = await postData({
            url: '/api/create-checkout-session',
            data: {
                price
            }
        });

        const stripe = await getStripe();
        stripe?.redirectToCheckout({ sessionId });
    } catch (error) {
        toast.error((error as Error)?.message);
    } finally {
        setPriceIdLoading('');
    }
  };

  if(products.length) {
    content = (
        <div className='text-center'>
            {products.map(product => {
                if(!product.prices?.length) {
                    return (
                        <div key={product.id} className='mb-4'>
                            No prices available.
                        </div>
                    )
                }

                return product.prices.map(prices => (
                    <Button key={prices.id} onClick={() => handleCheckout(prices)}disabled={isLoading || prices.id === priceIdLoading}>
                        {`Subscribe for ${formatPrice(prices)} a ${prices.interval}`}
                    </Button>
                ))
            })}
        </div>
    );
  }

  if(subscription) {
    content = (
        <div className='text-center'>
            Already subscribed.
        </div>
    );
  }

  return (
    <Modal
        title='Only for premium users.'
        description='Listen to music with Spotify Premium.'
        isOpen={isOpen}
        onChange={handleChange}
    >
        {content}
    </Modal>
  )
}

export default SubscribeModal;
