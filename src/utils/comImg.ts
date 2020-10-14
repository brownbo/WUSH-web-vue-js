import Compressor from 'compressorjs';

function compressAsync(file: any, opts: any) {
  return new Promise((resolve, reject) => {
    // eslint-disable-next-line no-new
    new Compressor(file, {
      ...opts,
      success: resolve,
      error: reject,
    });
  });
}

async function compressLoop(file: any, maxSize: any, opts: any = {}) {
  if (file.size <= maxSize) return file;

  let quality = opts.quality || 0.8;
  let lastSize = 0;
  while (quality >= 0) {
    // eslint-disable-next-line no-await-in-loop
    const res: any = await compressAsync(file, { ...opts, quality });
    if (res.size <= maxSize) return res;
    if (lastSize === res.size) break;
    quality -= 0.1;
    lastSize = res.size;
  }

  return null;
}

/**
 * 图片压缩
 *
 * @param {File} file
 * @param {Number} maxSize 默认100KB
 */
export async function compress(file: any, maxSize: number = 500 * 1024) {
  if (file.size <= maxSize) return file;

  let res = null;
  let maxHeight = 4096;
  let maxWidth = 4096;
  while (!res) {
    // eslint-disable-next-line no-await-in-loop
    res = await compressLoop(file, maxSize, { maxHeight, maxWidth });
    maxHeight /= 2;
    maxWidth /= 2;
  }

  return res;
}

export function toDataURL(file: any) {
  return new Promise(resolve => {
    const reader = new FileReader();
    reader.onloadend = (e: any) => resolve(e.target.result);
    reader.readAsDataURL(file);
  });
}

export function getBase64(file: any, maxSize = 50 * 1024) {
  return compress(file, maxSize).then(res => toDataURL(res));
}
