import React, {Component} from 'react';
import {Link} from 'react-router-dom';

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

    displayMonths = () => {
        this.setState({monthDisplay: !this.state.monthDisplay});
    }
    displayYears = () => {
        this.setState({yearDisplay: !this.state.yearDisplay});
    }

    render(){
        const {month, months, year, day, monthDisplay, yearDisplay} = this.state;
        const displayMonths = months.map((e, i) => {
            return(
                <div key={i} onClick={() => {
                    this.setState({month: i + 1})
                    this.displayMonths()}}>
                    {e}
                </div>
            )
        })
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

                    <Link to='/primary-care'>
                    <container>
                        pcare
                    </container>
                    </Link>

                    <Link to='/meds'>
                    <container>
                        meds
                    </container>
                    </Link>

                    <Link to='/allergies'>
                    <container>
                        allergies
                    </container>
                    </Link>

                    <Link to='/surgeries'>
                    <container>
                        surgeries
                    </container>
                    </Link>

                    <Link to='/med-history'>
                    <container>
                        medical history fam and personal
                    </container>
                    </Link>

                </section>
            </main>
        )
    }
}

export default Dashboard; 