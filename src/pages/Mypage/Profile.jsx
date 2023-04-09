import { useSelector } from "react-redux"
import Card from "../../components/ui/Card"

const Profile = () => {
    const auth = useSelector(state => state.auth)
    return (
        <div>
            <div>
                Profile
            </div>
            <Card>
                <div>
                    E-mail : { auth.email }
                </div>
                <div>
                    Display Name : { auth.displayName}
                </div>
            </Card>
            <button>
                Close Account
            </button>
        </div>
    )

}
export default Profile