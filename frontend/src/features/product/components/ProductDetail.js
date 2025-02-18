import { useState, useEffect } from 'react';
import { StarIcon } from '@heroicons/react/20/solid';
import { RadioGroup } from '@headlessui/react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Truck, ShieldCheck, ArrowLeftRight, Star } from 'lucide-react'
import {
  fetchProductByIdAsync,
  selectProductById,
  selectProductListStatus,
} from '../productSlice';
import { useParams } from 'react-router-dom';
import { addToCartAsync, selectItems } from '../../cart/cartSlice';
import { selectLoggedInUser } from '../../auth/authSlice';
import { useAlert } from 'react-alert';
import { Grid } from 'react-loader-spinner';


function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}


export default function ProductDetail() {
  const [selectedColor, setSelectedColor] = useState();
  const [selectedSize, setSelectedSize] = useState();
  const items = useSelector(selectItems);
  const product = useSelector(selectProductById);
  const dispatch = useDispatch();
  const params = useParams();
  const alert = useAlert();
  const status = useSelector(selectProductListStatus);

  const handleCart = (e) => {
    e.preventDefault();
    if (items.findIndex((item) => item.product.id === product.id) < 0) {
      console.log({ items, product });
      const newItem = {
        product: product.id,
        quantity: 1,
      };
      if (selectedColor) {
        newItem.color = selectedColor;
      }
      if (selectedSize) {
        newItem.size = selectedSize;
      }
      dispatch(addToCartAsync({item:newItem, alert}));
    } else {
      alert.error('Item Already added');
    }
  };

  useEffect(() => {
    dispatch(fetchProductByIdAsync(params.id));
  }, [dispatch, params.id]);

  return (
    <div className="bg-white">
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
      {product && (
        <div className="pt-6">
          <nav aria-label="Breadcrumb">
            <ol className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
              {product.breadcrumbs &&
                product.breadcrumbs.map((breadcrumb) => (
                  <li key={breadcrumb.id}>
                    <div className="flex items-center">
                      <a
                        href={breadcrumb.href}
                        className="mr-2 text-sm font-medium text-gray-900"
                      >
                        {breadcrumb.name}
                      </a>
                      <svg
                        width={16}
                        height={20}
                        viewBox="0 0 16 20"
                        fill="currentColor"
                        aria-hidden="true"
                        className="h-5 w-4 text-gray-300"
                      >
                        <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                      </svg>
                    </div>
                  </li>
                ))}
              <li className="text-sm">
                <a
                  href={product.href}
                  aria-current="page"
                  className="font-medium text-gray-500 hover:text-gray-600"
                >
                  {product.title}
                </a>
              </li>
            </ol>
          </nav>

          {/* Image gallery */}
          <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:max-w-7xl lg:px-8">
  <div className="aspect-w-4 aspect-h-3 sm:aspect-w-16 sm:aspect-h-9 overflow-hidden rounded-lg">
    <img
      src={product.images[0]}
      alt={product.title}
      className="w-full h-full object-cover object-center"
    />
  </div>
</div>







          {/* Product info */}
          <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
            <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
              <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                {product.title}
              </h1>
            </div>

            {/* Options */}
            <div className="mt-4 lg:row-span-3 lg:mt-0">
              <h2 className="sr-only">Product information</h2>
              <p className="text-xl line-through tracking-tight text-gray-900">
                ${product.price}
              </p>
              <p className="text-3xl tracking-tight text-gray-900">
              ${Math.round(product.price*(1-product.discountPercentage/100))}
              </p>

              {/* Reviews */}
              <div className="mt-6">
                <h3 className="sr-only">Reviews</h3>
                <div className="flex items-center">
                  <div className="flex items-center">
                    {[0, 1, 2, 3, 4].map((rating) => (
                      <StarIcon
                        key={rating}
                        className={classNames(
                          product.rating > rating
                            ? 'text-gray-900'
                            : 'text-gray-200',
                          'h-5 w-5 flex-shrink-0'
                        )}
                        aria-hidden="true"
                      />
                    ))}
                  </div>
                  <p className="sr-only">{product.rating} out of 5 stars</p>
                </div>
              </div>

              <form className="mt-10">
                {/* Colors */}
                

                {/* Sizes */}
                
{product.stock <= 0 && (
                  <div>
                    <p className="text-sm text-red-400">out of stock</p>
               
                   <button
                   disabled = {true}
                   type="submit"
                   className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-100 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                 >
                   Add to Cart
                 </button>
                 </div>
                )}
                {product.stock >= 1 && (
                  <div>
                  
               
                   <button
                    onClick={handleCart}
                   type="submit"
                   className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                 >
                   Add to Cart
                 </button>
                 </div>
                )}

              
              </form>
            </div>

            <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
              {/* Description and details */}
              <div>
                <h3 className="sr-only">Description</h3>

                <div className="space-y-6">
                  <p className="text-base text-gray-900">
                    {product.description}
                  </p>
                </div>
              </div>

              <div className="mt-10">
              <h3 className="text-sm font-medium text-gray-900">Product Details</h3>

              <div className="mt-4 space-y-6">
                <div className="flex items-center">
                  <Box className="h-5 w-5 text-gray-400 mr-2" />
                  <p className="text-sm text-gray-600">Brand: {product.brand}</p>
                </div>
                <div className="flex items-center">
                  <ShieldCheck className="h-5 w-5 text-gray-400 mr-2" />
                  <p className="text-sm text-gray-600">Warranty: {product.warrantyInformation}</p>
                </div>
                <div className="flex items-center">
                  <Truck className="h-5 w-5 text-gray-400 mr-2" />
                  <p className="text-sm text-gray-600">Shipping: {product.shippingInformation}</p>
                </div>
                <div className="flex items-center">
                  <Box className="h-5 w-5 text-gray-400 mr-2" />
                  <p className="text-sm text-gray-600">Availability: {product.availabilityStatus}</p>
                </div>
                <div className="flex items-center">
                  <ArrowLeftRight className="h-5 w-5 text-gray-400 mr-2" />
                  <p className="text-sm text-gray-600">Return Policy: {product.returnPolicy}</p>
                </div>
              </div>
            </div>

            <div className="mt-10">
              <h2 className="text-sm font-medium text-gray-900">Customer Reviews</h2>
              <div className="mt-4 space-y-6">
                {product.reviews && product.reviews.map((review, index) => (
                  <div key={index} className="border-b pb-2 border-gray-200 pt-4">
                    <div className="flex items-center mb-2">
                      <div className="flex items-center">
                        {[0, 1, 2, 3, 4].map((rating) => (
                          <Star
                            key={rating}
                            className={classNames(
                              review.rating > rating ? 'text-yellow-400' : 'text-gray-300',
                              'h-5 w-5 flex-shrink-0'
                            )}
                            aria-hidden="true"
                          />
                        ))}
                      </div>
                      <p className="ml-2 text-sm text-gray-600">{review.reviewerName}</p>
                    </div>
                    <p className="text-sm text-gray-600">{review.comment}</p>
                    <p className="mt-1 text-sm text-gray-500">{new Date(review.date).toLocaleDateString()}</p>
                  </div>
                ))}
              </div>
            </div>

              

              
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
