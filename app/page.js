"use client";
import axios from "axios";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";

export default function Home() {
  const [holdBtn, setHoldBtn] = useState(true);

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const watchHolder = watch();

  const createUser = (data) => {
    const newUser = axios.post("http://localhost:4001/register", {
      firstName: data.firstName,
      lastName: data.lastName,
      phone: data.phone,
      email: data.email,
    });

    toast.promise(newUser, {
      loading: `Please Wait...`,
      success: (data) => `${data.data}`,
      error: (err) => `${err.response.data}`,
    });
  };
  useEffect(() => {
    if (
      watchHolder.firstName &&
      watchHolder.lastName &&
      watchHolder.email &&
      watchHolder.phone
    ) {
      setHoldBtn(false);
    } else {
      setHoldBtn(true);
    }
  }, [watchHolder]);

  return (
    <main>
      <form className="p-10">
        <div class="relative z-0 w-full mb-6 group">
          <input
            type="email"
            name="floating_email"
            {...register("email", { required: true })}
            id="floating_email"
            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
          />
          <label
            for="floating_email"
            class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Email address
          </label>
        </div>

        <div class="grid md:grid-cols-2 md:gap-6">
          <div class="relative z-0 w-full mb-6 group">
            <input
              type="text"
              name="floating_first_name"
              {...register("firstName", { required: true })}
              id="floating_first_name"
              class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <label
              for="floating_first_name"
              class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              First name
            </label>
          </div>
          <div class="relative z-0 w-full mb-6 group">
            <input
              type="text"
              name="floating_last_name"
              {...register("lastName", { required: true })}
              id="floating_last_name"
              class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <label
              for="floating_last_name"
              class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Last name
            </label>
          </div>
        </div>
        <div class="grid md:grid-cols-2 md:gap-6">
          <div class="relative z-0 w-full mb-6 group">
            <input
              type="tel"
              pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
              name="floating_phone"
              {...register("phone", { required: true })}
              id="floating_phone"
              class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <label
              for="floating_phone"
              class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Phone number (123-456-7890)
            </label>
          </div>
        </div>
        <button
          disabled={holdBtn}
          onClick={handleSubmit(createUser)}
          type="submit"
          class={`text-white w-full  ${
            holdBtn ? "bg-blue-700/30" : "bg-blue-700 hover:bg-blue-800"
          }  ease-in-out transition-all duration-300 p-3 rounded-lg`}
        >
          Submit
        </button>
        <Toaster />
      </form>
    </main>
  );
}
