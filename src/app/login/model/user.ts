export interface User {

    email: string;
    password: string;
    name: string;
    region: string;
    birthDate: Date;
    phone: number;
    idCard: number;
    typeofuser: string;
    username: string;
    description: string;

    contracts:  {
        driver_name: string,
        photo_url: string,
        from: string,
        to: string
    };

}
