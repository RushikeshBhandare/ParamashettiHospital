import React, { forwardRef } from 'react'
import logo from '../Assets/PLogo.png'

const dummyTex = `It has survived not, but also the It has survived not, but also the It has survived not, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem`
const singal = ` is simply dummy typesetting industry. Lorem Ipsum has been the industry's `

const contactInfo = <p>When and how to obtain emergency in case of Chest pain, Breathlessness, Syncope, Fever, Cough, <br/> Weakness, Drug Allergy, Convulsion, Failure to Thrive <br/> Contact this No : 0233 - 2212430 / 033 - 2212431 Dr. Paramashetti 9422040430</p>
const emergencyNo = `0233 - 2212430 / 0233 - 2212431 Mr. Shaikh - 9767091351`



const  PdfView = forwardRef((props, ref) => {
    const  {
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
      } = props.data
    console.log("props ", props)
    const renderHeader = () => {
        return(
            <div>
                <div style={styles.headerContainer}>
                    <img src={logo} width={110} height={60}/>
                    <h2 style={styles.title}>PARAMASHETTI MULTISPECIALITY HOSPITAL</h2>
                    <p style={styles.registrationId}>{patinetID}</p>
                </div>
                {renderSeprater()}
                <p style={styles.address}>Viswas Estate, Miraj - Sangli Road, Miraj - 416 410, Phone: 0233 - 2212430</p>
            </div>
        )
    }

    const renderSeprater = ( ) => {
        return (
            <div style={styles.seprater}></div>
        )
    }

    const renderMultiLineInfo = (name, info, singalLine, contactInfo, center) => {
        return (
            <div style={singalLine ? styles.singleLine : !center ? styles.multilineInfoMainContainer : {...styles.multilineInfoMainContainer, ...{display: 'flex', alignItems: 'center'}}}>
                     <p style={styles.multnineInfoTitle}>
                        {name}
                        <p style={contactInfo ? styles.contactInfo : styles.multilineInfoDesc }>
                            {info}
                        </p>
                    </p>
            </div>
        )
    }

    const renderSplitInfo = (t1, d1, t2, d2, showEqual) => {
        return (
            <div style={styles.splitInfoMainContainer}>
                <div style={styles.splitInfoFirstContainer}>
                     <p style={styles.multnineInfoTitle}>
                        {t1}
                        <p style={styles.multilineInfoDesc}>
                            {d1}
                        </p>
                    </p>
                </div>
                <div style={showEqual ? styles.splitThreeContainerThree :  styles.splitInfoSecondContainer}>
                     <p style={styles.multnineInfoTitle}>
                        {t2}
                        <p style={styles.multilineInfoDesc}>
                            {d2}
                        </p>
                    </p>
                </div>
            </div>
        )
    }

    const renderSplitThreeInfo = (t1, d1, t2, d2, t3, d3) => {
        return (
            <div style={styles.splitInfoMainContainer}>
                <div style={styles.splitThreeContainerOne}>
                     <p style={styles.multnineInfoTitle}>
                        {t1}
                        <p style={styles.multilineInfoDesc}>
                            {d1}
                        </p>
                    </p>
                </div>
                <div style={styles.splitThreeContainerTwo}>
                     <p style={styles.multnineInfoTitle}>
                        {t2}
                        <p style={styles.multilineInfoDesc}>
                            {d2}
                        </p>
                    </p>
                </div>
                <div style={styles.splitThreeContainerThree}>
                     <p style={styles.multnineInfoTitle}>
                        {t3}
                        <p style={styles.multilineInfoDesc}>
                            {d3}
                        </p>
                    </p>
                </div>
            </div>
        )
    }

    const renerSignature = (t1, d1, t2, d2,) => {
        return (
            <div style={styles.signatureMainContainer}>
            <div style={styles.splitInfoFirstContainer}>
                 <p style={styles.multnineInfoTitle}>
                    {t1}
                    <p style={styles.multilineInfoDesc}>
                        {d1}
                    </p>
                </p>
            </div>
            <div style={styles.splitInfoSecondContainer}>
                 <p style={styles.multnineInfoTitle}>
                    {t2}
                    <p style={styles.multilineInfoDesc}>
                        {d2}
                    </p>
                </p>
            </div>
        </div>
        )
    }



  return (
    <div ref={ref} style={styles.mainContainer}>
        <div style={styles.mainInnerContainer}>
            {renderHeader()}
            {renderSeprater()}

            {/* patient naeme  */}
            {renderSplitInfo('Patinet Name : ', patientName, "Age / Sex",  patientAge)}
            {renderSeprater()}

            {/* Name of Consulent */}
            {renderSplitInfo('Name of Consultsnt : ', nameOfConsultent, "Hosp No", hospNo)}
            {renderSeprater()}

            {/* date of admission  */}
            {renderSplitThreeInfo(
                'Date of Admission',
                `${dateOfAdmission?.getDate()} / ${dateOfAdmission?.getMonth()} / ${dateOfAdmission?.getYear()}`,
                'Date of Procedure',
                `${dateOfProcedure?.getDate()} / ${dateOfProcedure?.getMonth()} / ${dateOfProcedure?.getYear()}`,
                'Date of LAMA',
                `${dateOfLAMA?.getDate()} / ${dateOfLAMA?.getMonth()} / ${dateOfLAMA?.getYear()}`
            )}
            {renderSeprater()}

            {/* Insurance  */}
            {renderMultiLineInfo('Insurance / Non Insurance : ', insurance, true)}
            {renderSeprater()}

            {/* Clinical Diagnosis */}
            {renderMultiLineInfo('Clinical Diagnosis : ', clinicalDiagnosis, true)}
            {renderSeprater()}

            {/* Investigation with report Summery  */}
            {renderMultiLineInfo('Investigation with Report Summery : ', investigationReportSummery, true)}
            {renderSeprater()}

            

            {/* Blood Investigation*/}
            {renderSplitInfo('Blood Investigation : ', bloodInvestigation, "Biopsy", biopsy, true)}
            {renderSeprater()}

            {/* CT / MRT  */}
            {renderSplitInfo('CT/ MRT : ', ctOrMrii, "USG", usg, true)}
            {renderSeprater()}

            {/* X Ray  */}
            {renderSplitInfo('X Ray : ', xRay, "Others", other, true)}
            {renderSeprater()}


            {/* Clinical History  */}
            {renderMultiLineInfo('Clinical History : ', clinicalHistory)}
            {renderSeprater()}

            {/* Clinical Finding  */}
            {renderMultiLineInfo('Clinical Finding : ', clinicalFinding)}
            {renderSeprater()}

            {/* Name of procedure */}
            {renderMultiLineInfo('Name of Procedure : ', nameOfProcedure)}
            {renderSeprater()}

            {/* procedure details / Hospital course */}
            {renderMultiLineInfo('Procedure Detail / Hospital Course : ', procedureDetail)}
            {renderSeprater()}

            {/* Patients condition at discharge */}
            {renderMultiLineInfo('Patients Condition at Discharge : ', patientCondition)}
            {renderSeprater()}

            {/* Discharge Medication */}
            {renderMultiLineInfo('Discharge Medication : ', dischargeMedication)}
            {renderSeprater()}

            {/* discharge introduction */}
            {renderMultiLineInfo('Discharge Introduction : ', dischargeIntroduction, true)}
            {renderSeprater()}

            {/* Future Treatment Plan */}
            {renderMultiLineInfo('Future Treatment Plan : ', futureTreatmentPlan, true)}
            {renderSeprater()}

            {/* Follow up Date */}
            {renderMultiLineInfo('Follow up Date : ', followUp, true)}
            {renderSeprater()}
            
            {/* contact info  */}
            {renderMultiLineInfo('', contactInfo, false, true, true)}
            {renderSeprater()}

            {/* Emergency no  */}
            {renderMultiLineInfo('Emeregency Contact No: ', emergencyNo, true)}
            {renderSeprater()}

            {/* Treating Doctor */}
            {renerSignature('Treating Doctor : ', treatingDoctor, "Signature:")}


        </div>
    </div>
  )
})

