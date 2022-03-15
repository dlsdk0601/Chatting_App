import { atom } from "recoil";

export interface IUser {
    isLogged: boolean;
    name: string;
    age: string;
    gender: string;
    email: string;
}

export const isLight = atom({
    key: "mode",
    default: true
})

export const user = atom<IUser>({
    key: "userData",
    default: {
        isLogged: false,
        name: "",
        age: "",
        gender: "",
        email: ""
    }
})