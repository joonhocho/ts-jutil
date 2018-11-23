import { parseVideoIdFromYoutubeVideoUrl } from './youtube';

test('parseVideoIdFromYoutubeVideoUrl', () => {
  expect(
    parseVideoIdFromYoutubeVideoUrl(
      'https://www.youtube.com/watch?v=tOpoyyEAI-o'
    )
  ).toBe('tOpoyyEAI-o');
  expect(
    parseVideoIdFromYoutubeVideoUrl(
      'https://www.youtube.com/watch?v=tOpoyyEAI-o&t=1'
    )
  ).toBe('tOpoyyEAI-o');
  expect(
    parseVideoIdFromYoutubeVideoUrl('youtube.com/watch?v=tOpoyyEAI-o')
  ).toBe('tOpoyyEAI-o');
  expect(
    parseVideoIdFromYoutubeVideoUrl('iyoutube.com/watch?v=tOpoyyEAI-o')
  ).toBe(null);

  expect(parseVideoIdFromYoutubeVideoUrl('https://youtu.be/tOpoyyEAI-o')).toBe(
    'tOpoyyEAI-o'
  );
  expect(
    parseVideoIdFromYoutubeVideoUrl('https://youtu.be/tOpoyyEAI-o&t=1')
  ).toBe('tOpoyyEAI-o');
  expect(parseVideoIdFromYoutubeVideoUrl('youtu.be/tOpoyyEAI-o')).toBe(
    'tOpoyyEAI-o'
  );
  expect(parseVideoIdFromYoutubeVideoUrl('iyoutu.be/tOpoyyEAI-o')).toBe(null);

  expect(
    parseVideoIdFromYoutubeVideoUrl('https://www.youtube.com/embed/tOpoyyEAI-o')
  ).toBe('tOpoyyEAI-o');
  expect(
    parseVideoIdFromYoutubeVideoUrl(
      'https://www.youtube.com/embed/tOpoyyEAI-o&t=1'
    )
  ).toBe('tOpoyyEAI-o');
  expect(parseVideoIdFromYoutubeVideoUrl('youtube.com/embed/tOpoyyEAI-o')).toBe(
    'tOpoyyEAI-o'
  );
  expect(
    parseVideoIdFromYoutubeVideoUrl('iyoutube.com/embed/tOpoyyEAI-o')
  ).toBe(null);
});
