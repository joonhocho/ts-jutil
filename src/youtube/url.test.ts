import {
  getVideoThumbnailUrl,
  getYouTubeChannelUrl,
  getYouTubeVideoEmbedUrl,
  getYouTubeVideoUrl,
} from './url';

const videoId = 'pCJZg7pVtiI';
const channelId = 'UCH3sMKVJ2P7hm7ROBy5FHJga';

test('getVideoThumbnailUrl', () => {
  expect(getVideoThumbnailUrl(videoId, 'hqdefault')).toBe(
    `http://i3.ytimg.com/vi/${videoId}/hqdefault.jpg`
  );
});

test('getYouTubeChannelUrl', () => {
  expect(getYouTubeChannelUrl(channelId)).toBe(
    `https://www.youtube.com/channel/${channelId}`
  );
});

test('getYouTubeVideoEmbedUrl', () => {
  expect(getYouTubeVideoEmbedUrl(videoId)).toBe(
    `https://www.youtube.com/embed/${videoId}`
  );
});

test('getYouTubeVideoUrl', () => {
  expect(getYouTubeVideoUrl(videoId)).toBe(
    `https://www.youtube.com/watch?v=${videoId}`
  );
});
