import { useSelector } from 'react-redux';
import Avatar from '../components/Avatar'
import { avatarBrColors } from '../environment'

const avatar_stack = {
    display: 'flex'

}

function AvatarStack(props) {
    const usersList = useSelector((state) => state.users.usersList)

    const fetchCommentAvatar = (id) => {
        if (usersList && usersList.length > 0) {
            let user = usersList.find((item) => item.id === id)
            if (user) {
                return <Avatar color={avatarBrColors[Math.floor(Math.random() * avatarBrColors.length)]} initials={user.name.substring(0, 2).toUpperCase()} />
            }
        }
    }
    return (
        <div style={avatar_stack} >
            {
                props.list.map((item) => {
                    return fetchCommentAvatar(item.id)
                })
            }
        </div>
    );
}

export default AvatarStack;
