import React from "react";
import Image from "next/image";

const Topbar: React.FC = () => {
	return (
		<nav className='relative flex h-[50px] w-full shrink-0 items-center px-5 bg-dark-layer-1 text-dark-gray-7'>
			<div className="flex w-full items-center justify-between max-w-[1200px] mx-auto">

			<a
				href='https://www.tnp.dtu.ac.in/'
				target='_blank'
				rel='noreferrer'
				className='flex items-center gap-2 flex-1'
			>
				<img src='/dtu-logo.png' alt='DTU Logo' style={{ height: '35px', width: '35px' }} />
				
				<span className='hidden font-bold text-xl text-white md:inline'>
					Training and Placements, DTU
				</span>
				
				<span className='font-bold text-xl text-white md:hidden'>
					T&P
				</span>
			</a>
		
				<div className='flex items-center space-x-4 flex-1 justify-end'>
					<a
						href='https://www.tnp.dtu.ac.in/contact.html'
						target='_blank'
						rel='noreferrer'
						className='bg-dark-fill-3 py-1.5 px-3 cursor-pointer rounded text-brand-orange hover:bg-dark-fill-2 whitespace-nowrap'
					>
						Contact Us
					</a>
					
					<a
						href='https://www.tnp.dtu.ac.in/'
						target='_blank'
						rel='noreferrer'
						className='bg-dark-fill-3 py-1.5 px-3 cursor-pointer rounded hover:bg-dark-fill-2 whitespace-nowrap'
					>
						Website
					</a>
				</div>
				
			
			</div>
		</nav>
	);
};
export default Topbar;
