import { useActivity } from '@tokenized/sdk-react-private';
import React from 'react';
import { ActivityRow, ActivityHeader } from './ActivityRow';

export default function ActivityTable({ type }) {
  let filters;
  switch (type) {
    case 'history':
      filters = {
        includeSuccessfulEvents: true,
        includeIncompleteEvents: true,
        includeFailedEvents: true,
        includeExpiredEvents: true,
        includeEventsRequiringAction: false,
        includeEventsPendingOthers: false,
      };
      break;
    case 'open':
      filters = {
        includeSuccessfulEvents: false,
        includeIncompleteEvents: false,
        includeFailedEvents: false,
        includeExpiredEvents: false,
        includeEventsRequiringAction: true,
        includeEventsPendingOthers: false,
      };
      break;
    case 'pending':
      filters = {
        includeSuccessfulEvents: false,
        includeIncompleteEvents: false,
        includeFailedEvents: false,
        includeExpiredEvents: false,
        includeEventsRequiringAction: false,
        includeEventsPendingOthers: true,
      };
      break;
    default:
      break;
  }
  const activity = useActivity(filters);

  if (activity?.isLoading) {
    return <progress className="progress is-small is-primary mt-5" max="100" />;
  }

  return (
    <div className="table-container">
      <table className="table is-hoverable">
        <thead>
          <ActivityHeader />
        </thead>
        <tbody>
          {activity?.data?.map((activityItem) => (
            <ActivityRow key={activityItem.id} item={activityItem} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
