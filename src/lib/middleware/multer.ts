import multer, { MulterError } from "multer";

export const multerOptions = {};

export const initMulterMiddleware = () => {
    return multer(multerOptions);
};
