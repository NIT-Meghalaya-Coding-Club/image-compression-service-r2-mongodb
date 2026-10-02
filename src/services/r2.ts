import { R2Bucket, R2PutOptions } from "@cloudflare/workers-types"; 

export async function getObject(
    bucket: R2Bucket,
    key: string
) {
    return await bucket.get(key);
} 

export async function putObject(
    bucket: R2Bucket,
    key: string,
    data: ArrayBuffer | string,
    options?: R2PutOptions
) {
    return await bucket.put(key, data, options);
}

export async function deleteObject(
    bucket: R2Bucket,
    key: string
) {
    return await bucket.delete(key);
}

export async function objectExists(
    bucket: R2Bucket,
    key: string
  ) {
    try {
      await bucket.get(key);
      return true;
    } catch (error) {
      return false;
    }
}
