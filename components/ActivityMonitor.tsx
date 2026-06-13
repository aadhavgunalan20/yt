'use client';

import React, { useState, useEffect } from 'react';
import { ActivityLog, ScreenTimeLog } from '@/lib/types/parentalControls';

interface ActivityMonitorProps {
  childAccountId: string;
  screenTimeLog: ScreenTimeLog | null;
  activities: ActivityLog[];
  dailyLimit: number;
}

export default function ActivityMonitor({
  childAccountId,
  screenTimeLog,
  activities,
  dailyLimit,
}: ActivityMonitorProps) {
  const remaining = screenTimeLog
    ? Math.max(0, dailyLimit - screenTimeLog.minutesWatched)
    : dailyLimit;

  const percentUsed = screenTimeLog
    ? (screenTimeLog.minutesWatched / dailyLimit) * 100
    : 0;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow">
      <h1 className="text-3xl font-bold mb-6">Activity Monitor</h1>

      {/* Screen Time Summary */}
      <section className="mb-8 p-4 bg-blue-50 rounded">
        <h2 className="text-xl font-semibold mb-4">Today's Screen Time</h2>
        <div className="space-y-2">
          <p className="text-lg">
            <strong>{screenTimeLog?.minutesWatched || 0}</strong> / {dailyLimit}{' '}
            minutes used
          </p>
          <div className="w-full bg-gray-200 rounded-full h-4">
            <div
              className="bg-blue-600 h-4 rounded-full transition-all"
              style={{ width: `${percentUsed}%` }}
            />
          </div>
          <p className="text-sm text-gray-600">
            <strong>{remaining}</strong> minutes remaining
          </p>
        </div>

        {percentUsed > 80 && (
          <div className="mt-4 p-3 bg-yellow-100 border border-yellow-400 rounded">
            ⚠️ Screen time limit almost reached!
          </div>
        )}
      </section>

      {/* Activity Log */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
        {activities.length === 0 ? (
          <p className="text-gray-500">No activities recorded</p>
        ) : (
          <div className="space-y-2">
            {activities.map((activity) => (
              <div
                key={activity.id}
                className={`p-3 rounded border ${
                  activity.flagged
                    ? 'bg-red-50 border-red-300'
                    : 'bg-gray-50 border-gray-300'
                }`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium">{activity.action}</p>
                    <p className="text-sm text-gray-600">
                      {new Date(activity.timestamp).toLocaleString()}
                    </p>
                  </div>
                  {activity.flagged && (
                    <span className="bg-red-500 text-white text-xs px-2 py-1 rounded">
                      Flagged
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
