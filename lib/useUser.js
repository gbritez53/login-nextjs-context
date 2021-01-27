import { useEffect, useContext } from "react";
import { useRouter } from "next/router";

import { AuthGlobal } from "../context/store/Auth";

export default function useUser(redirectTo, login = false) {
	const router = useRouter();
  	const { stateUser } = useContext(AuthGlobal);
	useEffect(() => {
		if(stateUser.isAuthenticated && login) router.push(redirectTo)
    	if (!stateUser.isAuthenticated && !login) {
      		router.push(redirectTo);
    	}
  	}, [stateUser]);
  	return stateUser;
}
