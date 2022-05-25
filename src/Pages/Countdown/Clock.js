import React, { Fragment } from 'react'

const Clock = ({ timerDays, timerHours, timerMinutes, timerSeconds, offerTill }) => {
    return (
        <Fragment>
            <div>
                <div>
                    <div className="d-flex justify-content-center align-items-center gap-3 bg-secondary text-info">
                        <div>
                            <p>{timerDays}</p>
                            <small>Days</small>
                        </div>
                        <span>:</span>
                        <div>
                            <p>{timerHours}</p>
                            <small>Hours</small>
                        </div>
                        <span>:</span>
                        <div>
                            <p>{timerMinutes}</p>
                            <small>Minutes</small>
                        </div>
                        <span>:</span>
                        <div>
                            <p>{timerSeconds}</p>
                            <small>Seconds</small>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

Clock.defaultProps = {
    timerDays: 0,
    timerHours: 0,
    timerMinutes: 0,
    timerSeconds: 0,
}

export default Clock;