"use client"

import Image from 'next/image'
import { Landing } from './components/Landing'
import { useEffect, useState } from 'react'
import {myAxios} from '../app/axiosConfig'
import { Dashboard } from './components/Dashboard'


export default function Home() {

  
  return (

      <Landing></Landing>

  )
}
