import { useActivity } from '@tokenized/sdk-react-private';
import React from 'react';
import { ActivityRow, ActivityHeader } from './ActivityRow';

export default function ActivityTable({ pending }) {
  const activity = useActivity({ pending });

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
            <ActivityRow key={activityItem.txId} item={activityItem} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
