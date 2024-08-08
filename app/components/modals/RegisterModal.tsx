'use client';

import axios from 'axios'; 
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import { useState } from 'react';
import Modal from './Modal';
import Heading from '../Heading';
import Input from '../inputs/input';
import toast from 'react-hot-toast';
import Button from '../Button';



const RegisterModal= () =>{
    
  const registerModal = useRegisterModal();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = 
    (data) => {
      setIsLoading(true);
      axios
        .post("/api/register", data)
        .then(() => {          
          registerModal.onClose();          
        })
        .catch((error) => {
          toast.error('something went wrong');
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  

    const bodyContent = (
      
        <div className="flex flex-col gap-4">
          <Heading title="Welcome to Airbnb" subtitle="Create an account" />
          <Input
            required
            id="email"
            label="Email"
            errors={errors}
            disabled={isLoading}
            register={register}
          />
          <Input
            required
            id="name"
            label="Name"
            errors={errors}
            disabled={isLoading}
            register={register}
          />
          <Input
            required
            type="password"
            id="password"
            label="Password"
            errors={errors}
            disabled={isLoading}
            register={register}
          />
        </div>
    )
        
    
    const footerContent = (
      <div className="flex flex-col gap-4 mt-3">
        <hr />
        <Button
          outline
          label="Continue with Google"
          Icon={FcGoogle}
          onClick={() => {}}
        />
        <Button
          outline
          label="Continue with Github"
          Icon={AiFillGithub}
          onClick={() => {}}
        />
        <div className="text-neutral-500 text-center mt-4 font-light">
          <div className="flex flex-row justify-center items-center gap-2">
            <div>Already have an account?</div>
            <div
              onClick={registerModal.onClose}
                
            
              className="text-stone-800 cursor-pointer hover:underline"
            >
              Log in
            </div>
          </div>
        </div>
      </div>
    )


    return(
        
      <Modal
     
      title="Register"
      actionLabel="Continue"
      isOpen={registerModal.isOpen}
      disabled={isLoading}
      onClose={registerModal.onClose} 
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />

      
    )
}

export default RegisterModal
