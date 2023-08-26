import { initializeApp } from 'firebase/app';
import { collection, getDocs, getFirestore, query, where } from 'firebase/firestore/lite';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

console.log()

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

const WelcomeScreen = () => {
    const [searchVal, setSearchVal] = useState('')
    const [patientList, setPatientList] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    useEffect(()=> {
        getRecords()
    }, [searchVal])
    
    const getRecords = async () => {
        try{
            setIsLoading(true)
            const rec = query(collection(db, "PatientInfo"), where("patinetID", "==", Number(searchVal) ))
            const dbRec =  await getDocs(rec);
            if(dbRec?._docs?.length !== 0) {
                setPatientList(dbRec?._docs)
                setIsLoading(false)
                return
            }
            setPatientList([])
            setIsLoading(false)

            console.log("g", dbRec)
        } catch(e) {
            setIsLoading(false)
            alert("someting went wrong ")
        }

    }

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
                <div style={multiline ? styles.multilineInputContainer : styles.input}>
                    {renderInput(placeholder, val, setVal, multiline)}
                
                </div>
            </div>
        )
    }

    const navigation = useNavigate()
    const registerNewPatient = () => {
        navigation('/Home')
    }

    const onPressPatient = (val) => {
        navigation(`/Home?data=${val?.patinetID?.integerValue}`)
    }

    const renderItem = (item) => {
        console.log("item ", item)
        const val = item?._document?.data?.value?.mapValue?.fields
        console.log("vale", val)
        return (
            <div onClick={() => onPressPatient(val)} style={styles.itemContainer}>
                <p style={styles.inputText}>Patient Name :- {val?.patientName?.stringValue}</p>
                <p style={styles.inputText}>Patient Age :- {val?.patientAge?.stringValue}</p>
            </div>
        )
    }

  return (
    <div style={styles.rootContainer}>
        <div style={styles.mainContainers}>
            <p style={styles.title}>
                {/* Welcome To Paramashetti Multispeciality hospital */}
                Welcome Back..
            </p>
        </div>
        <div style={styles.mainContainers}>
            <div style={styles.inputContainer}>
                    <p style={styles.searchP}>Search Patinet </p>
                    <div style={styles.searchContainer}> 
                        {renderTextInput("Patient ID", searchVal, setSearchVal)}
                        {
                            isLoading && <p style={styles.inputText}>Loading...</p>

                        }
                        {
                            !isLoading && patientList?.length === 0 && searchVal !== '' && <p style={styles.inputText}>No patient found with this id </p>
                        }
                        {
                            patientList?.length > 0 && patientList?.map((item)=> {
                                return renderItem(item)
                            })
                        }
                    </div>
                    <button onClick={registerNewPatient}  style={styles.printStyle}>Register New Patient </button>
            </div>
        </div>
    </div>
  )
}

const styles = {
    rootContainer: {
        display: 'flex',
        flex :1,
        flexDirection: 'row',
        backgroundColor: '#3498DB',
        flexWrap: 'wrap'
    },
    mainContainers: {
        flex: 1,
        display: 'flex',
        height: '100%',
        height: window.innerHeight,
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        padding: 10,
        fontSize: 60,
        fontWeight: 'bold',
        textAlign: 'center',
        color: 'white',
        // fontFamily: 'roboto'
    },
    inputContainer: {
        // border: '1px solid red' ,
        width: '90%',
        height: '60%',
        borderRadius: 10,
        padding: 20,
        backgroundColor: '#fff',
        display: 'flex',
        flexDirection: 'column'
    },
    searchP: {
        fontSize: 40,
        fontWeight: 'bold',
        // fontFamily: 'roboto',
        textAlign: 'center'
    },
    printStyle: {
        // width: '60%',
        height: 60,
        borderRadius: 10,
        border: '0',
        backgroundColor: '#3498db',
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
        margin: 10,
        // flex: 1
    },
    input: {
        // border: '1px solid black',
        padding: 10,
        borderRadius: 10,
        border: '0.3px solid gray'
        // backgroundColor: '#eeeee4'
    },
    inputMainContainer: {
        padding: 10
    },
    inputText: {
        fontSize: 16,
        fontWeight: 'bold',
        paddingBottom: 10
    },
    searchContainer: {
        flex: 1
    },
    textInput: {
        border: '0px solid black',
        fontSize: 16,
        outline: 'none',
        width: '100%',
        // backgroundColor: '#eeeee4'
    },
    itemContainer: {
        border: '1px solid black',
        borderRadius: 10,
        padding: 10,
        margin: 10
    }
}

export default WelcomeScreen