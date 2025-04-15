import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: 'dq95fwkeq',
  api_key: '593131428592337',
  api_secret: 'XRpFIRl04VdR_krFC9WB-PqJN7o',
});

export const cloudinaryUpload = cloudinary;
