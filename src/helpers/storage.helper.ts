import { diskStorage } from "multer";
import * as fs from "fs";
import { BadRequestException } from "@nestjs/common";
import { join } from "path";

export class StorageHelper {

    public static disk() {
        return diskStorage({
            destination: function (req, file, cb) {
                if (!fs.existsSync("./storage/uploaded-files")) {
                    fs.mkdirSync("./storage/uploaded-files");
                }

                cb(null, "./storage/uploaded-files");
            },
            filename: (req, file, cb) => {
                const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
                const originalName = file.originalname.split('.')[0];
                const extension = file.originalname.split('.')[1];
                const uniqueFileName = `${originalName}-${uniqueSuffix}.${extension}`;
                cb(null, uniqueFileName);
            },
        })
    }

    public static customDisk(customPathCallback: (req: any, file: any, cb: (error: Error | null, customPath: string | null) => void) => void) {
        return diskStorage({
        destination: function (req, file, cb) {
            customPathCallback(req, file, function (err, customPath) {
            if (err) {
                cb(err, null);
                return;
            }
            const fullPath = join('./storage/uploaded-files', customPath);
            if (!fs.existsSync(fullPath)) {
                fs.mkdirSync(fullPath, { recursive: true });
            }
            cb(null, fullPath);
            });
        },
        filename: function (req, file, cb) {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
            const originalName = file.originalname.split('.')[0];
            const extension = file.originalname.split('.').pop();
            const uniqueFileName = `${originalName}-${uniqueSuffix}.${extension}`;
            cb(null, uniqueFileName);
        },
        });
    }

    public static imageOnlyFilter(req: any, file: any, cb: any) {
        // accept image only
        if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
            return cb(new BadRequestException('Only image files are allowed!'), false);
        }

        cb(null, true);
    }

    public static pdfOnlyFilter(req: any, file: any, cb: any) {
        // accept PDF only
        if (!file.originalname.match(/\.(pdf|PDF)$/)) {
            return cb(new BadRequestException('Only PDF file is allowed!'), false);
        }

        cb(null, true);
    }

    public static xlsxOnlyFilter(req: any, file: any, cb: any) {
        // accept PDF only
        if (!file.originalname.match(/\.(xlsx|XLSX)$/)) {
            return cb(new BadRequestException('Only XLSX file is allowed!'), false);
        }

        cb(null, true);
    }
}