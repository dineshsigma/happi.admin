function Avatar(props) {

    const avatar = {
        width: '32px',
        height: '32px',
        background: `var(${props.color})`,
        borderRadius: '100%',
        border: '1px solid white'
    };

    return (
        <div>
            {props.image ? <img style={avatar} className='d-flex align-items-center justify-content-center text-center' src={props.image} /> :
                <div style={avatar} className='d-flex align-items-center justify-content-center text-center'>
                    <span>{props.initials}</span>
                </div>
            }
        </div>
    );
}


export default Avatar;