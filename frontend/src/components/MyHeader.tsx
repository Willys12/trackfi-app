import { useClerk, UserButton } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

const MyHeader = () => {
    const navigate = useNavigate();
    const { signOut } = useClerk();

    const handleSignOut = async () => {
        await signOut();
        navigate("/sign-in");
    };

    return (
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <UserButton showName />

            <button 
              onClick={handleSignOut}
              //className="text-white rounded-md px-3 py-1 hover:underline space-between"
            >
                Sign Out
            </button>

        </div>
    );
}
export default MyHeader;