import React from 'react';

import { SingleActivities } from './'

const SingleRoutine = ({ children, routine }) => {

    return routine
        ? <div className='routine-single'>
            <span><h3>{routine.name}</h3></span>
            <span><h3 className='creator-name'>created by {routine.creatorName}</h3></span>
            <span>Goal: {routine.goal}</span>
            {
                routine.activities.length > 0 && <div className='activities'>
                    <span>Activities:</span>
                    {
                        routine.activities.map(activity => <SingleActivity key={activity.id} activity={activity}>
                            {
                                <>
                                    <span>Repetition: {activity.count} times</span>
                                    <span>Duration: {activity.duration} minutes</span>
                                </>
                            }
                        </SingleActivity>)
                    }
                </div>
            }
        </div>
        : 'Loading...'
};

export default SingleRoutine;