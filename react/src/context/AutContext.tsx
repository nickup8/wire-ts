import {
    SetStateAction,
    createContext,
    useContext,
    useState,
    Dispatch,
    ReactNode,
} from "react";
import { axiosClient } from "../axiosClient";

interface IRule {
    id: number;
    title: string;
}

export type User = {
    id: number;
    name: string;
    lastname: string;
    rule: IRule;
    created_at: Date;
};

interface AuthContentDefault {
    user: User | null;
    setUser: Dispatch<SetStateAction<User>> | Dispatch<SetStateAction<null>>;
    csrfToken: () => Promise<boolean>;
}

const authContentDefault = {
    user: null,
    setUser: () => null,
    csrfToken: () => Promise.resolve(false),
} as AuthContentDefault;

interface AuthProviderProps {
    children: ReactNode;
}

const AuthContent = createContext(authContentDefault);

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [user, _setUser] = useState(
        JSON.parse(localStorage.getItem("user")) || ""
    );
    const [userLoad, setUserLoad] = useState(true);
    // set user to local storage
    const setUser = (user: User) => {
        if (user) {
            localStorage.setItem(
                "user",
                JSON.stringify(`${user.name} ${user.lastname}`)
            );
            setUserLoad(false);
        } else {
            localStorage.removeItem("user");
        }
        _setUser(user);
        setUserLoad(false);
    };

    // csrf token generation for guest methods
    const csrfToken = async () => {
        await axiosClient.get("http://localhost:8000/sanctum/csrf-cookie");
        return true;
    };

    return (
        <AuthContent.Provider
            value={{ user, setUser, csrfToken, userLoad, setUserLoad }}
        >
            {children}
        </AuthContent.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContent);
};
