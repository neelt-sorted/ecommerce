import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchLoggedInUserOrderAsync,
  selectUserInfo,
  selectUserInfoStatus,
  selectUserOrders,
} from '../userSlice';
import { Grid } from 'react-loader-spinner';

export default function UserOrders() {
  const dispatch = useDispatch();
  const orders = useSelector(selectUserOrders);
  const status = useSelector(selectUserInfoStatus);

  useEffect(() => {
    dispatch(fetchLoggedInUserOrderAsync());
  }, [dispatch]);

  return (
    <div className='flex flex-col gap-3'>
      {orders && orders.map((order) => (

<div key={order.id} className="w-full max-w-4xl mx-auto bg-white mb-5 shadow-lg rounded-lg overflow-hidden">
        <div className="p-4 sm:p-6 border-b">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex items-center gap-3">
              <h2 className="text-lg sm:text-xl font-semibold">
                Order #{order.id}
              </h2>
              <span className="inline-flex items-center px-3 py-1 text-xs sm:text-sm bg-green-100 text-green-800 rounded-full">
                {order.status}
              </span>
            </div>
          </div>
        </div>
        <div className="p-4 sm:p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <h3 className="font-semibold text-base sm:text-lg border-b pb-2">Order Items</h3>
              {order.items.map((item, index) => (
                <div key={index} className="flex items-start space-x-4 hover:bg-gray-50 p-2 rounded-lg transition-colors">
                  <img
                    src={item.product.thumbnail}
                    alt={item.product.title || 'Product image'}
                    className="w-20 h-20 rounded-lg object-cover flex-shrink-0"
                  />
                  <div className="flex-grow space-y-1">
                    <h3 className="font-semibold text-sm sm:text-base">{item.product.title}</h3>
                    <p className="text-xs sm:text-sm text-gray-500">{item.product.brand}</p>
                    <div className="flex justify-between items-center mt-2">
                      <p className="font-medium text-sm sm:text-base">
                        ${Math.round(item.product.price * (1 - item.product.discountPercentage / 100))}
                      </p>
                      <p className="text-xs sm:text-sm font-medium bg-gray-100 px-2 py-1 rounded">
                        Qty: {item.quantity}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
              {order.items.length === 0 && (
                <div className="text-center py-8 text-gray-500 bg-gray-50 rounded-lg">
                  <p>No items in this order</p>
                </div>
              )}
            </div>
            <div className="space-y-8">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-base sm:text-lg mb-4">Order Summary</h3>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm sm:text-base">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">${order.totalAmount}</span>
                  </div>
                  <div className="flex justify-between text-sm sm:text-base">
                    <span className="text-gray-600">Total Items</span>
                    <span className="font-medium">{order.totalItems}</span>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-base sm:text-lg mb-4">Shipping Address</h3>
                <address className="not-italic text-sm sm:text-base space-y-1 text-gray-600">
                  <p className="font-medium text-gray-900">{order.selectedAddress.name}</p>
                  <p>{order.selectedAddress.street}</p>
                  <p>{order.selectedAddress.city}, {order.selectedAddress.pinCode}</p>
                  <p>Phone: {order.selectedAddress.phone}</p>
                </address>
              </div>
            </div>
          </div>
        </div>
      </div>


        
      ))}
     
       {status === 'loading' ? (
        <Grid
          height="80"
          width="80"
          color="rgb(79, 70, 229) "
          ariaLabel="grid-loading"
          radius="12.5"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      
      ) : null}
    </div>
  );
}
