import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import {useDispatch, useSelector} from 'react-redux';
import { resetPasswordAsync, selectError, selectPasswordReset } from '../authSlice';

export default function ResetPassword() {

  const passwordReset = useSelector(selectPasswordReset);
  const error = useSelector(selectError)
  const query = new URLSearchParams(window.location.search);
  const token = query.get('token')
  const email = query.get('email')

  const dispatch = useDispatch()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  console.log(errors);
  console.log(email, token)

  return (
    <>
   {(email && token) ? <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Enter New Password
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" noValidate
            onSubmit={handleSubmit((data) => {
              console.log(data);
              dispatch(resetPasswordAsync({email, token, password:data.password}))
              
            })}>
            <div>
              <label htmlFor="new-password" className="block text-sm font-medium text-gray-700">
                New Password
              </label>
              <div className="mt-1">
                <input
                  {...register('password', {
                    required: 'password is required',
                    pattern: {
                      value:
                        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm,
                      message: `- at least 8 characters\n
                      - must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number\n
                      - Can contain special characters`,
                    },
                  })}
                  type="password"
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  
                />
                {errors.password && (
                  <p className="text-red-500">{errors.password.message}</p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <div className="mt-1">
                <input
                   id="confirmPassword"
                   {...register('confirmPassword', {
                     required: 'confirm password is required',
                     validate: (value, formValues) =>
                       value === formValues.password || 'password not matching',
                   })}
                   type="password"
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  
                />
                {errors.confirmPassword && (
                  <p className="text-red-500">
                    {errors.confirmPassword.message}
                  </p>
                )}
                {passwordReset && (
                  <p className="text-green-500">Password Reset</p>
                )}
                {error && (
                  <p className="text-red-500">{error}</p>
                )}
              </div>
            </div>

            

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Reset Password
              </button>
            </div>
          </form>

          <div className="mt-6">
          Send me back to{' '}
            <Link
              to="/login"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>: <p>Incorrect Link</p>}

    {/* old */}
      
    </>
  );
}
