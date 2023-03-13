class UserModel {
    constructor(
        public user_id: number,
        public user_first_name: string,
        public user_last_name: string,
        public user_email: string,
        public user_password: string,
        public user_city: string,
        public user_street: string,
        public user_is_admin: boolean,
    ) { }
}

export default UserModel;