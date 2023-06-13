"use client";


import Image from 'next/image'
import mobileImage from "/src/app/assets/images/illustration-sign-up-mobile.svg"
import iconList from "./assets/images/icon-list.svg"
import desktopImage from "./assets/images/illustration-sign-up-desktop.svg"
import { useFormik } from 'formik'
import { use, useState } from 'react'
import Success from './Success';

export default function Home() {
  const[success,setSuccess]= useState(true)
  const validate=(values)=>{
    const errors={};

    if(!values.email){
     errors.email=""
    }else if (
       !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)){
        errors.email="valid email required"
       }
return errors
    
  }
  const formik=useFormik({
    initialValues:{
      email:""
    },
    validate,
    onSubmit:(values) => {
      console.log("form submitted")
      setSuccess(true)
    }
  })
  return (
    <>
      {!success &&
      <div className= 'md:bg-slate-900 md:flex md:items-center md:justify-center md:h h-screen '>
      <section className='bg-white md:w-[700px] md:flex md:flex-row-reverse md:items-center md:rounded-2xl md:py-4 md:px-6 lg:w-[900px] md:gap-4'>
        <div className='md:hidden '>
          <Image priority={true} src={mobileImage} alt="newsletter" height={250} width={768} />
        </div>
        <div className='hidden md:block md:flex-1 '>
          <Image priority={true} src={desktopImage} alt="newsletter"  height={250} width={768}/>
        </div>
        <div className='py-8 px-4 md:flex-1'>
          <h1 className='text-slate-900 font-bold text-4xl lg:text-5xl mb-8'>Stay updated!</h1>
          <p className='mb-8'>Join 60,000+ product managers receiving monthly updates on:</p>
          <ul className='flex flex-col gap-4 mb-8'>
            <li className='flex gap-4 items-start'><Image src={iconList} alt='icon' />  Product discovery and building what matters</li>
            <li className='flex  gap-4 items-start'><Image src={iconList} alt='icon' />   Measuring to ensure updates are a success</li>
            <li className='flex gap-4 items-start'><Image src={iconList} alt='icon' /> And much more!</li>
          </ul>
          <form 
          onSubmit={formik.handleSubmit}
           autoComplete='off'>
            <article >
            <label htmlFor="email" className='block text-slate-900 font-bold text-sm mb-2'  >Email Address</label>
            {formik.errors.email?<p className='text-rose-500 font-bold text-sm text-right'>{formik.errors.email}</p> :null}
            </article>
           
            <input type='email' className={`w-full border rounded-lg py-3 px-4 mb-4 outline-none focus:border-slate-700 ${formik.errors.email &&  "bg-rose-100 border-rose-400 focus:border-rose-500"}`
          }
              placeholder='email@company.com' id='email' name='email' value={formik.values.email}
              onChange={formik.handleChange} />
            <button className="text-white py-3 px-4 w-full font-bold hover:bg-gradient-to-r hover:from-pink-800 hover:to-orange-400
        rounded-lg"
              type='submit'
              style={{ backgroundColor: "hsl(234,29%,20%)" }}
              onClick={formik.handleSubmit}
            >Subscribe to monthly newsletter</button>
          </form>
        </div>
      </section>
    </div>
      
      }
      {success && <Success
      setSuccess={setSuccess}
      email= { formik.values.email}
    
      />}

    </>

  )
}
