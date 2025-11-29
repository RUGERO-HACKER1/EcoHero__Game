import { Audio } from 'expo-av';

type SoundMap = { [key: string]: Audio.Sound | null };
const sounds: SoundMap = {};
let backgroundMusic: Audio.Sound | null = null;

export async function loadSound(name: string, uri: any) {
  try {
    const { sound } = await Audio.Sound.createAsync(uri);
    sounds[name] = sound;
    return sound;
  } catch (e) {
    console.warn('Failed to load sound', name, e);
    return null;
  }
}

export async function playSound(name: string, options?: { volume?: number }) {
  const sound = sounds[name];
  if (!sound) return;
  try {
    await sound.setPositionAsync(0);
    if (options?.volume !== undefined) await sound.setVolumeAsync(options.volume);
    await sound.playAsync();
  } catch (e) {
    console.warn('Failed to play sound', name, e);
  }
}

export async function loadBackgroundMusic(uri: any) {
  try {
    if (backgroundMusic) {
      await backgroundMusic.unloadAsync();
      backgroundMusic = null;
    }
    const { sound } = await Audio.Sound.createAsync(
      uri,
      { shouldPlay: false, isLooping: true },
      undefined,
      true
    );
    backgroundMusic = sound;
    console.log('Background music loaded successfully');
    return sound;
  } catch (e) {
    console.warn('Failed to load background music', e);
    return null;
  }
}

export async function playBackgroundMusic(volume: number = 0.3) {
  if (!backgroundMusic) {
    console.warn('Background music not loaded');
    return;
  }
  try {
    await backgroundMusic.setVolumeAsync(volume);
    await backgroundMusic.setIsLoopingAsync(true);
    const status = await backgroundMusic.getStatusAsync();
    if (!status.isLoaded) {
      console.warn('Background music not loaded properly');
      return;
    }
    await backgroundMusic.playAsync();
    console.log('Background music started playing');
  } catch (e) {
    console.warn('Failed to play background music', e);
  }
}

export async function stopBackgroundMusic() {
  if (!backgroundMusic) return;
  try {
    await backgroundMusic.stopAsync();
  } catch (e) {
    console.warn('Failed to stop background music', e);
  }
}

export async function pauseBackgroundMusic() {
  if (!backgroundMusic) return;
  try {
    await backgroundMusic.pauseAsync();
  } catch (e) {
    console.warn('Failed to pause background music', e);
  }
}

export async function unloadAll() {
  for (const k of Object.keys(sounds)) {
    const s = sounds[k];
    if (s) await s.unloadAsync();
    sounds[k] = null;
  }
  if (backgroundMusic) {
    await backgroundMusic.unloadAsync();
    backgroundMusic = null;
  }
}
