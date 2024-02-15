
'use client'
import DefaultLayout from "@/layouts/DefaultLayout";
import fetchApi from "@/utils/fetchApi";
import { faAddressCard, faCalendar, faEnvelope, faEye, faEyeSlash, faHeart, faImage, } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Avatar, Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Tab, Tabs, useDisclosure } from "@nextui-org/react";
import moment from "moment";
import { useEffect, useState } from "react";
import { Events } from "./events";
import { Post } from "./post";
import { faUserEdit, faUserMinus, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { useSession } from "next-auth/react";
import { Alert } from "@/components/alert";
import ImageUploading from 'react-images-uploading';

export default function Profile({ params }: any) {
  const { email } = params
  const { data: session } = useSession()
  const [user, setUser] = useState<any>({})
  const [follow, setFollow] = useState(false)

  const [isOpenPassword, setIsOpenPassword] = useState(false);
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [birth_date, setBirthDate] = useState('');
  const [isOpenAlert, setIsOpenAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [images, setImages] = useState([]);
  const onChange = (imageList: any, addUpdateIndex: any) => {
    setImages(imageList);
  };
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  useEffect(() => {
    fetchApi(`/profile/${email}`, 'GET').then((res) => {
      setFollow(!res.data.followers.find((follower: any) => follower.followerId === session?.user.id as any || 0))
      setName(res.data.name)
      setBirthDate(new Date(res.data.birthday).toISOString().split('T')[0])
      setImages([{ data_url: res.data.image_profile }])
      
      setUser(res.data)
    })
  }, [email,session?.user])
  const handleFollow = async () => {
    const res = await fetchApi(`/profile/${email}/follow`, 'POST')
    setFollow(!follow)
  }
  const handleEditProfile = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData()
    if(images.length < 1) return
    formData.append('name', name)
    formData.append('image', images[0]?.file as any)
    formData.append('password', password)
    formData.append('birthday', birth_date)
    await fetch('/api/profile/update', {
      method: 'POST',
      body:formData
    })
    window.location.reload()
  }
  return (
    <DefaultLayout>
      <div style={{
        backgroundImage: `url(${user?.image_banner || 'https://apod.nasa.gov/apod/image/2402/sts98plume_nasa_1111.jpg'})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }} className="h-96 rounded-lg shadow flex justify-between items-end py-5 px-10">
        <div className="flex ">

          <Avatar src={user?.image_profile &&user.image_profile.startsWith('http') ? user.image_profile : process.env.NEXT_PUBLIC_BASE_URL+'/assets/images/'+user.image_profile} className="w-20 h-20 text-large" radius="md" />
          <div className="flex flex-col gap-2 ml-3 justify-center mb-4">
            <h1 className="text-3xl font-bold text-white uppercase">{user?.name}</h1>
            <p className="text-white">{user?.email}</p>
            <p className="text-bold px-3 py-1 rounded-full bg-gray-200"> {moment(user.birthday).format('dddd,D MMMM YYYY')} </p>
          </div>
        </div>
        <div>
          {user.id !== session?.user.id ? (
          <Button variant={follow?'solid':'faded' } color="danger" onClick={handleFollow}  >
          {follow ? (
          <>
              <FontAwesomeIcon icon={faUserPlus} className="mr-2" />
            Follow
          </>
            ) : (
                <>
                  <FontAwesomeIcon icon={faUserMinus} className="mr-2" />
                  Unfollow
                </>
            )}
          </Button>):(
              <>
                <Button variant='solid' className="text-gray-800" onPress={onOpen} color="warning"   >
                  <FontAwesomeIcon icon={faUserEdit} className="mr-2" />
                  Edit Profile
                </Button>
          </>
          )}

        </div>
      </div>
      <div className="mt-5">
        <Tabs aria-label="Options" color="danger" >
          <Tab
            key="photos"
            title={
              <div className="flex items-center space-x-2">
                <FontAwesomeIcon icon={faCalendar} />
                <span>My Events</span>
              </div>
            }
          >
            <Events email={email} />
          </Tab>
          <Tab
            key="music"
            title={
              <div className="flex items-center space-x-2 ">
                <FontAwesomeIcon icon={faHeart} />
                <span>Liked Post</span>
              </div>
            }
          >
            <Post email={email} />
          </Tab>

        </Tabs>
      </div>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="top-center"
      >
        <ModalContent>
          {(onClose) => (
            <form onSubmit={handleEditProfile}>
              <>
                <ModalHeader className={`flex flex-col gap-1`}>
                  Edit Your Profile
                </ModalHeader>
                <ModalBody>
                  {isOpenAlert &&
                    <Alert message={alertMessage} status={'error'} isOpen={isOpenAlert} setOpen={(isopen) => setIsOpenAlert(!isOpenAlert)} />
                  }
                  <label htmlFor="">Profile</label>
                  <ImageUploading
                    value={images}
                    onChange={onChange}
                    maxNumber={1}
                    dataURLKey="data_url"
                  >
                    {({
                      imageList,
                      onImageUpload,
                      onImageUpdate,
                      onImageRemove,
                      isDragging,
                      dragProps,
                    }) => (
                      <div className="upload__image-wrapper bg-gray-200   text-gray-700  flex flex-col items-center pt-5 rounded-md  justify-center min-h-[14rem] w-full"
                        style={{
                          backgroundImage: `url(${imageList[0]?.data_url})`,
                          backgroundSize: "cover",
                          backgroundPosition: "center center",
                          backgroundRepeat: "no-repeat",
                        }}>

                        {imageList.length == 0 && (<button
                          style={isDragging ? { color: 'red' } : undefined}
                          onClick={onImageUpload}
                          {...dragProps}
                        >

                          <FontAwesomeIcon icon={faImage} size="5x" />
                          <p>Click or Drop here</p>
                        </button>) || (
                            <div className="flex gap-5">
                              <Button variant="flat" onPress={() => onImageUpdate(0)}> Update</Button>
                              <Button variant="flat" onPress={() => onImageRemove(0)}> Remove</Button>

                            </div>
                          )}
                      </div>
                    )}
                  </ImageUploading>
                  <Input
                    autoFocus
                    endContent={
                      <FontAwesomeIcon icon={faAddressCard} />
                    }
                    label="Name"
                    placeholder="Enter your name"
                    variant="bordered"
                    name="name"
                    value={name}
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
                    defaultValue={birth_date}
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
    </DefaultLayout>
  );
}
