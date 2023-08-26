import React, { useEffect, useRef, useState } from 'react'
import ReactToPrint, { useReactToPrint } from 'react-to-print'
import PdfView from './PdfView'
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css'

import { initializeApp } from 'firebase/app';

import { getFirestore, collection, getDocs, addDoc, query, where, doc, updateDoc } from 'firebase/firestore/lite';
import { useLocation, useNavigate, useParams } from 'react-router-dom';


// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
    apiKey: "AIzaSyB6Jt-YgjqRG8_9ZE7EpVl7aLJZBNW3OYQ",
    authDomain: "testfirebase-ce3b8.firebaseapp.com",
    projectId: "testfirebase-ce3b8",
    storageBucket: "testfirebase-ce3b8.appspot.com",
    messagingSenderId: "1008981158471",
    appId: "1:1008981158471:web:a66820429c1727e8bf9f62",
    measurementId: "G-Q7E5ZZ2EPL"
  };
  

  const app = initializeApp(firebaseConfig);

  const db = getFirestore(app);

  console.log("app ", app);
  console.log("db ", db)




const  HomeScreen = () => {
    const {search} = useLocation()
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



    const [pationDataForPdf, setPationDataForPdf] = useState({})
    const [isPatinetCreated, setIsPatinetCreated] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [patinetID, setPatinetID] = useState('')
    const [isEdit, setIsEdit] = useState(false)

    useEffect(()=> {
        const match = search?.match(/data=(.*)/);
        const type = match?.[1];
        
        setPatinetID(Number(type))
        setIsEdit(!!type)
        getRecords(type)

    }, [search])
    
    const getRecords = async (searchVal) => {
        try{
            setIsLoading(true)
            console.log("searchVal ", searchVal);
            const rec = query(collection(db, "PatientInfo"), where("patinetID", "==", Number(searchVal) ))
            const dbRec =  await getDocs(rec);
            console.log("valur form firebase ", dbRec);

            if(dbRec?._docs?.length !== 0) {
                // setPatientList(dbRec?._docs)
                console.log("valur form firebase ", dbRec);
                const val = dbRec?._docs[0]?._document?.data?.value?.mapValue?.fields

                setPatientName(val?.patientName?.stringValue)
                setPatientAge(val?.patientAge?.stringValue)
                setNameOfConsultent(val?.nameOfConsultent?.stringValue)
                setHospNo(val?.hospNo?.stringValue)

                seDateOfAdmissiont(new Date(val?.dateOfAdmission?.timestampValue))
                seDateOfProcedure(new Date(val?.dateOfProcedure?.timestampValue))
                seDateOfLAMA(new Date(val?.dateOfLAMA?.timestampValue))

                setInsurance(val?.insurance?.stringValue)
                setClinicalDiagnosis(val?.clinicalDiagnosis?.stringValue)
                setInvestigationReportSummery(val?.investigationReportSummery?.stringValue)
                setBloodInvestigation(val?.bloodInvestigation?.stringValue)
                setBiospy(val?.biopsy?.stringValue)
                setCtOrMri(val?.ctOrMrii?.stringValue)
                setUsg(val?.usg?.stringValue)
                setXray(val?.xRay?.stringValue)
                setOther(val?.other?.stringValue)

                setClinicalHistory(val?.clinicalHistory?.stringValue)
                setClinicalFinding(val?.clinicalFinding?.stringValue)
                setNameOfprocedure(val?.nameOfProcedure?.stringValue)
                setProcedureDetail(val?.procedureDetail?.stringValue)
                setPatientCondition(val?.patientCondition?.stringValue)
                setDischargeMedication(val?.dischargeMedication?.stringValue)
                setDischargeIntroduction(val?.dischargeIntroduction?.stringValue)
                setFutureTreatmentPlan(val?.futureTreatmentPlan?.stringValue)
                
                setFollowUp(val?.followUp?.stringValue)
                setTreatingDoctor(val?.treatingDoctor?.stringValue)
                


                setIsLoading(false)
                return
            }
            // setPatientList([])
            setIsLoading(false)

            // console.log("g", dbRec)
        } catch(e) {
            setIsLoading(false)
            alert("someting went wrong ")
        }

    }




    const setData = async () => {
        try {
        setIsLoading(true)
        var id = Math.floor(Math.random() * 1000000000);
        const q = query(collection(db, "PatientInfo"), where("patinetID", "==",  id))
        // const rec = collection(db, 'PatientInfo');
        const dbRec =  await getDocs(q);
        if(dbRec?._docs?.length === 0 ){
                const rec = collection(db, 'PatientInfo');
                const newData = {
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
                treatingDoctor,
                patinetID: id
            }
                const data = await addDoc(rec, newData)
                setPationDataForPdf(newData)
                setIsPatinetCreated(true)
                console.log("data ", data)
                setIsLoading(false)

                return
        }
        setData()

        console.log(id)
        // try{
        //     console.log("set Data ")
        // }catch(e){
        //     console.log("errror ser ", e)
        // }

    } catch(e) {
        console.log("error ", e)
        alert("Someting Went Wron please Try gain later ")
        setIsLoading(false)
    }
    }

    const updateInfo = async () => {
        try {
            setIsLoading(true)
            const q = query(collection(db, "PatientInfo"), where("patinetID", "==",  patinetID))
            
            const dbRec =  await getDocs(q);
            console.log("db rec ", dbRec);
            let documentID = ''
            dbRec.forEach((doc) => {
                documentID = doc.id;
                console.log("Document ID:", documentID);
            });

            

            const docRef = doc(db, "PatientInfo", documentID);

            
            const newData = {
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
                    treatingDoctor,
                    patinetID
                }
                    const data = await updateDoc(docRef, newData)
                    setPationDataForPdf(newData)
                    setIsPatinetCreated(true)
                    console.log("data ", data)
                    setIsLoading(false)
    
                    return
            // setData()
    
            // console.log(id)
            // try{
            //     console.log("set Data ")
            // }catch(e){
            //     console.log("errror ser ", e)
            // }
    
        } catch(e) {
            console.log("error ", e)
            alert("Someting Went Wron please Try gain later ")
            setIsLoading(false)
        }
    }



    const renderInput = (placeholder, val, setVal, multiline) => {
        if (multiline) {
            return <textarea rows={3} style={styles.textInput} placeholder={placeholder} value={val} onChange={(val)=> setVal(val.target.value)} />
        } 
        return <input style={styles.textInput} placeholder={placeholder} value={val} onChange={(val)=> setVal(val.target.value)}/>
    }

    const renderTextInput = (placeholder, val, setVal, multiline, date) => {
        if(date){
            console.log('val ', new Date(val))
        }

        return (
            <div style={styles.inputMainContainer}>
                <p style={styles.inputText}>{placeholder}*</p>
                <div style={multiline ? styles.multilineInputContainer : styles.inputContainer}>
                    {
                        date ? 
                        <DatePicker style={styles.datePicker} selected={val || null} onChange={(date) => {
                            setVal(date)}} /> :
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


      const navigation = useNavigate()
    const onPressHome = () => {
        navigation('/')
    }

  return (
   <div style={styles.rootContainer}>
   {
   !isPatinetCreated &&
   <div style={styles.InputContainer}>
        <h2 style={styles.title}>Add New Patient Info </h2>
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
    </div>}
        {
            isPatinetCreated &&
            <div style={styles.pdfContainer}>
                <h2 style={styles.title}>PDF preview</h2>
    
                <PdfView data={pationDataForPdf} ref={componentRef}/>
                <div style={styles.btnContainer}>
                </div>
            </div>
        }
    <div style={styles.btnContainer}>
        {
            isLoading && <h2 style={styles.title}>Registering new patient please wait...</h2>
        }
        {
            !isLoading && !isPatinetCreated && !isEdit &&
            <button onClick={setData} style={styles.printStyle}>Register Patinet</button>
        }
        {
            !isLoading && isEdit && !isPatinetCreated &&
            <button onClick={updateInfo} style={styles.printStyle}>Update Info</button>
        }
        {
            isPatinetCreated && (
                <>
                <button onClick={handlePrint} style={styles.printStyle}>Print</button>
                <button onClick={onPressHome} style={styles.printStyle}>Home</button>
                </>
            )
        }

    </div>
   </div>
  )
}

const styles = {
    rootContainer: {
        // alignItems: 'center',
        // justifyContent: 'center',
        width: '100%',
        flexDireaction: 'row',
        // backgroundColor: '#eeeee4',
        display: 'flex',
        paddingTop: 20
    },
    pdfContainer: {
        paddingTop: 20
    },
    InputContainer: {
        maxWidth: 720,
        // minWidth: 600,
        // backgroundColor: '#eab676',
        borderRadius: 10,
        margin: 20,
        flex: 1
    },
    textInput: {
        border: '0px solid black',
        fontSize: 16,
        outline: 'none',
        width: '100%',
        // backgroundColor: '#eeeee4'
    },
    inputContainer: {
        // border: '1px solid black',
        padding: 10,
        borderRadius: 10,
        border: '0.3px solid gray'
        // backgroundColor: '#eeeee4'
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
        backgroundColor: '3498db',
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
        backgroundColor: '#3498db',
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
        fontSize: 30
    },
    multilineInputContainer: {
        padding: 10,
        borderRadius: 10,
        // backgroundColor: '#eeeee4',
        border: '0.3px solid gray',
        height: 65
    },
    datePicker: {
        // backgroundColor: '#eeeee4'
    },
    btnContainer: {
        paddingTop: 110
    }
}

export default HomeScreen