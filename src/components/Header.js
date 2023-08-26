import React from 'react'
const Header = () => {
  return (
    <div style={styles.mainContainer}>
         {/* <img src={logo} height={'90%'}/> */}
        <h2 style={styles.title}>PARAMASHETTI MULTISPECIALITY HOSPITAL</h2>
         
    </div>
  )
}

const styles = {
    mainContainer: {
        backgroundColor: '#3498db',
        height: 60,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        textAlign: 'center',
        width: '100%',
        padding: 15,
        color: '#fff',
        fontSize: 25
    },
}

export default Header