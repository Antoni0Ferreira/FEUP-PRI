import { AiFillInstagram } from 'react-icons/ai';
import { FaLinkedinIn } from 'react-icons/fa';
import { BsYoutube, BsFacebook } from 'react-icons/bs';
import { HiOutlineLocationMarker, HiOutlineClock } from 'react-icons/hi';
import { TbPhoneCall } from 'react-icons/tb';
import Image from 'next/image';

export default function Footer() {
    return (
      <>
        <div className = "footer"> 
            <div className = "grid-container lg:grid-cols-4 md:grid-cols-3 sd:grid-cols-1">
                <div className='lg:block lg:pl-16 md:hidden '>
                    {/* <Image src = {aefep_logo} alt = "logo" className = "logo lg:block lg:w-16 md:hidden md:mt-2 md:mb-2 sm:inline sm:mt-2 sm:mb-2 sm:content-center w-20 inline content-center"/> */}
                    <div className = "lg:flex mt-2 hidden">
                        <a href="https://www.facebook.com/AEFEP" target="_blank" rel="noreferrer">
                            <BsFacebook className='icon' size={24}/>
                        </a>
                        <a href="https://www.instagram.com/aefep/" target="_blank" rel="noreferrer">
                            <AiFillInstagram className='icon' size={27}/> 
                        </a>
                        <a href="https://www.linkedin.com/company/aefep---associa-o-de-estudantes-da-fep/" target="_blank" rel="noreferrer">
                            <FaLinkedinIn className='icon' size={25}/>
                        </a>
                        <a href="https://www.youtube.com/@AEFEP" target="_blank" rel="noreferrer">
                            <BsYoutube className='icon' size={27}/>
                        </a>                                  
                    </div>
                </div>
                <div className='text-container lg:text-s md:pb-0 pb-1 pt-1'>
                    <p>Onde estamos <HiOutlineLocationMarker className='inline'/></p>
                    <div className='secondary-text'>
                        <p>Edificio Principal da FEP</p>
                        <p>Sala 145</p>
                    </div>
                </div>
                <div className='text-container lg:text-s md:pb-0 pb-1 pt-1'>
                    <p>Horário <HiOutlineClock className='inline'/></p>
                    <div className='secondary-text'>
                        <p>Dias Úteis</p>
                        <p>10:00 - 17:00</p>
                    </div>
                </div>
                <div className='text-container lg:text-s md:pb-0 pb-1 pt-1'>
                        <p>Contactos <TbPhoneCall className='inline'/></p> 
                    <div className='secondary-text'>
                        <p>+351 220 426 152</p>
                        <p>geral@aefep.pt</p>
                    </div>
                </div>
                <div></div>
                <div className = "lg:hidden flex place-content-center mt-5 pl-2 ">
                    <a href="https://www.facebook.com/AEFEP" target="_blank" rel="noreferrer">
                        <BsFacebook className='icon' size={27}/>
                    </a>
                    <a href="https://www.instagram.com/aefep/" target="_blank" rel="noreferrer">
                        <AiFillInstagram className='icon' size={30}/> 
                    </a>
                    <a href="https://www.linkedin.com/company/aefep---associa-o-de-estudantes-da-fep/" target="_blank" rel="noreferrer">
                        <FaLinkedinIn className='icon' size={28}/>
                    </a>
                    <a href="https://www.youtube.com/@AEFEP" target="_blank" rel="noreferrer">
                        <BsYoutube className='icon' size={30}/>
                    </a>                                  
                </div>
            </div>
        </div>
        <div />
      </>
  );
}