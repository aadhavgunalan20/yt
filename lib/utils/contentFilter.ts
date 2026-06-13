import { ParentalControlSettings } from '../types/parentalControls';

export interface Video {
  id: string;
  title: string;
  channelId: string;
  contentRating: 'G' | 'PG' | 'PG-13' | 'R' | 'UNRATED';
  keywords: string[];
}

export class ContentFilter {
  // Check if video is appropriate based on parental settings
  static isVideoAllowed(
    video: Video,
    settings: ParentalControlSettings
  ): { allowed: boolean; reason?: string } {
    // Check content rating
    const ratingOrder = ['G', 'PG', 'PG-13', 'R'];
    if (
      ratingOrder.indexOf(video.contentRating) >
      ratingOrder.indexOf(settings.contentRating)
    ) {
      return { allowed: false, reason: 'Content rating too high' };
    }

    // Check if channel is blocked
    if (settings.blockedChannels.includes(video.channelId)) {
      return { allowed: false, reason: 'Channel is blocked' };
    }

    // Check if whitelisting is enabled and channel not in list
    if (
      settings.allowedChannelsOnly &&
      !settings.whitelistedChannels.includes(video.channelId)
    ) {
      return { allowed: false, reason: 'Channel not in whitelist' };
    }

    // Check for blocked keywords
    const lowerTitle = video.title.toLowerCase();
    for (const keyword of settings.blockedKeywords) {
      if (lowerTitle.includes(keyword.toLowerCase())) {
        return { allowed: false, reason: `Blocked keyword found: ${keyword}` };
      }
    }

    return { allowed: true };
  }

  // Filter video list
  static filterVideos(
    videos: Video[],
    settings: ParentalControlSettings
  ): Video[] {
    return videos.filter((video) => this.isVideoAllowed(video, settings).allowed);
  }
}
