import styles from './index.module.scss'
import { Link, useLocation } from 'react-router-dom'

export default function Index() {
	const navLinksMenu1 = [
		{ name: 'Home', href: '/' },
		{ name: 'About', href: '/about' },
		{ name: 'Contact', href: '/contact' }
	]

	const navLinksMenu2 = [
		{ name: 'Sign In', href: '/signin' },
		{ name: 'Sign Up', href: '/signup' }
	]

	const pathname = useLocation()

	return (
		<main className={styles.mainContainer}>
			<nav className={styles.navBarContainer}>
				<h1 className={styles.logo}>LOGO HERE</h1>
				<ul className={styles.navMenu1}>
					{navLinksMenu1.map((link, index) => {
						const isActive =
							pathname.pathname === link.href ||
							(pathname.pathname.startsWith(link.href) &&
								pathname.pathname !== '/')

						return (
							<li
								key={index}
								className={`${styles.navLinks} ${
									isActive ? styles.active : ''
								}`}>
								<Link to={link.href}>{link.name}</Link>
							</li>
						)
					})}
				</ul>

				<ul className={styles.navMenu2}>
					{navLinksMenu2.map((link, index) => {
						const isActive =
							pathname.pathname === link.href ||
							(pathname.pathname.startsWith(link.href) &&
								pathname.pathname !== '/')

						const currentBtn = `btn${index + 1}`

						return (
							<li
								key={index}
								className={`${styles.navLinks} ${
									isActive ? styles.active : ''
								} ${styles.btns} ${styles[currentBtn]}`}>
								<Link to={link.href}>{link.name}</Link>
							</li>
						)
					})}
				</ul>
			</nav>
		</main>
	)
}
