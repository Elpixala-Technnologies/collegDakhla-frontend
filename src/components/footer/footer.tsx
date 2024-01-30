import Link from "next/link";
import Image from "next/image";
import { MdEmail } from "react-icons/md";
import { FaFacebook, FaInstagram, FaLinkedin, FaLocationDot, FaPhone, FaTwitter } from "react-icons/fa6";

export default function Footer() {
	return (
		<>
			<div className="bg-gray-900 p-4">
				<div className="h-90 max-w-screen-2xl max-sm:justify-between mx-auto">
					<div className="footer-top flex gap-4 justify-between flex-wrap max-sm:flex-col mt-5 text-white">
						<div className=" justify-center">
							<div className="logo pl-[25px]">
								<Link href="/">
									<Image
										src="/logo.png"
										width={100}
										height={100}
										alt="Picture of the author"
									/>
								</Link>
							</div>
							<div className="address flex items-center my-2">
								<FaLocationDot />
								<span className="ml-2">First Floor, Plot No. 2, Niti Khand 1, Near Mangal Chowk, <br />Indrapuram. Ghaziabad (UP) 201014</span>
							</div>
							<div className="email flex items-center my-2">
								<MdEmail />
								<span className="ml-2">director@collegedakhla.com</span>
							</div>
							<div className="contact flex items-center my-2">
								<FaPhone />
								<span className="ml-2">+919899880100</span>
							</div>
						</div>
						<div className=" text-white quick-links text-left">
							<h1 className="text-2xl font-semibold">Quick Links</h1>
							<ul className="mt-2">
								<li>
									<Link href="/">MBBS</Link>
								</li>
								<li>
									<Link href="/">B.Tech</Link>
								</li>
								<li>
									<Link href="/">BCA</Link>
								</li>
								<li>
									<Link href="/">Enquiry</Link>
								</li>
							</ul>
						</div>
						<div className=" text-white helpful-links">
							<h1 className="text-2xl font-semibold">Helpful Links</h1>
							<ul className="mt-2">
								<li>
									<Link href="/">Terms of Service</Link>
								</li>
								<li>
									<Link href="/">Privacy Policy</Link>
								</li>
								<li>
									<Link href="/">Cookie Policy</Link>
								</li>
								<li>
									<Link href="/">Contact Us</Link>
								</li>
							</ul>
						</div>
						<div className=" text-white page">
							<h1 className="text-2xl font-semibold">Page</h1>
							<ul className="mt-2">
								<li>
									<Link href="/">About Us</Link>
								</li>
								<li>
									<Link href="/">Careers</Link>
								</li>
								<li>
									<Link href="/">News & Article</Link>
								</li>
								<li>
									<Link href="/">Legal Notice</Link>
								</li>
							</ul>
						</div>
					</div>
					<div className="footer-middle border md:my-10 my-5"></div>
					<div className="footer-bottom flex flex-wrap justify-between text-white md:text-sm max-md:flex-col gap-4 text-sm ">
						<div className="social-icons flex items-center gap-3 md:gap-4 text-xl">
							<span>
								<Link href="/"><FaInstagram /></Link>
							</span>
							<span>
								<Link href="/"><FaFacebook /></Link>
							</span>
							<span>
								<Link href="/"><FaTwitter /></Link>
							</span>
							<span>
								<Link href="/"><FaLinkedin /></Link>
							</span>
						</div>
						<div className="bottom-links">
							<ul className="list-none flex max-sm:flex-col flex-wrap gap-4 max-sm:gap-0">
								<li>
									<Link href="/">Terms of Service</Link>
								</li>
								<li className="">
									<Link href="/">Privacy Policy</Link>
								</li>
								<li className="">
									<Link href="/">Cookie Policy</Link>
								</li>
								<li className="">
									<Link href="/">Contact Us</Link>
								</li>
							</ul>
						</div>
						<div className="copyright">
							<span>Copyright © 2022 College Dakhla, All rights reserved.</span>
						</div>
					</div>
				</div>

			</div >
		</>
	)
}