import { useContext } from 'react'
import UserContext from 'context/User/context'
import Link from 'next/link'
import { FaHome } from 'react-icons/fa'
import Avatar from 'components/Avatar'
import resetList from 'styles/resetList'

const Menu = () => {
  const { user } = useContext(UserContext)

  return (
    <>
      <nav>
        <ul className="menu">
          <li className={user ? 'menu__item' : 'menu__item menu__item--left'}>
            <Link href="/">
              <a className="menu__link">
                <FaHome />
                Home
              </a>
            </Link>
          </li>
          {user ? (
            <>
              <li className="menu__item menu__item--left">
                <Link href="/snippets">
                  <a className="menu__link">Snippets</a>
                </Link>
              </li>
              <Avatar />
            </>
          ) : (
            <>
              <li className="menu__item">
                <Link href="/login">
                  <a className="menu__link">Login</a>
                </Link>
              </li>
              <li className="menu__item">
                <Link href="/register">
                  <a className="menu__link">Register</a>
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
      <style jsx>{resetList}</style>
      <style jsx>{`
        .menu {
          display: flex;
          justify-content: flex-end;
          gap: 1rem;
          font-weight: 600;
        }

        .menu__item {
          position: relative;
        }

        .menu__item::before {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 100%;
          height: 2px;
          background-color: var(--secondary-color);
          border-radius: 0.5rem;
          transform: scaleX(0);
          transition: transform 0.2s ease-in-out;
        }

        .menu__item:hover::before {
          transform: scaleX(1);
        }

        .menu__item--left {
          margin-right: auto;
        }

        .menu__link {
          display: flex;
          align-items: center;
          gap: 0.25rem;
        }
      `}</style>
    </>
  )
}

export default Menu
