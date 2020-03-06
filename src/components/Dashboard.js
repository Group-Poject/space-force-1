import React, {Component} from 'react';

class Dashboard extends Component {
    constructor(){
        super();
        this.state = {
            month: 0,
            year: 0,
            day: 0,
            monthDisplay: false,
            yearDisplay: false,
            months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
            days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
        }
        this.componentDidMount = this.componentDidMount.bind(this);
    }

    componentDidMount(){
        this.currentDate();
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

    futureMonth = (month) => {
        this.setState({month: month});
    }

    displayMonths = () => {
        this.setState({monthDisplay: !this.state.monthDisplay});
    }
    displayYears = () => {
        this.setState({yearDisplay: !this.state.yearDisplay});
    }

    render(){
        const {month, months, year, day, monthDisplay, yearDisplay} = this.state;
        return(
            <main>

                <section>
                    <div>
                        <div>
                            {
                                monthDisplay
                                ?
                                <div onClick={this.displayMonths}>
                                    {months[month - 1]}
                                    {/* <span onClick={this.futureMonth(month + 1)}>{month + 1}</span> */}
                                </div>
                                :
                                <div onClick={this.displayMonths}>{months[month - 1]}</div>
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
                            {day}
                        </div>

                        <div>back arrow</div>
                        <div>forward arrow</div>
                    </div>
                    <container className='todays-meds'>
                        todays meds
                    </container>


                </section>
                <section>
                    <container>
                        pcare
                    </container>

                    <container>
                        meds
                    </container>

                    <container>
                        allergies
                    </container>

                    <container>
                        surgeries
                    </container>

                    <container>
                        medical history fam and personal
                    </container>
                </section>
            </main>
        )
    }
}

export default Dashboard; 