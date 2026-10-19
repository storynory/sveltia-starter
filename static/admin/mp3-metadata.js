// Sveltia preSave hook: detect MP3 metadata from the episode's audio URL.
// Works with remote media; manual values are preserved on failure.
function audioDuration(url) {
  return new Promise((resolve, reject) => {
    const audio = new Audio();
    audio.preload = 'metadata';
    const timeout = setTimeout(() => finish(null), 12000);

    function finish(seconds) {
      clearTimeout(timeout);
      audio.removeAttribute('src');
      audio.load();
      if (seconds === null) reject(new Error('Audio metadata unavailable'));
      else resolve(seconds);
    }

    audio.addEventListener('loadedmetadata', () => {
      const seconds = audio.duration;
      finish(Number.isFinite(seconds) && seconds > 0 ? seconds : null);
    }, { once: true });
    audio.addEventListener('error', () => finish(null), { once: true });
    audio.src = url;
  });
}

function formatDuration(seconds) {
  const whole = Math.round(seconds);
  const hours = Math.floor(whole / 3600);
  const minutes = Math.floor((whole % 3600) / 60);
  const remainder = whole % 60;
  return [hours, minutes, remainder].map((value) => String(value).padStart(2, '0')).join(':');
}

async function audioLength(url) {
  // This works only when the host grants browser CORS access to HEAD.
  const response = await fetch(url, { method: 'HEAD' });
  if (!response.ok) return null;
  const header = response.headers.get('content-length');
  if (!header || !/^\d+$/.test(header)) return null;
  const size = Number(header);
  return Number.isSafeInteger(size) && size > 0 ? size : null;
}

CMS.registerEventListener({
  name: 'preSave',
  handler: async ({ entry }) => {
    if (entry.get('collection') !== 'podcasts') return;
    const data = entry.get('data');
    const url = data.get('audio');
    if (typeof url !== 'string' || !/^https?:\/\//i.test(url)) return;

    let updated = data;
    try {
      const seconds = await audioDuration(url);
      updated = updated.set('duration', formatDuration(seconds));
    } catch (error) {
      console.warn('Could not detect audio duration; keeping existing value.', error);
    }

    // Never substitute a bitrate-based estimate for the exact RSS file size.
    try {
      const size = await audioLength(url);
      if (size !== null) updated = updated.set('length', size);
    } catch {
      console.info('Host does not expose MP3 file size to the browser; keeping existing value.');
    }
    return updated;
  }
});
