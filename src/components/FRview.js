import React, {Component} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {getUser} from '../redux/userReducer';

class FRview extends Component {
    constructor(){
        super();
        this.state = {
            patientInfo: [],
            pCare: [],
            allergies: [],
            meds: [],
            surgeries: [],
            patientHistory: [],
            famHistory: []
        }
        this.componentDidMount = this.componentDidMount.bind(this);
    }

    componentDidMount(){
        this.getPatientInfo();
        this.getPCareInfo();
        this.getAllergyInfo();
        this.getMedsInfo();
        this.getSurgeryInfo();
        this.getPatientHistory();
        this.getFamHistory();
    }

    getPatientInfo = () => {
        axios.get(`/api/patient-info${this.props.user.patient_id}`)
        .then(res => {this.setState({patientInfo: res.data})})
        .catch(err => console.log(err));
    }
    getPCareInfo = () => {
        axios.get(`/api/pcare-info${this.props.user.patient_id}`)
        .then(res => {this.setState({pCare: res.data})})
        .catch(err => console.log(err));
    }
    getAllergyInfo = () => {
        axios.get(`/api/allergy-info${this.props.user.patient_id}`)
        .then(res => {this.setState({allergies: res.data})})
        .catch(err => console.log(err));
    }
    getMedsInfo = () => {
        axios.get(`/api/meds-info${this.props.user.patient_id}`)
        .then(res => {this.setState({meds: res.data})})
        .catch(err => console.log(err));
    }
    getSurgeryInfo = () => {
        axios.get(`/api/surgery-info${this.props.user.patient_id}`)
        .then(res => {this.setState({surgeries: res.data})})
        .catch(err => console.log(err));
    }
    getPatientHistory = () => {
        axios.get(`/api/patient-history-info${this.props.user.patient_id}`)
        .then(res => {this.setState({patientHistory: res.data})})
        .catch(err => console.log(err));
    }
    getFamHistory = () => {
        axios.get(`/api/fam-history-info${this.props.user.patient_id}`)
        .then(res => {this.setState({famHistory: res.data})})
        .catch(err => console.log(err));
    }

    render(){
        const mappedPatientInfo = this.state.patientInfo.map((e, i) => {
            return(
                <div key={i}>
                    <h1>{e.first_name}</h1>
                    <h1>{e.last_name}</h1>
                    <h1>{e.birth_date}</h1>
                    <h1>{e.blood_type}</h1>
                    <h1>{e.religious_preference}</h1>
                    <h1>{e.phone_number}</h1>
                    <h1>{e.address}</h1>
                </div>
            )
        });
        const mappedPCare = this.state.pCare.map((e, i) => {
            return(
                <div key={i}>
                    <h1>{e.first_name}</h1>
                    <h1>{e.last_name}</h1>
                    <h1>{e.phone_number}</h1>
                    <h1>{e.email}</h1>
                    <h1>{e.address}</h1>
                </div>
            )
        });
        const mappedAllergies = this.state.allergies.map((e, i) => {
            return(
                <div key={i}>
                    <h1>{e.allergy_name}</h1>
                    <h1>{e.allergy_desc}</h1>
                    <h1>{e.diagnose_date}</h1>
                </div>
            )
        });
        const mappedMeds = this.state.meds.map((e, i) => {
            return(
                <div key={i}>
                    <h1>{e.medication_name}</h1>
                    <h1>{e.prescription_date}</h1>
                    <h1>{e.dose}</h1>
                </div>
            )
        });
        const mappedSurgeries = this.state.surgeries.map((e, i) => {
            return(
                <div key={i}>
                    <h1>{e.surgery_name}</h1>
                    <h1>{e.surgery_desc}</h1>
                    <h1>{e.surgery_date}</h1>
                </div>
            )
        });
        const mappedPatientHistory = this.state.patientHistory.map((e, i) => {
            return(
                <div key={i}>
                    <p>Patient Medical History</p>
                    <h1>{e.condition}</h1>
                    <h1>{e.cond_desc}</h1>
                    <h1>{e.date}</h1>
                </div>
            )
        });
        const mappedFamHistory = this.state.famHistory.map((e, i) => {
            return(
                <div key={i}>
                    <p>Family Medical History</p>
                    <h1>{e.condition}</h1>
                    <h1>{e.condition_desc}</h1>
                    <h1>{e.date}</h1>
                </div>
            )
        })

        return(
            <main id='fr-view-main'>
                <div className='fr-container'>
                    FRView
                    {/* <div>{mappedPatientInfo}</div>
                    <div>{mappedPCare}</div>
                    <div>{mappedAllergies}</div>
                    <div>{mappedMeds}</div>
                    <div>{mappedSurgeries}</div>
                    <div>{mappedPatientHistory}</div>
                    <div>{mappedFamHistory}</div> */}
                    <div>mappedPatientInfo</div>
                    <div>mappedPCare</div>
                    <div>mappedAllergies</div>
                    <div>mappedMeds</div>
                    <div>mappedSurgeries</div>
                    <div>mappedPatientHistory</div>
                    <div>mappedFamHistory</div>
                </div>
            </main>
        )
    }
}

const mapStateToProps = state => {
    return state
}

export default connect(mapStateToProps, {getUser})(FRview);