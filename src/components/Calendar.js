import React, { createRef } from 'react';
import moment from 'moment';

export default class Calendar extends React.Component {
    state = {
        dateContext: moment(),
        today: moment(),
        showMonthPopup: false,
        showYearPopup: false,
        selectedDay: null,
        dots: [],
        monthsArray: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
        zoomToggle: 'week-day zoom',
        sampleData: [
            {
                date: "2020-03-09",
                medication: ['ibuprofen', 'anotha one'],
                appointment: [{
                    description: 'physical',
                    time: '3:00pm'
                }]
            },
            {
                date: "2020-03-12",
                medication: ['ibuprofen'],
                appointment: [{
                    description: 'physical',
                    time: '3:00pm'
                }]
            },
            {
                date: "2020-03-25",
                medication: ['ibuprofen']
            },
            {
                date: "2020-03-26",
                appointment: [{
                    description: 'an appointment'
                },{
                    description: 'anatha appointment'
                }]
            }
        ]
    }

    constructor(props) {
        super(props);
        this.width = props.width || "350px";
        this.style = props.style || {};
        this.style.width = this.width;
    }


    weekdays = moment.weekdays();
    weekdaysShort = moment.weekdaysShort();
    months = moment.months();

    year = () => {
        return this.state.dateContext.format("Y");
    }
    month = () => {
        return this.state.dateContext.format("MMMM");
    }
    daysInMonth = () => {
        return this.state.dateContext.daysInMonth();
    }
    currentDate = () => {
        console.log("currentDate: ", this.state.dateContext.get("date"));
        return this.state.dateContext.get("date");
    }
    currentDay = () => {
        return this.state.dateContext.format("D");
    }

    
    
    firstDayOfMonth = () => {
        let dateContext = this.state.dateContext;
        let firstDay = moment(dateContext).startOf('month').format('d');
        return firstDay;
    }

    setMonth = (month) => {
        let monthNo = this.months.indexOf(month);
        let dateContext = Object.assign({}, this.state.dateContext);
        dateContext = moment(dateContext).set("month", monthNo);
        this.setState({
            dateContext: dateContext
        });
    }

    nextMonth = () => {
        let dateContext = Object.assign({}, this.state.dateContext);
        dateContext = moment(dateContext).add(1, "month");
        this.setState({
            dateContext: dateContext
        });
        this.props.onNextMonth && this.props.onNextMonth();
    }

    prevMonth = () => {
        let dateContext = Object.assign({}, this.state.dateContext);
        dateContext = moment(dateContext).subtract(1, "month");
        this.setState({
            dateContext: dateContext
        });
        this.props.onPrevMonth && this.props.onPrevMonth();
    }

    onSelectChange = (e, data) => {
        this.setMonth(data);
        this.props.onMonthChange && this.props.onMonthChange();

    }
    SelectList = (props) => {
        let popup = props.data.map((data) => {
            return (
                <div key={data}>
                    <k  onClick={(e)=> {this.onSelectChange(e, data)}}>
                        {data}
                    </k>
                </div>
            );
        });

        return (
            <div className="month-dropdown">
                {popup}
            </div>
        );
    }

    onChangeMonth = (e, month) => {
        this.setState({
            showMonthPopup: !this.state.showMonthPopup
        });
    }

    MonthNav = () => {
        return (
            <span className="label-month"
                onClick={(e)=> {this.onChangeMonth(e, this.month())}}>
                {this.month()}
                {this.state.showMonthPopup &&
                 <this.SelectList data={this.months} />
                }
            </span>
        );
    }


    showYearEditor = () => {
        this.setState({
            showYearNav: true
        });
    }

    setYear = (year) => {
        let dateContext = Object.assign({}, this.state.dateContext);
        dateContext = moment(dateContext).set("year", year);
        this.setState({
            dateContext: dateContext
        })
    }
    onYearChange = (e) => {
        this.setYear(e.target.value);
        this.props.onYearChange && this.props.onYearChange(e, e.target.value);
    }

    onKeyUpYear = (e) => {
        if (e.which === 13 || e.which === 27) {
            this.setYear(e.target.value);
            this.setState({
                showYearNav: false
            })
        }
    }

    YearNav = () => {
        return (
            this.state.showYearNav ?
            <input
                defaultValue = {this.year()}
                className="editor-year"
                ref={(yearInput) => { this.yearInput = yearInput}}
                onKeyUp= {(e) => this.onKeyUpYear(e)}
                onChange = {(e) => this.onYearChange(e)}
                type="number"
                placeholder="year"/>
            :
            <span
                className="label-year"
                onDoubleClick={(e)=> { this.showYearEditor()}}>
                {this.year()}
            </span>
        );
    }

