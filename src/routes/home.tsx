import { UserProps } from "../types/user";
import Search from "../components/search";
import User from "../components/user";
import { useState } from "react";
import Error from "../components/error";

const Home = () => {
    const [user, setUser] = useState<UserProps | null>(null);
    const [error, setError] = useState(false);

    const loadUser = async(username: string) => {
        setError(false);
        setUser(null);

        const res = await fetch(`https://api.github.com/users/${username}`);
        const data = await res.json();

        console.log(data);

        if (res.status === 404) {
            setError(true);
            return;
        }

        const userData: UserProps = {
            avatar_url: data.avatar_url,
            login: data.login,
            name: data.name,
            location: data.location,
            followers: data.followers,
            following: data.following
        };

        setUser(userData);
    }

    return (
        <div>
            <Search loadUser={loadUser}/>
            {user && <User {...user} />}
            {error && <Error />}
        </div>
    );
};

export default Home;