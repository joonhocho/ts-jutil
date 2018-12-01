// https://www.youtube.com/watch?v=tOpoyyEAI-o
// https://youtu.be/tOpoyyEAI-o
// https://www.youtube.com/embed/tOpoyyEAI-o

const watchPattern = /\byoutube\.com\/watch\?v=([\w-]+)\b/;
const shortUrlPattern = /\byoutu\.be\/([\w-]+)\b/;
const embedPattern = /\byoutube\.com\/embed\/([\w-]+)\b/;

export const parseVideoIdFromYouTubeVideoUrl = (url: string): string | null => {
  if (url) {
    let match = url.match(watchPattern);
    if (match) {
      return match[1];
    }
    match = url.match(shortUrlPattern);
    if (match) {
      return match[1];
    }
    match = url.match(embedPattern);
    if (match) {
      return match[1];
    }
  }
  return null;
};
