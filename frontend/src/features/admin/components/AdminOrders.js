import { useEffect, useState } from 'react';
import { ITEMS_PER_PAGE } from '../../../app/constants';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchAllOrdersAsync,
  selectOrders,
  selectTotalOrders,
  updateOrderAsync,
} from '../../order/orderSlice';
import {
  PencilIcon,
  EyeIcon,
  ArrowUpIcon,
  ArrowDownIcon,
} from '@heroicons/react/24/outline';
import Pagination from '../../common/Pagination';
import { Clock, CreditCard, MapPin, Package, Truck } from 'lucide-react';

function AdminOrders() {
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const orders = useSelector(selectOrders);
  const totalOrders = useSelector(selectTotalOrders);
  const [editableOrderId, setEditableOrderId] = useState(-1);
  const [sort, setSort] = useState({});

  const handleEdit = (order) => {
    setEditableOrderId(order.id);
  };
  const handleShow = () => {
    console.log('handleShow');
  };

  const handleOrderStatus = (e, order) => {
    const updatedOrder = { ...order, status: e.target.value };
    dispatch(updateOrderAsync(updatedOrder));
    setEditableOrderId(-1);
  };

  const handleOrderPaymentStatus = (e, order) => {
    const updatedOrder = { ...order, paymentStatus: e.target.value };
    dispatch(updateOrderAsync(updatedOrder));
    setEditableOrderId(-1);
  };

  const handlePage = (page) => {
    setPage(page);
  };

  const handleSort = (sortOption) => {
    const sort = { _sort: sortOption.sort, _order: sortOption.order };
    console.log({ sort });
    setSort(sort);
  };

  const chooseColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-purple-200 text-purple-600';
      case 'dispatched':
        return 'bg-yellow-200 text-yellow-600';
      case 'delivered':
        return 'bg-green-200 text-green-600';
      case 'received':
        return 'bg-green-200 text-green-600';
      case 'cancelled':
        return 'bg-red-200 text-red-600';
      default:
        return 'bg-purple-200 text-purple-600';
    }
  };

  useEffect(() => {
    const pagination = { _page: page, _limit: ITEMS_PER_PAGE };
    dispatch(fetchAllOrdersAsync({ sort, pagination }));
  }, [dispatch, page, sort]);

  return (
    <div className="overflow-x-auto ">
      <div className="bg-gray-100 flex items-center justify-center font-sans overflow-hidden">
        <div className="w-full">
          <div className="bg-white flex flex-col gap-4 shadow-md rounded my-6">
            
            {orders.map((order) => (
               <div id={order.id} className="bg-white shadow-md border-b border-gray mb-6 rounded-lg overflow-hidden">
               <div className="p-4 mb-4 sm:p-6">
                 <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
                   <h2 className="text-lg font-semibold mb-2 sm:mb-0">Order #{order.id}</h2>
                   <div className="flex items-center text-sm text-gray-500">
                     <Clock className="w-4 h-4 mr-1" />
                     <span>{order.createdAt? new Date(order.createdAt).toLocaleString():null }</span>
                   </div>
                 </div>
         
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                   <div>
                     <h3 className="font-semibold mb-2">Items</h3>
                     <ul className="list-disc list-inside">
                     {order.items.map((item, index) => (
                        <div key={index} className="flex items-center">
                          <div className="mr-2">
                            <img
                              className="w-6 h-6 rounded-full"
                              src={item.product.thumbnail}
                              alt={item.product.title}
                            />
                          </div>
                          <span>
                            {item.product.title} - #{item.quantity} - $
                            {Math.round(item.product.price*(1-item.product.discountPercentage/100))}
                          </span>
                        </div>
                      ))}
                     </ul>
                   </div>
                   <div>
                     <h3 className="font-semibold mb-2">Shipping Address</h3>
                     <p className="text-sm">{order.selectedAddress.name}, {order.selectedAddress.street}, {order.selectedAddress.city}, {order.selectedAddress.pinCode}, {order.selectedAddress.phone}</p>
                   </div>
                 </div>
         
                 <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                   <div>
                     <h3 className="font-semibold mb-1">Total Amount</h3>
                     <p className="text-lg text-green-600">${order.totalAmount}</p>
                   </div>
                   <div>
                     <h3 className="font-semibold mb-1">Order Status</h3>
                     
                     {order.id === editableOrderId ? (
                        <select onChange={(e) => handleOrderStatus(e, order)}>
                          <option value="pending">Pending</option>
                          <option value="dispatched">Dispatched</option>
                          <option value="delivered">Delivered</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      ) : (
                        <span
                          className={`${chooseColor(
                            order.status
                          )} py-1 px-3 rounded-full text-xs`}
                        >
                          {order.status}
                        </span>
                      )}
                   
                   </div>
                   <div>
                     <h3 className="font-semibold mb-1">Payment Method</h3>
                     <div className="flex items-center">
                       <CreditCard className="w-4 h-4 mr-1" />
                       <span>{order.paymentMethod}</span>
                     </div>
                   </div>
                 </div>
         
                 <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                   <div>
                     <h3 className="font-semibold mb-1">Payment Status</h3>
                     {order.id === editableOrderId ? (
                        <select
                          onChange={(e) => handleOrderPaymentStatus(e, order)}
                        >
                          <option value="pending">Pending</option>
                          <option value="received">Received</option>
                        </select>
                      ) : (
                        <span
                          className={`${chooseColor(
                            order.paymentStatus
                          )} py-1 px-3 rounded-full text-xs`}
                        >
                          {order.paymentStatus}
                        </span>
                      )}
                   </div>
                   <div>
                     <h3 className="font-semibold mb-1">Last Updated</h3>
                     <div className="flex items-center text-sm text-gray-500">
                       <Clock className="w-4 h-4 mr-1" />
                       <span>{order.updatedAt? new Date(order.updatedAt).toLocaleString():null }</span>
                     </div>
                   </div>
                   <div className="w-6 mr-2 transform hover:text-purple-500 hover:scale-120">
                          <PencilIcon
                            className="w-8 h-8"
                            onClick={(e) => handleEdit(order)}
                          ></PencilIcon>
                        </div>
                 </div>
         
                
               </div>
             </div>

))}
          </div>
        </div>
      </div>
      <Pagination
        page={page}
        setPage={setPage}
        handlePage={handlePage}
        totalItems={totalOrders}
      ></Pagination>
    </div>
  );
}

export default AdminOrders;
