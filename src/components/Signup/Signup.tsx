import { Link, useNavigate } from 'react-router-dom';
import { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { login } from '../../store/slices/authSlice';
import authService from '../../appwrite/authService';
import Button from '../Button/Button';
import Input from '../Input/Input';
import Logo from '../Logo/Logo';

interface IFormData {
  name: string;
  email: string;
  password: string;
}

const Signup: FC = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm<IFormData>();

  const createUser = async (formData: IFormData) => {
    setError('');
    try {
      console.log(formData);
      const userData = await authService.createAccount(formData);
      if (userData) {
        const userData = await authService.getCurrentUser();
        if (userData) dispatch(login({ userData }));
        navigate('/');
      }
    } catch (err) {
      console.log((err as Error).message);
    }
  };
  return (
    <div className="flex items-center justify-center">
      <div
        className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}
      >
        <div className="mb-2 flex justify-center">
          <span className="inline-block w-full max-w-[100px]">
            <Logo width="100%" />
          </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight">
          Sign up to create account
        </h2>
        <p className="mt-2 text-center text-base text-black/60">
          Already have an account?&nbsp;
          <Link
            to="/login"
            className="font-medium text-primary transition-all duration-200 hover:underline"
          >
            Sign In
          </Link>
        </p>
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
        <form onSubmit={handleSubmit(createUser)} className="mt-8">
          <div className="space-y-5">
            <Input
              {...register('name', { required: true })}
              label="Full Name : "
              placeholder="Full Name"
            />
            <Input
              {...register('email', {
                required: true,
              })}
              label="Email : "
              placeholder="Email Address"
              type="email"
            />
            <Input
              {...register('password', { required: true })}
              label="Password : "
              type="password"
              placeholder="Password"
            />
            <Button type="submit" className="w-full">
              Create Account
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
