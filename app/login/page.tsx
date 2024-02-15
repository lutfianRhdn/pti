'use client'
import { useState } from "react";
import { signIn, useSession } from "next-auth/react";
import AuthenticationLayout from "@/layouts/AuthenticationLayout";
import { subtitle, title } from "@/components/primitives";
import { Alert } from "@/components/alert";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isOpenPassword, setIsOpenPassword] = useState(false);
  const [isOpenAlert, setIsOpenAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const isSignedIn = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    if (!isSignedIn?.ok) {
      setError(isSignedIn?.error || '');
    }
  };

  return (
    <>
      <AuthenticationLayout>
        <section className="flex items-center justify-center flex-col h-[90vh]">
          <div className=" bg-gray-2 bg-slate-100 px-20 py-9 rounded-md ">

            <div className="">
              <h1 className={title({ size: 'md', className: "" })}>Login to your Account</h1>
              <h2 className={subtitle()}>Enter to continue and explore within your grasp</h2>
            </div>
            <form action="" className="flex flex-col gap-5">
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
              <div className="d-flex items-end justify-end ">
              <Button onClick={handleSubmit} type="submit" variant="flat" color="primary">Login</Button>
              </div>
            </form>
          </div>

        </section>
      </AuthenticationLayout>
    </>
  )
}