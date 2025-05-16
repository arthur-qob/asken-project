import { useParams } from 'react-router-dom'

const Profile = () => {
	const { userId } = useParams()

	return (
		<section>
			<h1>Profile</h1>
			<p>{userId ? `User ID: ${userId}` : 'No user found'}</p>
		</section>
	)
}

export default Profile
