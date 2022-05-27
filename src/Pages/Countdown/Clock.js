import React, { Fragment } from 'react'

const Clock = ({ timerDays, timerHours, timerMinutes, timerSeconds, offerTill }) => {
    return (
        <Fragment>
            <div>
                <div>
                    <div style={{backgroundColor:"#E7EBF0"}} className="d-flex justify-content-center align-items-center gap-2 rounded pt-2 pb-0 text-center">
                        <div>
                            <p>{timerDays}d :</p>
                            {/* <small>Days</small> */}
                        </div>
                        {/* <span>:</span> */}
                        <div>
                            <p>{timerHours}h :</p>
                            {/* <small>Hours</small> */}
                        </div>
                        {/* <span>:</span> */}
                        <div>
                            <p>{timerMinutes}m :</p>
                            {/* <small>Minutes</small> */}
                        </div>
                        {/* <span>:</span> */}
                        <div>
                            <p>{timerSeconds}s</p>
                            {/* <small>Seconds</small> */}
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