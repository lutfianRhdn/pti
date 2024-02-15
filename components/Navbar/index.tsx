'use client'
import React, { useEffect, useState } from "react";
import { Audiowide } from "next/font/google";
import { Navbar as Nav, NavbarBrand, NavbarContent, NavbarItem, Link, Button } from "@nextui-org/react";

import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, Checkbox, Input } from "@nextui-org/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAddressCard, faArrowAltCircleRight, faCalendar, faEnvelope, faEye, faEyeSlash, faSquareCaretRight, faUser } from "@fortawesome/free-regular-svg-icons";
import fetchApi from "@/utils/fetchApi";
import { Alert } from "../alert";
import { useRouter } from "next/navigation";
import { signIn, signOut, useSession } from "next-auth/react";

const audiowide = Audiowide({
	subsets: ['latin-ext'],
	weight: "400"
})
export const Navbar = () => {
	const { isOpen:isOpenRegister, onOpen:onOpenRegister, onOpenChange:onOpenChangeRegister } = useDisclosure();
	const { isOpen: isOpenLogin, onOpen: onOpenLogin, onOpenChange: onOpenChangeLogin } = useDisclosure();

	const {data:session} = useSession();
	const [isOpenPassword, setIsOpenPassword] =useState(false);
	const [name, setName] =useState('');
	const [email, setEmail] =useState('');
	const [password, setPassword] =useState('');
	const [birth_date, setBirthDate] =useState('');
	const [isOpenAlert, setIsOpenAlert] =useState(false);
	const [alertMessage, setAlertMessage] = useState('');
	const router = useRouter();



	const handleRegister= async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const registered = await fetchApi('/auth/register', 'POST', {
			name, email, password, birth_date
		})
		if (!registered?.data) {
			setIsOpenAlert(true)
			setAlertMessage(registered?.message)
		return 
		}
		const isSignedIn = await signIn("credentials", {
			email,
			password,
			redirect: false,
		});
		if (!isSignedIn?.ok) {
			setAlertMessage(isSignedIn?.error || 'An error occurred while trying to sign in');
		}
		router.push('/nassa')
	}
	const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const isSignedIn = await signIn("credentials", {
			email,
			password,
			redirect: false,
		});
		if (!isSignedIn?.ok) {
			setAlertMessage(isSignedIn?.error || 'An error occurred while trying to sign in');
		}
		router.refresh()
	}
	const handleLogout = async () => {
		
		const isLogout = await signOut();
		if (!isLogout) {
			setAlertMessage('An error occurred while trying to sign out');
		}
		router.refresh()	
	}
	return (
		<>
			<Nav shouldHideOnScroll isBlurred={true} className="bg-transparent text-white "
			>
				<NavbarBrand>
					<p className={`font-bold text-inherit ${audiowide.className} text-2xl`}>SpaceVista</p>
				</NavbarBrand>
				<NavbarContent justify="start">
					<NavbarItem>
						<Link className=" text-white  font-semibold" href="/home">Home</Link>
					</NavbarItem>
					<NavbarItem>
						<Link className=" text-white  font-semibold" href="/post/today">Today Post</Link>
					</NavbarItem>
				</NavbarContent>
				<NavbarContent justify="end">
					{!session?.user && (
						<>
						<NavbarItem>
						<Button onPress={onOpenRegister} color="danger"  variant="flat">
							Register
						</Button>
					</NavbarItem>
					<NavbarItem className="hidden lg:flex">
						<Button onPress={onOpenLogin} color="danger"  variant="bordered">Login</Button>
					</NavbarItem>
						</>
					) || (
						<>
							<NavbarItem>
								<Button  color="danger"  variant="flat" as={Link} href={`/profile/${session?.user?.email ||''}`}>
									<FontAwesomeIcon icon={faUser} />
									Profile
								</Button>
							</NavbarItem>
							<NavbarItem>
							<Button onPress={handleLogout} color="danger" variant="bordered">
								Logout
							</Button>
							</NavbarItem>
						</>
								)}
				</NavbarContent>
			</Nav>
			{/* register */}
			<Modal
				isOpen={isOpenRegister}
				onOpenChange={onOpenChangeRegister}
				placement="top-center"
			>
				<ModalContent>
					{(onClose) => (
						<form onSubmit={handleRegister}>
							<>
								<ModalHeader className={`flex flex-col gap-1`}>
									Register Your Account
									<span className="text-small font-thin">Follow the instructions to make it easier to register and you will be able to explore inside.</span>
								</ModalHeader>
								<ModalBody>
									{isOpenAlert &&
										<Alert message={alertMessage} status={'error'} isOpen={isOpenAlert} setOpen={(isopen) => setIsOpenAlert(!isOpenAlert)}/>
									}
									<Input
										autoFocus
										endContent={
											<FontAwesomeIcon icon={faEnvelope} />
										}
										label="Email"
										placeholder="Enter your email"
										variant="bordered"
										type="email"
										name="email"
										onChange={(e) => setEmail(e.target.value)}
									/>
									<Input
										autoFocus
										endContent={
											<FontAwesomeIcon icon={faAddressCard} />
										}
										label="Name"
										placeholder="Enter your name"
										variant="bordered"
										name="name"
										onChange={(e) => setName(e.target.value)}
									/>
									<Input
										autoFocus
										endContent={
											<FontAwesomeIcon icon={faCalendar} />
										}
										label="birthdate"
										placeholder="Enter your birth date"
										variant="bordered"
										type="date"
										name="birth_date"
										onChange={(e) => setBirthDate(e.target.value)}
									/>
									<Input
										endContent={
											isOpenPassword ? <FontAwesomeIcon icon={faEyeSlash} onClick={() => setIsOpenPassword(!isOpenPassword)} /> :
												<FontAwesomeIcon icon={faEye} onClick={() => setIsOpenPassword(!isOpenPassword)} />
										}
										label="Password"
										placeholder="Enter your password"
										type={isOpenPassword ? 'text' : 'password'}
										variant="bordered"
										name="password"
										onChange={(e) => setPassword(e.target.value)}
									/>

								</ModalBody>
								<ModalFooter>
									<Button color="danger" variant="flat" onPress={onClose}>
										Close
									</Button>
									<Button color="primary" type="submit">
										Register
									</Button>
								</ModalFooter>
							</>
						</form>

					)}
				</ModalContent>
			</Modal>
			{/* login */}
			<Modal
				isOpen={isOpenLogin}
				onOpenChange={onOpenChangeLogin}
				placement="top-center"
			>
				{/* login */}
				<ModalContent>
					{(onClose) => (
						<form onSubmit={handleLogin}>
							<>
								<ModalHeader className={`flex flex-col gap-1`}>
									Login to Your Account
									<span className="text-small font-thin">Enter to continue and explore within your grasp.</span>
								</ModalHeader>
								<ModalBody>
									{isOpenAlert &&
										<Alert message={alertMessage} status={'error'} isOpen={isOpenAlert} setOpen={(isopen) => setIsOpenAlert(!isOpenAlert)} />
									}
									<Input
										autoFocus
										endContent={
											<FontAwesomeIcon icon={faEnvelope} />
										}
										label="Email"
										placeholder="Enter your email"
										variant="bordered"
										type="email"
										name="email"
										onChange={(e) => setEmail(e.target.value)}
									/>
									<Input
										endContent={
											isOpenPassword ? <FontAwesomeIcon icon={faEyeSlash} onClick={() => setIsOpenPassword(!isOpenPassword)} /> :
												<FontAwesomeIcon icon={faEye} onClick={() => setIsOpenPassword(!isOpenPassword)} />
										}
										label="Password"
										placeholder="Enter your password"
										type={isOpenPassword ? 'text' : 'password'}
										variant="bordered"
										name="password"
										onChange={(e) => setPassword(e.target.value)}
									/>

								</ModalBody>
								<ModalFooter>
									<Button color="danger" variant="flat" onPress={onClose}>
										Close
									</Button>
									<Button color="primary" type="submit">
										Login
									</Button>
								</ModalFooter>
							</>
						</form>

					)}
				</ModalContent>
			</Modal>
			
		</>
	);
}