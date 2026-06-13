import { ScreenTimeLog, ParentalControlSettings } from '../types/parentalControls';

export class ScreenTimeManager {
  // Check if child has exceeded daily limit
  static hasExceededDailyLimit(
    todayLog: ScreenTimeLog | null,
    settings: ParentalControlSettings
  ): boolean {
    if (!todayLog) return false;
    return todayLog.minutesWatched >= settings.dailyScreenTimeLimit;
  }

  // Get remaining screen time for today
  static getRemainingScreenTime(
    todayLog: ScreenTimeLog | null,
    settings: ParentalControlSettings
  ): number {
    const watched = todayLog?.minutesWatched || 0;
    return Math.max(0, settings.dailyScreenTimeLimit - watched);
  }

  // Check if current time is within allowed hours
  static isWithinAllowedHours(
    settings: ParentalControlSettings
  ): boolean {
    const now = new Date();
    const currentTime = `${String(now.getHours()).padStart(2, '0')}:${String(
      now.getMinutes()
    ).padStart(2, '0')}`;

    return currentTime >= settings.allowedHours.start && 
           currentTime <= settings.allowedHours.end;
  }

  // Log screen time
  static logScreenTime(
    log: ScreenTimeLog,
    additionalMinutes: number
  ): ScreenTimeLog {
    return {
      ...log,
      minutesWatched: log.minutesWatched + additionalMinutes,
    };
  }
}
