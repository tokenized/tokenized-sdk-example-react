import { useActivity } from '@tokenized/sdk-react-private';
import React from 'react';
import ActivityRow from './ActivityRow';

export default function ActivityTable() {
  const activity = useActivity();

  if (activity?.isLoading) {
    return <progress className="progress is-small is-primary mt-5" max="100" />;
  }

  return (
    <div className="table-container">
      {/* {JSON.stringify(activity)} */}
      <table className="table is-hoverable">
        <thead></thead>
        <tbody>
          {activity?.data?.map((activityItem) => (
            <ActivityRow key={activityItem.txid} item={activityItem} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
