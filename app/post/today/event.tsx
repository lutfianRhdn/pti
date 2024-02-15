/* eslint-disable @next/next/no-img-element */
import { CardPost } from "@/components/Card/post"
import { title } from "@/components/primitives"
import { Button } from "@nextui-org/button"
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Textarea, useDisclosure } from "@nextui-org/react"
import ImageUploading from 'react-images-uploading';
import { useState } from "react"
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-regular-svg-icons";
import fetchApi from "@/utils/fetchApi";
type EventTabsProps = {
  events: any[]
  post_id:string
}

export const EventsTabs = ({ events,post_id }: EventTabsProps) => {
  
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [caption, setCaption] = useState('')
  const [images, setImages] = useState([]);
  const [eventId, setEventId] = useState(0)
  // const [modalHeader, setModalHeader] = useState('Post Your Event')
  const [behaviorModal, setBehaviorModal] = useState('post')
  const maxNumber = 1;
  const handleSubmitPost = async (e: any) => {
    e.preventDefault()
    if(images.length < maxNumber) return
    const formData = new FormData()
    formData.append('caption', caption)
    formData.append('image', images[0]?.file as any)
    formData.append('post_id', post_id)

    const res = await fetch('/api/events', {
      method: 'POST',
      body: formData
    })
    if (res.ok) {
      onOpenChange()
      window.location.reload()
    }  
  }
  const handleSubmitUpdate = async (e:any) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('caption', caption)
    formData.append('image', images[0]?.file as any)

    const res = await fetch('/api/events/'+eventId, {
      method: 'PUT',
      body: formData
    })
    if (res.ok) {
      onOpenChange()
      window.location.reload()
    }
  }
  const handleDelete = async (id: number) => {
    const res = await fetchApi(`/events`, 'DELETE', { id })
    if (res.ok) window.location.reload()
    
  }
  const handlePopUpEdit = async (e:any,id: number) => {
    setBehaviorModal('edit')
    const event = events.find((event) => event.id === id)
    setCaption(event.caption)
    setEventId(event.id)
    setImages([{ data_url: `${process.env.NEXT_PUBLIC_BASE_URL}/assets/images/${event.image}` }])
    onOpenChange()
  }
  const handlePopUpPost = () => {
    setBehaviorModal('post')
    setCaption('')
    setImages([])
    onOpenChange()
  }
  const onChange = (imageList:any, addUpdateIndex:any) => {
    setImages(imageList);
  };
  return (
    <>
      <div className="flex items-center gap-10 mb-10 w-full justify-between">
        <h1 className={title({ size: 'sm' })}> Events </h1>
        <Button size="sm" variant="ghost" color="primary" onPress={handlePopUpPost} className="text-xl">Create Event</Button>
      </div>
      <div className="grid gap-10 grid-cols-3">
        {events.map((event: any) => (
          <CardPost
            type='event'
            date={event.created_at}
            author_image={event.author.image_profile}
            author_name={event.author.name}
            author_id={event.authorId}
            id={event.id}
            key={event.id}
            image={event.image}
            name={event.author.name}
            handlePopUpEdit={handlePopUpEdit}
            caption={event.caption}
            handleDelete={handleDelete} 
            like_count={event?.likes.length ||0}
            comment_count={event?.likes.comment || 0}
            author_email={event.author.email}
          />
          ))}
      </div>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="top-center"
      >
        {/* login */}
        <ModalContent>
          {(onClose) => (
            <form onSubmit={behaviorModal =='post' ?handleSubmitPost:handleSubmitUpdate}>
              <>
                <ModalHeader className={`flex flex-col gap-1`}>
                  {behaviorModal == 'post' ? 'Post Your Event' : 'Edit Your Event'}
                </ModalHeader>
                <ModalBody>
                  <ImageUploading
                    value={images}
                    onChange={onChange}
                    maxNumber={maxNumber}
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
                  <Textarea
                    label="Caption"
                    variant="bordered"
                    placeholder="Enter your caption"
                    disableAnimation
                    disableAutosize
                    classNames={{
                      input: "resize-y min-h-[40px]",
                    }}
                    value={caption}
                    onChange={(e) => setCaption(e.target.value)}
                  />
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="flat" onPress={onClose}>
                    Close
                  </Button>
                  <Button color={behaviorModal == 'post' ? 'primary' : 'warning'} type="submit">
                    {behaviorModal == 'post' ?'Post':'Update'}
                  </Button>
                </ModalFooter>
              </>
            </form>

          )}
        </ModalContent>
      </Modal>
    </>
  )
}