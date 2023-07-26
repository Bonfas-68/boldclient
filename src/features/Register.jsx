import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { domain, validateFile} from '../utils/utils';
import { useSelector } from 'react-redux';
import { useState } from 'react';

export default function Register() {
  const user = useSelector(store=>store.user.user)
  const [file, setFile] = useState(null);
  const [load, setLoad] = useState(true);
  const navigate = useNavigate();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    if (!file) {
      return alert('Please select an image');
    } else {
      try {
        validateFile(file);
        let image = Date.now() + file.name;
        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('email', data.email);
        formData.append('password', data.password);
        formData.append('image', image);
        formData.append('file', file);
        await axios.post(`${domain}/auth/register`,
          formData,{
          headers:{Authorization: `${user.token}`}
        })
        navigate('/login')
      } catch (error) {
        alert(error.message);
      }
    }
  };


  return (
    <div className="flex bg-green-100/10 w-full min-h-screen items-center justify-center flex-col">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-80 bg-white py-4 text-center px-6 rounded-md shadow-2xl"
      >
        <h1 className="text-3xl  mb-2 text-green-950 font-semibold tracking-widest">
          Register
        </h1>

        <div className="my-6 w-full">
          <label htmlFor="image" className='w-full text-lg font-light tracking-wider cursor-pointer'>Upload Profile Photo</label>
          {file &&<img className='w-20 mx-auto h-20 rounded-full border-2 border-emerald-400 object-cover' src={URL.createObjectURL(file)} alt="" />}
          <input
            className="reg_input"
            {...register('image', { required: 'image cannot be empty' })}
            type="file"
            id='image'
            style={{display:'none'}}
            onChange={(e)=> setFile(e.target.files[0])}
            placeholder="Enter Full Name"
          />
          <p>{errors?.name?.message}</p>
        </div>
        <div className="my-6 w-full">
          <input
            className="reg_input"
            {...register('name', { required: 'Name cannot be empty' })}
            type="text"
            placeholder="Enter Full Name"
          />
          <p>{errors?.name?.message}</p>
        </div>
        <div className="my-6 w-full">
          <input
            className="reg_input"
            {...register('email', { required: 'Email cannot be empty' })}
            type="email"
            placeholder="Enter your email address"
          />
          <p>{errors?.email?.message}</p>
        </div>
        <div className="my-6 w-full">
          <input
            className="reg_input"
            {...register('password', { required: 'Password cannot be empty' })}
            type="password"
            placeholder="Enter your password address"
          />
          <p>{errors?.password?.message}</p>
        </div>
        <button className="bg-green-950 py-3 px-5 rounded-md text-white font-semibold cursor-pointer">
          Register
        </button>
        <p className="my-1 text-sm font-light text-gray-700 w-full">
          Already have an account,{' '}
          <Link
            className="text-blue-900 font-semibold hover:text-blue-900/90 transition-all duration-300 "
            to="/login"
          >
            login
          </Link>
        </p>
      </form>
    </div>
  );
}
