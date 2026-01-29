import fs from 'fs';
import path from 'path';

const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
const uploadPreset = process.env.CLOUDINARY_UPLOAD_PRESET;

if (!cloudName || !uploadPreset) {
  console.error('Missing CLOUDINARY_CLOUD_NAME or CLOUDINARY_UPLOAD_PRESET.');
  process.exit(1);
}

const rootDir = process.cwd();
const timelineDir = path.join(rootDir, 'public', 'timeline-2025');
const videosDir = path.join(rootDir, 'public', 'videos');
const musicDir = path.join(rootDir, 'public', 'music');

const isVideo = (ext) => ['.mp4', '.mp3'].includes(ext.toLowerCase());
const isImage = (ext) => ['.png', '.jpg', '.jpeg', '.gif', '.webp'].includes(ext.toLowerCase());

const uploadFile = async ({ filePath, folder, publicId, resourceType }) => {
  const stats = fs.statSync(filePath);
  const url = `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`;

  const chunkSize = 20 * 1024 * 1024;
  if (stats.size <= chunkSize) {
    const form = new FormData();
    const buffer = fs.readFileSync(filePath);
    const blob = new Blob([buffer]);
    form.append('file', blob, path.basename(filePath));
    form.append('upload_preset', uploadPreset);
    form.append('folder', folder);
    form.append('public_id', publicId);

    const response = await fetch(url, { method: 'POST', body: form });
    if (!response.ok) {
      const text = await response.text();
      throw new Error(`Upload failed for ${filePath}: ${response.status} ${text}`);
    }
    return response.json();
  }

  const uploadId = `${Date.now()}-${Math.random().toString(36).slice(2)}`;
  const fd = fs.openSync(filePath, 'r');
  let responseData = null;

  for (let start = 0; start < stats.size; start += chunkSize) {
    const end = Math.min(start + chunkSize, stats.size) - 1;
    const length = end - start + 1;
    const buffer = Buffer.alloc(length);
    fs.readSync(fd, buffer, 0, length, start);

    const form = new FormData();
    const blob = new Blob([buffer]);
    form.append('file', blob, path.basename(filePath));
    form.append('upload_preset', uploadPreset);
    form.append('folder', folder);
    form.append('public_id', publicId);

    const response = await fetch(url, {
      method: 'POST',
      body: form,
      headers: {
        'Content-Range': `bytes ${start}-${end}/${stats.size}`,
        'X-Unique-Upload-Id': uploadId,
      },
    });

    if (!response.ok) {
      const text = await response.text();
      fs.closeSync(fd);
      throw new Error(`Chunk upload failed for ${filePath}: ${response.status} ${text}`);
    }

    responseData = await response.json();
  }

  fs.closeSync(fd);
  return responseData;
};

const main = async () => {
  const result = {
    timeline2025: {},
    baeVideo: null,
    music: null,
  };

  if (fs.existsSync(timelineDir)) {
    const files = fs.readdirSync(timelineDir)
      .filter((file) => !file.toLowerCase().endsWith('.heic'))
      .sort();

    for (const file of files) {
      const ext = path.extname(file);
      const baseName = path.basename(file, ext);
      const filePath = path.join(timelineDir, file);
      const stats = fs.statSync(filePath);
      const resourceType = isVideo(ext) ? 'video' : 'image';
      if (!isVideo(ext) && !isImage(ext)) {
        continue;
      }
      if (resourceType === 'image' && stats.size > 10 * 1024 * 1024) {
        console.warn(`Skipping ${file} (image larger than 10MB).`);
        continue;
      }

      const data = await uploadFile({
        filePath,
        folder: 'rewinasworld/timeline-2025',
        publicId: baseName,
        resourceType,
      });

      result.timeline2025[baseName] = data.secure_url;
      console.log(`Uploaded ${file} -> ${data.secure_url}`);
    }
  }

  const baePath = path.join(videosDir, 'bae.mp4');
  if (fs.existsSync(baePath)) {
    const data = await uploadFile({
      filePath: baePath,
      folder: 'rewinasworld/videos',
      publicId: 'bae',
      resourceType: 'video',
    });
    result.baeVideo = data.secure_url;
    console.log(`Uploaded bae.mp4 -> ${data.secure_url}`);
  }

  const musicPath = path.join(musicDir, 'every-kind-of-way.mp3');
  if (fs.existsSync(musicPath)) {
    const data = await uploadFile({
      filePath: musicPath,
      folder: 'rewinasworld/music',
      publicId: 'every-kind-of-way',
      resourceType: 'video',
    });
    result.music = data.secure_url;
    console.log(`Uploaded music -> ${data.secure_url}`);
  }

  fs.writeFileSync(
    path.join(rootDir, 'scripts', 'cloudinary-uploads.json'),
    JSON.stringify(result, null, 2)
  );
  console.log('Saved scripts/cloudinary-uploads.json');
};

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
