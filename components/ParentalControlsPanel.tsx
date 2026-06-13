'use client';

import React, { useState } from 'react';
import { ParentalControlSettings } from '@/lib/types/parentalControls';

interface ParentalControlsPanelProps {
  settings: ParentalControlSettings;
  onSave: (settings: ParentalControlSettings) => Promise<void>;
}

export default function ParentalControlsPanel({
  settings,
  onSave,
}: ParentalControlsPanelProps) {
  const [formData, setFormData] = useState(settings);
  const [pinVisible, setPinVisible] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await onSave(formData);
      alert('Parental controls updated successfully!');
    } catch (error) {
      alert('Failed to save settings');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow">
      <h1 className="text-3xl font-bold mb-6">Parental Controls</h1>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Screen Time */}
        <section className="border-b pb-6">
          <h2 className="text-2xl font-semibold mb-4">Screen Time</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Daily Screen Time Limit (minutes)
              </label>
              <input
                type="number"
                value={formData.dailyScreenTimeLimit}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    dailyScreenTimeLimit: parseInt(e.target.value),
                  })
                }
                className="w-full px-3 py-2 border rounded"
                min="15"
                max="480"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Allowed Start Time
                </label>
                <input
                  type="time"
                  value={formData.allowedHours.start}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      allowedHours: {
                        ...formData.allowedHours,
                        start: e.target.value,
                      },
                    })
                  }
                  className="w-full px-3 py-2 border rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Allowed End Time
                </label>
                <input
                  type="time"
                  value={formData.allowedHours.end}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      allowedHours: {
                        ...formData.allowedHours,
                        end: e.target.value,
                      },
                    })
                  }
                  className="w-full px-3 py-2 border rounded"
                />
              </div>
            </div>

            <label className="flex items-center">
              <input
                type="checkbox"
                checked={formData.notifyOnScreenTimeLimit}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    notifyOnScreenTimeLimit: e.target.checked,
                  })
                }
                className="mr-2"
              />
              <span className="text-sm">Notify when limit reached</span>
            </label>
          </div>
        </section>

        {/* Content Filtering */}
        <section className="border-b pb-6">
          <h2 className="text-2xl font-semibold mb-4">Content Filtering</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Maximum Content Rating
              </label>
              <select
                value={formData.contentRating}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    contentRating: e.target.value as any,
                  })
                }
                className="w-full px-3 py-2 border rounded"
              >
                <option value="G">G - General Audiences</option>
                <option value="PG">PG - Parental Guidance</option>
                <option value="PG-13">PG-13 - Parents Strongly Cautioned</option>
                <option value="R">R - Restricted</option>
              </select>
            </div>

            <label className="flex items-center">
              <input
                type="checkbox"
                checked={formData.allowedChannelsOnly}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    allowedChannelsOnly: e.target.checked,
                  })
                }
                className="mr-2"
              />
              <span className="text-sm">
                Only allow whitelisted channels
              </span>
            </label>

            <label className="flex items-center">
              <input
                type="checkbox"
                checked={formData.notifyOnInappropriateContent}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    notifyOnInappropriateContent: e.target.checked,
                  })
                }
                className="mr-2"
              />
              <span className="text-sm">
                Notify on inappropriate content attempt
              </span>
            </label>
          </div>
        </section>

        {/* Interaction Controls */}
        <section className="border-b pb-6">
          <h2 className="text-2xl font-semibold mb-4">Interactions</h2>
          <div className="space-y-3">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={formData.commentsEnabled}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    commentsEnabled: e.target.checked,
                  })
                }
                className="mr-2"
              />
              <span className="text-sm">Allow comments</span>
            </label>

            <label className="flex items-center">
              <input
                type="checkbox"
                checked={formData.messagingEnabled}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    messagingEnabled: e.target.checked,
                  })
                }
                className="mr-2"
              />
              <span className="text-sm">Allow messaging</span>
            </label>

            <label className="flex items-center">
              <input
                type="checkbox"
                checked={formData.searchEnabled}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    searchEnabled: e.target.checked,
                  })
                }
                className="mr-2"
              />
              <span className="text-sm">Allow search</span>
            </label>

            <label className="flex items-center">
              <input
                type="checkbox"
                checked={formData.downloadEnabled}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    downloadEnabled: e.target.checked,
                  })
                }
                className="mr-2"
              />
              <span className="text-sm">Allow downloads</span>
            </label>
          </div>
        </section>

        {/* PIN Protection */}
        <section className="border-b pb-6">
          <h2 className="text-2xl font-semibold mb-4">PIN Protection</h2>
          <div className="space-y-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={formData.pinRequired}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    pinRequired: e.target.checked,
                  })
                }
                className="mr-2"
              />
              <span className="text-sm">
                Require PIN to modify parental controls
              </span>
            </label>

            {formData.pinRequired && (
              <div>
                <label className="block text-sm font-medium mb-2">
                  PIN (4-6 digits)
                </label>
                <div className="flex gap-2">
                  <input
                    type={pinVisible ? 'text' : 'password'}
                    value={formData.pin}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        pin: e.target.value,
                      })
                    }
                    className="flex-1 px-3 py-2 border rounded"
                    placeholder="••••"
                  />
                  <button
                    type="button"
                    onClick={() => setPinVisible(!pinVisible)}
                    className="px-3 py-2 bg-gray-200 rounded"
                  >
                    {pinVisible ? 'Hide' : 'Show'}
                  </button>
                </div>
              </div>
            )}
          </div>
        </section>

        <button
          type="submit"
          disabled={isSaving}
          className="w-full bg-blue-600 text-white font-semibold py-3 rounded hover:bg-blue-700 disabled:bg-gray-400"
        >
          {isSaving ? 'Saving...' : 'Save Parental Controls'}
        </button>
      </form>
    </div>
  );
}
