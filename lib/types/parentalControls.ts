// Types for parental controls
export interface ParentalControlSettings {
  id: string;
  userId: string;
  childAccountId: string;
  
  // Time restrictions
  dailyScreenTimeLimit: number; // in minutes
  allowedHours: {
    start: string; // "09:00"
    end: string;   // "20:00"
  };
  
  // Content filtering
  contentRating: 'G' | 'PG' | 'PG-13' | 'R'; // max allowed rating
  blockedKeywords: string[];
  blockedChannels: string[];
  allowedChannelsOnly: boolean;
  whitelistedChannels: string[];
  
  // Interaction restrictions
  commentsEnabled: boolean;
  messagingEnabled: boolean;
  searchEnabled: boolean;
  downloadEnabled: boolean;
  
  // Notifications
  notifyOnScreenTimeLimit: boolean;
  notifyOnInappropriateContent: boolean;
  
  // PIN protection
  pinRequired: boolean;
  pin: string; // hashed
  
  createdAt: Date;
  updatedAt: Date;
}

export interface ScreenTimeLog {
  id: string;
  childAccountId: string;
  date: Date;
  minutesWatched: number;
  videosWatched: string[]; // video IDs
}

export interface ActivityLog {
  id: string;
  childAccountId: string;
  timestamp: Date;
  action: string;
  details: Record<string, any>;
  flagged: boolean; // if content was inappropriate
}
