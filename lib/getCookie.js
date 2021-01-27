import cookie from "cookie";

export default function getCookie(handler) {
	return withCookie(handler);
}

function withCookie(withCookieWrapperHandler) {
	return async function withCookieHandler(...args) {
		await applySession(args[0].req);
		return withCookieWrapperHandler(...args);
	};
}

function applySession( req ) {
	const cookie_jwt = cookie.parse(req.headers.cookie || "")['jwt']
	if(cookie_jwt){
		req.authenticated = true
	}else{
		req.authenticated = false
	}
}