export interface RegisterRequestProps {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	phoneNumber: string;
}

export interface LoginRequestProps {
	email: string;
	password: string;
}
