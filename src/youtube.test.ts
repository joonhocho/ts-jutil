import {
  getVideoThumbnailUrl,
  getYouTubeChannelUrl,
  getYouTubeVideoEmbedUrl,
  getYouTubeVideoUrl,
  parseVideoIdFromYouTubeVideoUrl,
} from './youtube';

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

test('parseVideoIdFromYouTubeVideoUrl', () => {
  expect(
    parseVideoIdFromYouTubeVideoUrl(
      `https://www.youtube.com/watch?v=${videoId}`
    )
  ).toBe(videoId);
  expect(
    parseVideoIdFromYouTubeVideoUrl(
      `https://www.youtube.com/watch?v=${videoId}&t=1`
    )
  ).toBe(videoId);
  expect(
    parseVideoIdFromYouTubeVideoUrl(`youtube.com/watch?v=${videoId}`)
  ).toBe(videoId);
  expect(
    parseVideoIdFromYouTubeVideoUrl(`iyoutube.com/watch?v=${videoId}`)
  ).toBe(null);

  expect(parseVideoIdFromYouTubeVideoUrl(`https://youtu.be/${videoId}`)).toBe(
    videoId
  );
  expect(
    parseVideoIdFromYouTubeVideoUrl(`https://youtu.be/${videoId}&t=1`)
  ).toBe(videoId);
  expect(parseVideoIdFromYouTubeVideoUrl(`youtu.be/${videoId}`)).toBe(videoId);
  expect(parseVideoIdFromYouTubeVideoUrl(`iyoutu.be/${videoId}`)).toBe(null);

  expect(
    parseVideoIdFromYouTubeVideoUrl(`https://www.youtube.com/embed/${videoId}`)
  ).toBe(videoId);
  expect(
    parseVideoIdFromYouTubeVideoUrl(
      `https://www.youtube.com/embed/${videoId}&t=1`
    )
  ).toBe(videoId);
  expect(parseVideoIdFromYouTubeVideoUrl(`youtube.com/embed/${videoId}`)).toBe(
    videoId
  );
  expect(parseVideoIdFromYouTubeVideoUrl(`iyoutube.com/embed/${videoId}`)).toBe(
    null
  );
});
