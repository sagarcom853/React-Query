import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import './App.css'
import { fetchPosts } from './API/api'
import Postlist from './Components/Postlist'

function App() {

  // useQuery to fetch the data
  // const { data, isLoading, isError, error, status } = useQuery({
  //   queryKey: ['posts'],
  //   queryFn: fetchPosts
  // })
  // console.log('data', data, 'status', status)
  
  return (
    <div>
      <h2 className='header'>Welcome to React Query: Posts</h2>
      <Postlist/>
    </div>
  )
}

export default App
