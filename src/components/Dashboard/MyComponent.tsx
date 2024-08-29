import myStyles from '@/components/Dashboard/styles/index.module.scss';

const MyComponent = (props) => {
    let users = props.list;

    return (
        <div className={myStyles['mycomponent']}>
            <h3>My component</h3>
            <table>
                <tbody>
            {users.map((user: User) => (
                    <tr key={user.id} >
                        <td>Name: {user.name}</td>
                        <td>Username: {user.username}</td>
                        <td>Email: {user.email}</td>
                        <td>Phone: {user.phone}</td>
                    </tr>   
                ))}
                </tbody>
            </table>
        </div>
        
    )
};

export default MyComponent;
