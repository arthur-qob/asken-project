import { Link, useLocation, useNavigate } from 'react-router-dom'
import styles from './styles.module.scss'
import logoImg from '@/assets/images/logo.png'
import { Logout } from '@/utils/auth'

interface NavLink {
	href?: string
	name: string
}

interface Routes {
	navLinksMenu1?: NavLink[]
	navLinksMenu2?: NavLink[]
}

interface NavBarProps {
	routes?: Routes
}

const NavBar = ({ routes }: NavBarProps) => {
	const currentRoute = useLocation().pathname

	const navigate = useNavigate()

	return (
		<nav className={styles.navBarContainer}>
			<img
				className={styles.logo}
				src={logoImg}
				height={65}></img>
			<ul className={styles.navMenu1}>
				{routes?.navLinksMenu1?.map((link, index) => {
					const isActive = currentRoute === link.href

					return (
						<li
							key={index}
							className={`${styles.navLinks} ${
								isActive ? styles.active : ''
							}`}>
							<Link to={link.href as string}>{link.name}</Link>
						</li>
					)
				})}
			</ul>

			<ul className={styles.navMenu2}>
				{routes?.navLinksMenu2?.map((link, index) => {
					const isActive =
						currentRoute === link.href ||
						(currentRoute.startsWith(link.href as string) &&
							currentRoute !== '/')

					const currentBtn = `btn${index + 1}`

					return (
						<li
							key={index}
							className={`${styles.navLinks} ${
								isActive ? styles.active : ''
							} ${styles.btns} ${styles[currentBtn]}`}>
							{link.href !== undefined ? (
								<Link to={link.href}>{link.name}</Link>
							) : (
								<button
									className={styles.logoutBtn}
									onClick={() => {
										Logout()
										navigate('/signin')
									}}>
									{link.name}
								</button>
							)}
						</li>
					)
				})}
			</ul>
		</nav>
	)
}

export default NavBar
