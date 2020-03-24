import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import axios from 'axios';

class Dashboard extends Component {
    constructor(props){
        super(props);
        this.state = {
            month: 0,
            year: 0,
            day: 0,
            monthDisplay: false,
            yearDisplay: false,
            months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
            days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            sampleData: [
                {
                    date: "2020-02-09",
                    medication: [{
                        name: 'ibuprofen',
                        dose: '200mg'
                    }, {
                        name: 'anotha one',
                        dose: '20000mg'
                    }],
                    appointment: [{
                        address: '123 Main St., Provo, UT 84606',
                        description: 'physical',
                        time: '3:00pm'
                    }]
                },
                {
                    date: "2020-03-12",
                    medication: [{
                        name: 'ibuprofen',
                        dose: '200mg'
                    }],
                    appointment: [{
                        address: '123 Main St., Provo, UT 84606',
                        description: 'physical',
                        time: '3:00pm'
                    }]
                },
                {
                    date: "2020-03-25",
                    medication: [{
                        name: 'ibuprofen',
                        dose: '200mg'
                    }]
                },
                {
                    date: "2020-03-26",
                    appointment: [{
                        address: '123 Main St., Provo, UT 84606',
                        description: 'physical',
                        time: '3:00pm'
                    },{
                        address: '123 Main St., Provo, UT 84606',
                        description: 'physical',
                        time: '3:00pm'
                    }]
                },
                {
                    date: "2020-03-06",
                    appointment: [{
                        address: '123 Main St., Provo, UT 84606',
                        description: 'physical',
                        time: '3:00pm'
                    },{
                        address: '123 Main St., Provo, UT 84606',
                        description: 'physical',
                        time: '3:00pm'
                    }]
                },
                {
                    date: "2020-03-16",
                    appointment: [{
                        address: '123 Main St., Provo, UT 84606',
                        description: 'physical',
                        time: '3:00pm'
                    },{
                        address: '123 Main St., Provo, UT 84606',
                        description: 'physical',
                        time: '3:00pm'
                    }]
                }
            ]
        }
        this.componentDidMount = this.componentDidMount.bind(this);
    }

    componentDidMount(){
        this.currentDate();
        this.getEvents(this.props.userReducer.user.patient_id)

    }

    getEvents = (id) => {
        axios.get(`/calendar/events${id}`).then(res => {
            console.log(res.data)
        })
    }
    
    currentDate = () => {
        let today = new Date();
        let month = today.getMonth() + 1;
        let year = today.getFullYear();
        let day = today.getDay() + 1;
        this.setState({
            month: month,
            year: year,
            day: day
        });
    }

    displayMonths = () => {
        this.setState({monthDisplay: !this.state.monthDisplay});
    }
    displayYears = () => {
        this.setState({yearDisplay: !this.state.yearDisplay});
    }

    render(){
        const {month, months, year, monthDisplay, yearDisplay} = this.state;
        // console.log(month)
        const displayMonths = months.map((e, i) => {
            return(
                <div className='label-month' key={i} onClick={() => {
                    this.setState({month: i + 1})
                    this.displayMonths()}}>
                    {e}
                </div>
            )
        })
        const calendar = this.state.sampleData.map((e, i) => {
            let month = e.date.split('-')[1];
            let day = e.date.split('-')[2];
            let year = e.date.split('-')[0];
            if(+month === +this.state.month){
                let meds = e.medication ? e.medication.map((m, i) => {
                    return(
                        <div className='day-card' key={i}>
                            <p id='dot' className='white'></p>
                            <p id='double-width'>{m.name}</p>
                            <p id='fifth-width'>{m.dose}</p>
                        </div>
                    )
                }) : null
                let apps = e.appointment ? e.appointment.map((a, i) => {
                    return(
                        <div className='day-card' key={i}>
                            <p id='dot' className='red'></p>
                            <p>{a.description}</p>
                            <p>{a.address}</p>
                            <p id='fifth-width'>{a.time}</p>
                        </div>
                    )
                }) : null
                return(
                    <div className='calendar-overview-container'>
                        <h4>{month}/{day}/{year}</h4>
                        {meds}
                        {apps}
                    </div>
                )                
            }

        })
        
        return(
            <main>

                <section>
                    <div>
                        <div className='nav-month'>
                            {
                                monthDisplay
                                ?
                                <div id='month-dropdown' onClick={this.displayMonths}>
                                    {/* {months[month - 1]} */}
                                    {displayMonths}
                                </div>
                                :
                                <div onClick={() => this.displayMonths()}>{months[month - 1]}</div>
                            }
                        </div>

                        <div>
                            {
                                yearDisplay
                                ?
                                <div onClick={this.displayYears}>
                                    {year}
                                </div>
                                :
                                <div onClick={this.displayYears}>{year}</div>
                            }
                        </div>
                        <div>
                            <i className="prev fa fa-fw fa-chevron-left"
                                onClick={() => this.state.month === 1 ? this.setState({month: 12}) : this.setState({month: this.state.month - 1})}>
                            </i>
                            <i className="prev fa fa-fw fa-chevron-right"
                                onClick={() => this.state.month === 12 ? this.setState({month: 1}) : this.setState({month: this.state.month + 1})}>
                            </i>
                        </div>
                    </div>
                    <section className='todays-meds'>
                        {calendar.length ? calendar : (
                            <div className='day-card'>
                                <h4>No events for {this.state.months[this.state.month - 1]}</h4>
                            </div>
                        )}
                    </section>

                </section>

                <section>

                    <Link to='/meds'>
                    <section className='overview'>
                        <h3>Medications</h3>
                    </section>
                    </Link>

                    <Link to='/allergies'>
                    <section className='overview'>
                        <h3>Allergies</h3>
                        allergies
                    </section>
                    </Link>

                    <Link to='/surgeries'>
                    <section className='overview'>
                        <h3>Surgeries</h3>
                    </section>
                    </Link>

                    <Link to='/med-history'>
                    <section className='overview'>
                        <h3>Medical History</h3>
                    </section>
                    </Link>

                    <Link to='/primary-care'>
                    <section className='overview'>
                        <h3>Primary Care Physician</h3>
                    </section>
                    </Link>

                </section>
            </main>
        )
    }
}

const mapStateToProps = state => {
    return state
}

export default connect(mapStateToProps, null)(Dashboard); 