    onDayClick = (e, day) => {
        this.setState({
            selectedDay: day
        }, () => {
            console.log("SELECTED DAY: ", this.state.selectedDay);
        });

        this.props.onDayClick && this.props.onDayClick(e, day);
    }

    setDots = (dots) => {
        console.log(dots);
        this.setState({dots})
    }


    render() {
        let weekdays = this.weekdaysShort.map((day, i) => {
            return (
                <div key={day} className="weekday-header" >{day}</div>
            )
        });

        let blanks = [];
        for (let i = 0; i < this.firstDayOfMonth(); i++) {
            blanks.push(<div key={i * 80} className="emptySlot">
                {""}
                </div>
            );
        }

        let daysInMonth = [];
        let newDate = new Date();
        for (let d = 1; d <= this.daysInMonth(); d++) {
            let className = (d == this.currentDay() && newDate.getMonth() === this.state.dateContext.month() && +this.year() === +newDate.getFullYear() ? "day current-day": "day");
            let selectedClass = (" week-day")

            let filtered = ['unchanged']

            for(let i = 0; i < this.state.sampleData.length; i++){
                let dateArr = this.state.sampleData[i].date.split('-')
                if(+dateArr[2] === +d && +dateArr[1] === (+this.state.dateContext.month() + 1) && +dateArr[0] === +this.state.dateContext.year()){
                    filtered.push(this.state.sampleData[i])
                }
            }
            let modalDots = []
            let events = filtered.map((e, i) => {
                let dots = []
                let meds = () => e.medication ? e.medication.forEach((e, i) => {
                    
                    dots.push(<div>
                        <p key={i} id='dot' className='white'></p>
                        <p id='none'>Medication</p>
                        <p id='none'>{e}</p>
                    </div>)
                }) : null
                meds();
                let apps = () => e.appointment ? e.appointment.forEach((e, i) => {
                    
                    dots.push(<div>
                        <p key={i} id='dot' className='red'></p>
                        <p id='none'>Appointment</p>
                        <p id='none'>{e.description}</p>
                        </div>)
                }) : null
                apps()
                modalDots = dots
                    return(
                        <div key={i} className='event-dot-container'>
                            <div>
                                {dots}
                            </div>
                        <p id='count'>{dots.length}</p>
                        </div>
                    )
                })
            daysInMonth.push(
                <div key={d} className={className + selectedClass} >
                    <span id={d} onClick={(e)=>{
                        this.onDayClick(e, d)
                        this.setDots(modalDots)
                        }}>
                        <p>{d}</p>
                        {events[1]}
                    </span>
                    {this.state.selectedDay ? 
                    <p onClick={() => this.setState({selectedDay: null})}>X</p> : null }
                    
                </div>
            );
        }
        
        console.log("days: ", daysInMonth);

        var totalSlots = [...blanks, ...daysInMonth];
        let rows = [];
        let cells = [];

        totalSlots.forEach((row, i) => {
            if ((i % 7) !== 0) {
                cells.push(row);
            } else {
                let insertRow = cells.slice();
                rows.push(insertRow);
                cells = [];
                cells.push(row);
            }
            if (i === totalSlots.length - 1) {
                let insertRow = cells.slice();
                rows.push(insertRow);
            }
        });

        let trElems = rows.map((d, i) => {
            return i > 0 ? 
            (
                <div className='tr' key={i*100}>
                    {d}
                </div>
            ) : null;
        })

        return (
            <main>
            <div className="calendar-container">
                <div className="calendar">
                        <div className="calendar-header">
                            <div className='nav-month'>
                                <this.MonthNav />
                                {" "}
                                <this.YearNav />
                            </div>
                            <div>
                                <i className="prev fa fa-fw fa-chevron-left"
                                    onClick={(e)=> {this.prevMonth()}}>
                                </i>
                                <i className="prev fa fa-fw fa-chevron-right"
                                    onClick={(e)=> {this.nextMonth()}}>
                                </i>

                            </div>
                            <div className='legend'>
                                <p>Legend:</p>
                                <p><span className='color2'></span>Medications</p>
                                <p><span className='color3'></span>Appointments</p>
                            </div>
                        </div>
                    <div className='tbody'>
                        <div className='tr-head'>
                            {weekdays}
                        </div>
                        {trElems}
                        <div className={this.state.selectedDay ? 'day-modal' : 'none'}>
                            {this.state.dots}
                            {this.state.selectedDay ? 
                    <i id='close' className="fas fa-times-circle" onClick={() => this.setState({selectedDay: null})}></i> : null }

                        </div>
                    </div>
                </div>

            </div>
            </main>

        );
    }
}