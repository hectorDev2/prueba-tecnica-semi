/* eslint-disable @typescript-eslint/indent */
import React, { useEffect, useMemo, useRef, useState } from 'react'
import './App.css'
import { Table } from './components/Table'
import type { User } from './interfaces'

function App () {
  const [users, setUsers] = useState([])
  const [showColor, setShowColor] = useState(false)
  const [searchQuery, setSearchQuery] = useState<string | null>(null)
  const usersOriginal = useRef([])

  const toogleColor = () => {
    setShowColor(!showColor)
  }

  const handleReset = () => {
    setUsers(usersOriginal.current)
  }

  useEffect(() => {
    fetch('https://randomuser.me/api/?results=100')
      .then(async res => {
        const data = await res.json()
        setUsers(data.results)
        usersOriginal.current = data.results
      })
      .catch((err: any) => {
        console.error(err)
      })
  }, [])

  const filteredUsers = useMemo(() => {
    return searchQuery != null && searchQuery.length > 0
      ? users.filter((user: User) => {
          return user.location.country
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
        })
      : users
  }, [users, searchQuery])

  const sortedUsers = useMemo(() => {
    return filteredUsers
  }, [filteredUsers])

  const handleDeleteUser = (email: string) => {
    console.log('delete')
    const newUsers = [...users].filter((user: User) => user.email !== email)
    setUsers(newUsers)
  }

  return (
    <div className='App'>
      <div className='container-header'>
        <h1>Prueba tecnica</h1>
        <button onClick={toogleColor}>change color</button>
        <button onClick={handleReset}>reset data</button>
        <input
          onChange={e => {
            setSearchQuery(e.target.value)
          }}
          placeholder='Search by country'
        />
      </div>

      <Table
        handleDeleteUser={handleDeleteUser}
        showColor={showColor}
        users={sortedUsers}
      />
    </div>
  )
}

export default App