const styles = {
    mainContainer: {
        backgroundColor: 'white',
        width: '210mm',
        height: '296mm',
        padding: 10 
    },
    headerContainer: {
        display: 'flex',
        flexDireaction: 'row',
        alignItems: 'center'
    },
    registrationId: {
        color: 'red',
        paddingRight: 10
    },
    mainInnerContainer: {
        border: '1px solid black',
        width: '100%',
        height: '100%'
    },
    title: {
        textAlign: 'center',
        padding: 10,
        paddingTop: 0,
        flex: 1
        // borderBottom: "1px solid black"
    },
    address: {
        textAlign: 'center',
        padding: 0,
        margin: 0,
        padding: 8,
        paddingTop: 0,
    },
    seprater: {
        borderBottom: "1px solid black"
    },
    multnineInfoTitle: {
        fontSize: 14,
        paddingLeft: 10,
        fontWeight: 'bold',
        paddingTop: 8,
        paddingBottom: 8
    },
    multilineInfoDesc: {
        fontSize: 14,
        paddingLeft: 10,
        display:'inline',
        fontWeight: 'normal',
        paddingTop: 8,
        paddingBottom: 8 ,
    },
    multilineInfoMainContainer: {
        height: 75
    },
    contactInfo: {
        fontSize: 14,
        fontWeight: 'normal',
        paddingTop: 8,
        paddingBottom: 8
    },
    splitInfoMainContainer: {
        display: 'flex',
        flexDireaction: 'row',
    },
    splitInfoFirstContainer: {
        flex: 1,
        borderRight: '1px solid black'
    },
    splitInfoSecondContainer: {
        width: '30%'
    },
    splitThreeContainerOne: {
        flex: 1,
        borderRight: '1px solid black'
    },
    splitThreeContainerTwo: {
        flex: 1,
        borderRight: '1px solid black'
    },
    splitThreeContainerThree: {
        flex: 1
    },
    signatureMainContainer: {
        // height: '100%',
        display: 'flex',
        flexDirection: 'row',
        flex: 1
    }
}

export default PdfView