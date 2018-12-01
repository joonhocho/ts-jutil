import { parseVideoIdFromYouTubeVideoUrl } from './youtube';

test('parseVideoIdFromYouTubeVideoUrl', () => {
  expect(
    parseVideoIdFromYouTubeVideoUrl(
      'https://www.youtube.com/watch?v=tOpoyyEAI-o'
    )
  ).toBe('tOpoyyEAI-o');
  expect(
    parseVideoIdFromYouTubeVideoUrl(
      'https://www.youtube.com/watch?v=tOpoyyEAI-o&t=1'
    )
  ).toBe('tOpoyyEAI-o');
  expect(
    parseVideoIdFromYouTubeVideoUrl('youtube.com/watch?v=tOpoyyEAI-o')
  ).toBe('tOpoyyEAI-o');
  expect(
    parseVideoIdFromYouTubeVideoUrl('iyoutube.com/watch?v=tOpoyyEAI-o')
  ).toBe(null);

  expect(parseVideoIdFromYouTubeVideoUrl('https://youtu.be/tOpoyyEAI-o')).toBe(
    'tOpoyyEAI-o'
  );
  expect(
    parseVideoIdFromYouTubeVideoUrl('https://youtu.be/tOpoyyEAI-o&t=1')
  ).toBe('tOpoyyEAI-o');
  expect(parseVideoIdFromYouTubeVideoUrl('youtu.be/tOpoyyEAI-o')).toBe(
    'tOpoyyEAI-o'
  );
  expect(parseVideoIdFromYouTubeVideoUrl('iyoutu.be/tOpoyyEAI-o')).toBe(null);

  expect(
    parseVideoIdFromYouTubeVideoUrl('https://www.youtube.com/embed/tOpoyyEAI-o')
  ).toBe('tOpoyyEAI-o');
  expect(
    parseVideoIdFromYouTubeVideoUrl(
      'https://www.youtube.com/embed/tOpoyyEAI-o&t=1'
    )
  ).toBe('tOpoyyEAI-o');
  expect(parseVideoIdFromYouTubeVideoUrl('youtube.com/embed/tOpoyyEAI-o')).toBe(
    'tOpoyyEAI-o'
  );
  expect(
    parseVideoIdFromYouTubeVideoUrl('iyoutube.com/embed/tOpoyyEAI-o')
  ).toBe(null);
});
