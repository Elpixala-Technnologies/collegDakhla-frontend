import Link from "next/link";
import Image from "next/image";
import { MdEmail } from "react-icons/md";
import { FaFacebook, FaInstagram, FaLinkedin, FaLocationDot, FaPhone, FaTwitter } from "react-icons/fa6";

export default function Footer() {
	return (
		<>
			<div className="bg-white relative">
				<div className="h-80 max-w-screen-2xl max-sm:justify-between mx-10 py-5">
					<div className="footer-top flex items-center mt-5">
						<div className="basis-1/2">
							<div className="logo flex-none w-2">
								<Link href="/">
									<Image src={"/college-dakhla-logo.png"} alt="" width={64} height={64} />
								</Link>
							</div>
							<div className="address flex items-center my-2">
								<FaLocationDot />
								<span className="text-primary ml-2">First Floor, Plot No. 2, Niti Khand 1, Near Mangal Chowk, <br />Indrapuram. Ghaziabad (UP) 201014</span>
							</div>
							<div className="email flex items-center my-2">
								<MdEmail />
								<span className="text-primary ml-2">director@collegedakhla.com</span>
							</div>
							<div className="contact flex items-center my-2">
								<FaPhone />
								<span className="text-primary ml-2">+919899880100</span>
							</div>
						</div>
						<div className="basis-1/4 text-primary quick-links">
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
						<div className="basis-1/4 text-primary helpful-links">
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
						<div className="basis-1/4 text-primary page">
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
					<div className="footer-middle border my-10">

					</div>
					<div className="footer-bottom">
						<div className="flex items-center">
							<div className="basis-1/2 text-primary text-sm">
								<div>
									<span>Copyright © 2022 College Dakhla, All rights reserved.</span>
								</div>
								<div className="mt-2">
									<ul className="list-none flex space-x-4 text-sm">
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
							</div>
							<div className="social basis-1/3">
								<div className="social-icons flex items-center space-x-5 justify-end">
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
							</div>
						</div>
					</div>
				</div>

			</div >
		</>
	)
}