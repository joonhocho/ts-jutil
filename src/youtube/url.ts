export type YouTubeVideoThumbnailSize =
  | 'default'
  | 'hqdefault'
  | 'mqdefault'
  | 'sddefault'
  | 'maxresdefault';

export const getVideoThumbnailUrl = (
  videoId: string,
  size: YouTubeVideoThumbnailSize
): string => `http://i3.ytimg.com/vi/${videoId}/${size}.jpg`;

export const getYouTubeChannelUrl = (channelId: string): string =>
  `https://www.youtube.com/channel/${channelId}`;

export const getYouTubeVideoUrl = (videoId: string): string =>
  `https://www.youtube.com/watch?v=${videoId}`;

export const getYouTubeVideoEmbedUrl = (videoId: string): string =>
  `https://www.youtube.com/embed/${videoId}`;
