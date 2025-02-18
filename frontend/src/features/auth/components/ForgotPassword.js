import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import {useDispatch, useSelector} from 'react-redux';
import { resetPasswordRequestAsync, selectMailSent } from '../authSlice';

export default function ForgotPassword() {

 const mailSent = useSelector(selectMailSent);
  const dispatch = useDispatch()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  console.log(errors);

  return (
    <>

<div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-6 sm:p-8 rounded-lg shadow-md">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Reset Password</h2>
        </div>
        <form className="mt-8 space-y-6"  noValidate
            onSubmit={handleSubmit((data) => {
              console.log(data);
              dispatch(resetPasswordRequestAsync(data.email))
              
            })}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email address
            </label>
            <div className="mt-1">
              
              <input
               id="email"
               {...register('email', {
                required: 'email is required',
                pattern: {
                  value: /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi,
                  message: 'email not valid',
                },
              })}
              type="email"
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
               
              />
              {errors.email && (
                  <p className="text-red-500">{errors.email.message}</p>
                )}
                {mailSent && (
                  <p className="text-green-500">Mail Sent</p>
                )}
            </div>
          </div>

          <div>
            <button
              type="submit"
             className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-black-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
            >
                Send Email
            </button>
          </div>
        </form>

       

<p className="mt-10 text-center text-sm text-gray-500">
            Send me back to{' '}
            <Link
              to="/login"
              className="font-semibold leading-6 text-black hover:text-black-500"
            >
              Login
            </Link>
          </p>
      </div>
    </div>

    
    </>
  );
}
