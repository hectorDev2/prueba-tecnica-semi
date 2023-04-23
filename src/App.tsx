import React, { useEffect, useMemo, useRef, useState } from 'react'
import './App.css'
import { Table } from './components/Table'
import { SortBy, type User } from './interfaces'

function App () {
  const [users, setUsers] = useState([])
  const [showColor, setShowColor] = useState(false)
  const [searchQuery, setSearchQuery] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [sorting, setSorting] = useState<SortBy>(SortBy.NONE)
  const usersOriginal = useRef([])

  const handleChangeSort = (sort: SortBy) => {
    setSorting(sort)
  }

  const toogleColor = () => {
    setShowColor(!showColor)
  }

  const handleReset = () => {
    setUsers(usersOriginal.current)
  }

  const fetchUsers = async (page: number) => {
    return await fetch(
      `https://randomuser.me/api/?results=10&page=${page}&seed=abc`
    )
      .then(async res => {
        if (!res.ok) throw new Error('Error to fetch data')
        return await res.json()
      })
      .then(res => res.results)
  }

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
    if (sorting === SortBy.NONE) return filteredUsers
    const compareProperties: Record<string, (user: User) => any> = {
      [SortBy.COUNTRY]: user => user.location.country,
      [SortBy.NAME]: user => user.name.first,
      [SortBy.LAST]: user => user.name.last
    }

    return filteredUsers.toSorted((a, b) => {
      const extractProperty = compareProperties[sorting]
      return extractProperty(a).localeCompare(extractProperty(b))
    })
  }, [filteredUsers, sorting])

  const handleDeleteUser = (value: string) => {
    console.log('delete')
    const newUsers = users.filter((user: User) => user.email !== value)
    setUsers(newUsers)
  }

  useEffect(() => {
    setLoading(true)
    fetchUsers(currentPage)
      .then(users => {
        setUsers(prevUsers => prevUsers.concat(users))
        usersOriginal.current = users
      })
      .catch((err: any) => {
        console.error(err)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [currentPage])

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
      {users.length > 0 && (
        <Table
          handleDeleteUser={handleDeleteUser}
          showColor={showColor}
          users={sortedUsers}
          changeSorting={handleChangeSort}
        />
      )}
      {loading && <div>Loading...</div>}

      {!loading && (
        <button
          onClick={() => {
            setCurrentPage(currentPage + 1)
          }}
        >
          10 mas
        </button>
      )}
    </div>
  )
}

export default App
