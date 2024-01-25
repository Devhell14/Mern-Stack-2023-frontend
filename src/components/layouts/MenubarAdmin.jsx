import { Link } from "react-router-dom"

const MenubarAdmin = () => {
  return (
    <nav>
      <ul className="nav flex-column">
        <li className="nav-item">
          <Link to="/admin/index">Dashboard</Link>
        </li>
        <li className="nav-item">
          <Link to="/admin/manage-admin">Manage Users</Link>
        </li>
      </ul>
    </nav>
  )
}

export default MenubarAdmin