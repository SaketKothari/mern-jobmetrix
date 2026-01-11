import path from "path";
import multer, { Multer, StorageEngine } from "multer";
import DataParser from "datauri/parser.js";

const storage: StorageEngine = multer.memoryStorage();

const upload: Multer = multer({ storage });

const parser = new DataParser();

export const formatImage = (file: Express.Multer.File): string | undefined => {
  const fileExtension = path.extname(file.originalname).toString();
  return parser.format(fileExtension, file.buffer).content;
};

export default upload;
