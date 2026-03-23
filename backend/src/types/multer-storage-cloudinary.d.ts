declare module 'multer-storage-cloudinary' {
  import { StorageEngine } from 'multer';
  import { ConfigOptions } from 'cloudinary';

  export interface Options {
    cloudinary: any;
    params?: {
      folder?: string;
      format?: string;
      allowed_formats?: string[];
      public_id?: (req: Request, file: Express.Multer.File) => string;
      resource_type?: string;
      [key: string]: any;
    };
  }

  export class CloudinaryStorage implements StorageEngine {
    constructor(options: Options);
    _handleFile(req: any, file: any, cb: any): void;
    _removeFile(req: any, file: any, cb: any): void;
  }
}
