import type { User } from '../interfaces'

interface Props {
  users: User[]
  showColor: boolean
  handleDeleteUser: (email: string) => void
}

export const Table = ({ users, showColor, handleDeleteUser }: Props) => {
  //table , thead, tbody,
  //tr, th, td

  const deleteUser = (email: string) => {
    handleDeleteUser(email)
  }

  const getStyles = (index: number) => {
    const style = {
      backgroundColor: showColor ? '#088395' : 'gray'
    }
    if (index % 2 === 0) {
      return {
        ...style,
        backgroundColor: showColor ? '#0A4D68' : 'lightgray'
      }
    }
    return style
  }

  return (
    <div>
      <h2>Users</h2>
      <table width='100%'>
        <thead>
          <tr>
            <th>Photo</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Country</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr style={getStyles(index)} key={user.email}>
              <td>
                <img
                  src={user.picture.thumbnail}
                  alt={`${user.name.first} - ${user.name.first}`}
                />
              </td>
              <td>{user.name.first}</td>
              <td>{user.name.last}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td>{user.location.country}</td>
              <td>
                <button
                  onClick={() => {
                    deleteUser(user.email)
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
