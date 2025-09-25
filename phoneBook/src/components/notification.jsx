const Notification = (props) => {
console.log("notification", props )
const {message, type} = props 
if(message === null){
    return null
}

const baseStyle = {

    color: type === 'error' ? 'red' : 'green',
    fontSize: 16,
    border: `2px solid ${type === 'error' ? 'red' : 'green'}`,
    borderRadius: 5,
    padding: '10px',
    marginBottom: '10px',
}
return (
    <div style={baseStyle}>
        {message}
    </div>
)
}

export default Notification