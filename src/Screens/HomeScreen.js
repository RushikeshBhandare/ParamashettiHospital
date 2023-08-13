import React, { useRef, useState } from 'react'
import ReactToPrint, { useReactToPrint } from 'react-to-print'
import PdfView from './PdfView'
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css'

function HomeScreen() {
    const [patientName, setPatientName] = useState('')
    const [patientAge, setPatientAge] = useState('')
    const [nameOfConsultent, setNameOfConsultent] = useState('')
    const [hospNo, setHospNo] = useState('')

    const [dateOfAdmission, seDateOfAdmissiont] = useState(null)
    const [dateOfProcedure, seDateOfProcedure] = useState(null)
    const [dateOfLAMA, seDateOfLAMA] = useState(null)

    const [insurance, setInsurance] = useState('')
    const [clinicalDiagnosis, setClinicalDiagnosis] = useState('')
    const [investigationReportSummery, setInvestigationReportSummery] = useState('')
    const [bloodInvestigation, setBloodInvestigation] = useState('')
    const [biopsy, setBiospy] = useState('')
    const [ctOrMrii, setCtOrMri] = useState('')
    const [usg, setUsg] = useState('')
    const [xRay, setXray] = useState('')
    const [other, setOther] = useState('')

    const [clinicalHistory, setClinicalHistory] = useState('')
    const [clinicalFinding, setClinicalFinding] = useState('')
    const [nameOfProcedure, setNameOfprocedure] = useState('')
    const [procedureDetail, setProcedureDetail] = useState('')
    const [patientCondition, setPatientCondition] = useState('')
    const [dischargeMedication, setDischargeMedication] = useState('')
    const [dischargeIntroduction, setDischargeIntroduction] = useState('')
    const [futureTreatmentPlan, setFutureTreatmentPlan] = useState('')
    
    const [followUp, setFollowUp] = useState('')
    const [treatingDoctor, setTreatingDoctor] = useState('')

    const componentRef = useRef(null);

    const renderInput = (placeholder, val, setVal, multiline) => {
        if (multiline) {
            return <textarea rows={3} style={styles.textInput} placeholder={placeholder} value={val} onChange={(val)=> setVal(val.target.value)} />
        } 
        return <input style={styles.textInput} placeholder={placeholder} value={val} onChange={(val)=> setVal(val.target.value)}/>
    }

    const renderTextInput = (placeholder, val, setVal, multiline, date) => {
        return (
            <div style={styles.inputMainContainer}>
                <p style={styles.inputText}>{placeholder}*</p>
                <div style={multiline ? styles.multilineInputContainer : styles.inputContainer}>
                    {
                        date ? 
                        <DatePicker style={styles.datePicker} selected={val} onChange={(date) => setVal(date)} /> :
                        renderInput(placeholder, val, setVal, multiline)
                    }
                </div>
            </div>
        )
    }

    const renderSplitInfo = (placeholderOne, valOne, setValueOne, placeholderTwo, valTwo, setValueTwo, showEqual) => {
        return (
            <div style={styles.splitInfoMainContainer}>
                <div style={styles.splitInfoFirstContainer}>
                {renderTextInput(placeholderOne, valOne, setValueOne, false)}
                </div>
                <div style={showEqual ? styles.splitThreeContainerThree :  styles.splitInfoSecondContainer}>
                 {renderTextInput(placeholderTwo, valTwo, setValueTwo, false)}  
                </div>
            </div>
        )
    }

    const renderSplitThreeInfo = (placeholderOne, valOne, setValueOne, placeholderTwo, valTwo, setValueTwo, placeholderThree, valThree, setValueThree, date) => {
        return (
            <div style={styles.splitInfoMainContainer}>
                <div style={styles.splitThreeContainerOne}>
                {renderTextInput(placeholderOne, valOne, setValueOne, false, date)}
                    
                </div>
                <div style={styles.splitThreeContainerTwo}>
                {renderTextInput(placeholderTwo, valTwo, setValueTwo, false, date)}  
                    
                </div>
                <div style={styles.splitThreeContainerThree}>
                {renderTextInput(placeholderThree, valThree, setValueThree, false, date)}
                    
                </div>
            </div>
        )
    }

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
      });

      const data = {
        patientName,
        patientAge,
        nameOfConsultent,
        hospNo,
        dateOfAdmission,
        dateOfProcedure,
        dateOfLAMA,
        insurance,
        clinicalDiagnosis,
        investigationReportSummery,
        bloodInvestigation,
        biopsy,
        ctOrMrii,
        usg,
        xRay,
        other,
        clinicalHistory,
        clinicalFinding,
        nameOfProcedure,
        procedureDetail,
        patientCondition,
        dischargeMedication,
        dischargeIntroduction,
        futureTreatmentPlan,
        followUp,
        treatingDoctor
      }

  return (
   <div style={styles.rootContainer}>
    <div style={styles.InputContainer}>
        <h2 style={styles.title}>PARAMASHETTI MULTISPECIALITY HOSPITAL</h2>
        {renderSplitInfo('Patinet Name', patientName, setPatientName, 'Age / Sex', patientAge, setPatientAge)}
        {renderSplitInfo('Name of Consultsnt', nameOfConsultent, setNameOfConsultent, 'Hosp No', hospNo, setHospNo)}
        {renderSplitThreeInfo(
            'Date of Admission', 
            dateOfAdmission, 
            seDateOfAdmissiont,
            'Date of Procedure',
            dateOfProcedure,
            seDateOfProcedure,
            'Date of LAMA',
            dateOfLAMA,
            seDateOfLAMA,
            true
        )}
        {renderTextInput('Insurance / Non Insurance', insurance, setInsurance, false)}
        {renderTextInput('Clinical Diagnosis', clinicalDiagnosis, setClinicalDiagnosis, false)}
        {renderTextInput('Investigation with Report Summery', investigationReportSummery, setInvestigationReportSummery, false)}
      
        {renderSplitInfo('Blood Investigation', bloodInvestigation, setBloodInvestigation, 'Biopsy', biopsy, setBiospy, true)}
        {renderSplitInfo('CT/ MRT', ctOrMrii, setCtOrMri, 'USG', usg, setUsg, true)}
        {renderSplitInfo('X Ray', xRay, setXray, 'Others', other, setOther, true)}

        {renderTextInput('Clinical History', clinicalHistory, setClinicalHistory, true)}
        {renderTextInput('Clinical Finding', clinicalFinding, setClinicalFinding, true)}
        {renderTextInput('Name of Procedure', nameOfProcedure, setNameOfprocedure, true)}
        {renderTextInput('Procedure Detail / Hospital Course', procedureDetail, setProcedureDetail, true)}
        {renderTextInput('Patients Condition at Discharge', patientCondition, setPatientCondition, true)}
        {renderTextInput('Discharge Medication ', dischargeMedication, setDischargeMedication, true)}
        {renderTextInput('Discharge Introduction ', dischargeIntroduction, setDischargeIntroduction)}
        {renderTextInput('Future Treatment Plan ', futureTreatmentPlan, setFutureTreatmentPlan, false)}
        {renderTextInput('Follow up Date ', followUp, setFollowUp, false)}
        {renderTextInput('Treating Doctor ', treatingDoctor, setTreatingDoctor, false)}
        

        <div style={styles.btnContainer}>
            <button style={styles.bttonStyle}>Save</button>
            <button onClick={handlePrint} style={styles.printStyle}>Print</button>
        </div>
        
        <PdfView data={data} ref={componentRef}/>
    </div>
   </div>
  )
}

