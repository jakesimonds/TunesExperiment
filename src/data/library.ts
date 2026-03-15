import manifest from '../generated/music-manifest.json';
import assets from '../generated/library-index';

export interface Track {
  filename: string;
  path: string;
}

export interface Folder {
  name: string;
  tracks: Track[];
}

export function getFolders(): string[] {
  return manifest.folders.map((f) => f.name);
}

export function getTracks(folderName: string): Track[] {
  const folder = manifest.folders.find((f) => f.name === folderName);
  return folder?.tracks ?? [];
}

export function getAsset(path: string): any {
  return assets[path];
}
