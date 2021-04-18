import aws from 'aws-sdk';

export default async function handler(req, res) {
  aws.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
    region: process.env.AWS_REGION,
    signatureVersion: 'v4',
  });

  console.log('BODY', req.body);

  const s3 = new aws.S3();
  const post = await s3.createPresignedPost({
    Bucket: process.env.PHOTO_BUCKET_NAME,
    Fields: {
      key: req.body.filename,
    },
    Expires: 60, // seconds
    Conditions: [
      ['content-length-range', 0, 1048576], // up to 1 MB
    ],
  });

  res.status(200).json(post);
}