const styles = {
    rootContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        backgroundColor: '#eeeee4'
    },
    InputContainer: {
        maxWidth: 1280,
        minWidth: 600,
        backgroundColor: '#eab676',
        borderRadius: 10,
        margin: 20
    },
    textInput: {
        border: '0px solid black',
        fontSize: 16,
        outline: 'none',
        width: '100%',
        backgroundColor: '#eeeee4'
    },
    inputContainer: {
        // border: '1px solid black',
        padding: 10,
        borderRadius: 10,
        backgroundColor: '#eeeee4'
    },
    inputText: {
        fontSize: 16,
        fontWeight: 'bold',
        paddingBottom: 10
    },
    inputMainContainer: {
        padding: 10
    },
    splitInfoMainContainer: {
        display: 'flex',
        flexDireaction: 'row',
    },
    splitInfoFirstContainer: {
        flex: 1,
    },
    splitInfoSecondContainer: {
        width: '30%'
    },
    splitThreeContainerOne: {
        flex: 1
    },
    splitThreeContainerTwo: {
        flex: 1
    },
    splitThreeContainerThree: {
        flex: 1
    },
    bttonStyle: {
        width: 200,
        height: 50,
        borderRadius: 10,
        border: '0',
        backgroundColor: '#e28743',
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
        margin: 10,
        flex: 1
    },
    printStyle: {
        width: 200,
        height: 50,
        borderRadius: 10,
        border: '0',
        backgroundColor: '#76b5c5',
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
        margin: 10,
        flex: 1
    },
    btnContainer: {
        display: 'flex',
        flexDireaction: 'row',
        justifyContent: 'spaceBetween'
    },
    title: {
        textAlign: 'center',
        width: '100%',
        padding: 15,
        color: '#063970',
        fontSize: 25
    },
    multilineInputContainer: {
        padding: 10,
        borderRadius: 10,
        backgroundColor: '#eeeee4',
        height: 65
    },
    datePicker: {
        backgroundColor: '#eeeee4'
    }

}

export default HomeScreen