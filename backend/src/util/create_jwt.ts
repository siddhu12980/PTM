import jwt from "jsonwebtoken";

export interface data {
    email: String;
    id: Number;
}

const createToken = (datas: data): string => {
    return jwt.sign(datas, process.env.JWT_SECRET!,
        {
            expiresIn: '2 days'
        });
};

export default createToken;