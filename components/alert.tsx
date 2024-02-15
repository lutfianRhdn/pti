'use client '
import { faCircleXmark } from "@fortawesome/free-regular-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState } from "react"

type AlertProps = {
  message: string,
  status: 'success' | 'error' | 'warning' | 'info'
  setOpen: (isOpen: boolean) => void
  isOpen: boolean
}
export const Alert = ({ message, status,setOpen ,isOpen}: AlertProps) => {
  return (
    <div className={`${
      status === 'success' && 'bg-green-500'
    } ${
      status === 'error' && 'bg-red-500'
    } ${
      status === 'warning' && 'bg-yellow-500'
    } ${
      status === 'info' && 'bg-blue-500'
    } text-white text-small p-3 rounded-md flex justify-between items-center`}>
      {message}
      <FontAwesomeIcon icon={faCircleXmark} onClick={() => setOpen(!isOpen)} />
    </div>
  )
}