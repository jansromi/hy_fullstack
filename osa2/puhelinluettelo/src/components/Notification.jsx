const Notification = ({ message, alert }) => {
    if (message == null) {
        return null;
    }

    let notificationStyle = {
        fontStyle: 'italic',
        fontSize: 16,
        borderStyle: 'solid',
        borderRadius: '5px',
        padding: '10px',
        marginBottom: '10px'
    };

    if (alert === true) {
        notificationStyle = {
            ...notificationStyle,
            color: 'red'
        };
    } else {
        notificationStyle = {
            ...notificationStyle,
            color: 'green'
        };
    }
    
    return (
        <div style={notificationStyle}>
            <h1>{message}</h1>
        </div>
    );
}

export default Notification;
