import { Fragment } from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import {
  Bars3Icon,
  ShoppingCartIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectItems } from '../cart/cartSlice';
import { selectLoggedInUser } from '../auth/authSlice';
import { selectUserInfo } from '../user/userSlice';
import { ShoppingCart, Search, X, Home, Tag, Heart, User, ArrowBigRight } from 'lucide-react';


const navigation = [
  { name: 'Products', link: '/admin', user: true, roles: ['admin', 'user'] },
  { name: 'Orders', link: '/admin/orders', admin: true, roles: ['admin'] },

];
const userNavigation = [
  { name: 'My Profile', link: '/profile' },
  { name: 'My Orders', link: '/my-orders' },
  { name: 'Sign out', link: '/logout' },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

function NavBar({ children }) {
  const items = useSelector(selectItems);
  const userInfo = useSelector(selectUserInfo);

  return (
    <>
      {userInfo && <div className="min-h-full">
        <Disclosure as="nav" className="bg-gray-800">
          {({ open }) => (
            <>
              <div className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 flex items-center">
                      <img className="h-8 w-auto rounded-md" src="https://www.onlinelogomaker.com/blog/wp-content/uploads/2017/06/shopping-online.jpg" alt="E-commerce Logo" />
                      <span className="ml-2 text-xl font-bold text-white">E-Shop</span>
                    </div>
                    <div className="hidden md:block">
                      <div className="ml-10 flex items-baseline space-x-4">


                        {navigation.map((item) =>
                          item[userInfo.role] ? (
                            <Link
                              key={item.name}
                              to={item.link}
                              className={classNames(
                                item.current
                                  ? 'bg-gray-900 text-white'
                                  : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                'rounded-md px-3 py-2 text-sm font-medium'
                              )}
                              aria-current={item.current ? 'page' : undefined}
                            >
                              {item.name}
                            </Link>
                          ) : null
                        )}
                      </div>
                    </div>



                  </div>

                  <div className="hidden md:block">
                    <div className="ml-4 flex items-center md:ml-6">
                      <div className="relative pr-4">
                        <input
                          type="text"
                          placeholder="Search..."
                          className="bg-gray-100 rounded-full py-2 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
                        />
                        <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                      </div>


                      <Link to="/cart" className="ml-4 relative mr-4">
                        <ShoppingCart className="h-6 w-6 text-gray-600 hover:text-gray-900" />
                        {items.length > 0 && (
                          <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">{items.length}</span>
                        )}
                      </Link>

                      {/* Profile dropdown */}
                      <Menu as="div" className="relative ml-3">
                        <div>
                          <Menu.Button className="flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                            <span className="sr-only">Open user menu</span>
                            <img
                              className="h-8 w-8 rounded-full"
                              src="https://miro.medium.com/v2/resize:fit:736/1*YqfVlyCe06DfcPsR3kpYrw.jpeg"
                              alt=""
                            />
                          </Menu.Button>
                        </div>
                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            {userNavigation.map((item) => (
                              <Menu.Item key={item.name}>
                                {({ active }) => (
                                  <Link
                                    to={item.link}
                                    className={classNames(
                                      active ? 'bg-gray-100' : '',
                                      'block px-4 py-2 text-sm text-gray-700'
                                    )}
                                  >
                                    {item.name}
                                  </Link>
                                )}
                              </Menu.Item>
                            ))}
                          </Menu.Items>
                        </Transition>
                      </Menu>
                    </div>
                  </div>
                  <div className="-mr-2 flex md:hidden">
                    {/* Mobile menu button */}
                    <Disclosure.Button className="inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="sr-only">Open main menu</span>
                      {open ? (
                        <XMarkIcon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      ) : (
                        <Bars3Icon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      )}
                    </Disclosure.Button>
                  </div>
                </div>
              </div>

              <Disclosure.Panel className="md:hidden">
                {userInfo && userInfo.role === "admin" && (
                  <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
                    {navigation.map((item) => (
                      <Disclosure.Button
                        key={item.name}
                        as="a"
                        href={item.link}
                        className={classNames(
                          item.current
                            ? 'bg-gray-900 text-white'
                            : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                          'block rounded-md px-3 py-2 text-base font-medium'
                        )}
                        aria-current={item.current ? 'page' : undefined}
                      >
                        {item.name === "Products" ? (
                          <div className="flex gap-4">
                            <Tag />
                            {item.name}
                          </div>
                        ) : item.name === "Orders" ? (
                          <div className="flex gap-4">
                            <ShoppingCart />
                            {item.name}
                          </div>
                        ) : null}
                      </Disclosure.Button>
                    ))}
                  </div>
                )}

                <div className="border-t border-gray-700 pb-3 pt-4">
                  <div className="flex items-center px-5">
                    <div className="flex-shrink-0">
                      <img
                        className="h-10 w-10 rounded-full"
                        src="https://miro.medium.com/v2/resize:fit:736/1*YqfVlyCe06DfcPsR3kpYrw.jpeg"
                        alt=""
                      />
                    </div>
                    <div className="ml-3">
                      <div className="text-base font-medium leading-none text-white">
                        {/* this should come from userInfo */}
                        {userInfo.name}
                      </div>
                      <div className="text-sm font-medium leading-none text-gray-400">
                        {userInfo.email}
                      </div>
                    </div>
                    <Link to="/cart" className="ml-4 relative mr-4">
                      <ShoppingCart className="h-6 w-6 text-gray-600 hover:text-gray-900" />
                      {items.length > 0 && (
                        <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">{items.length}</span>
                      )}
                    </Link>
                  </div>
                  <div className="mt-3 space-y-1 px-2">
                    {userNavigation.map((item) => (
                      <Disclosure.Button
                        key={item.name}
                        as="a"
                        href={item.link}
                        className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                      >
                        {/* {item.name} */}
                        {item.name === "My Profile" ? (
                          <div className='flex gap-4'>
                            <User />
                            {item.name}
                          </div>
                        ) : item.name === "My Orders" ? (
                          <div className='flex gap-4'>
                            <ShoppingCart />
                            {item.name}
                          </div>
                        ) : item.name === "Sign out" ? (
                          <div className='flex gap-4'>
                            <ArrowBigRight />
                            {item.name}
                          </div>
                        )
                          : null}
                      </Disclosure.Button>
                    ))}
                  </div>
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>


        <main>
          <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>}
    </>
  );
}

export default NavBar;
