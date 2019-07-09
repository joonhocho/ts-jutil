import { parseVideoIdFromYouTubeVideoUrl } from './parseVideoIdFromYouTubeVideoUrl';

const videoId = 'pCJZg7pVtiI';

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
