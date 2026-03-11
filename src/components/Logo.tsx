import './Logo.css'

function Logo() {

    return (
        <>
            <div className="logo">
                <div className="dots">
                    {Array(9).fill(0).map((_, i) => (
                        <div key={i} className="dot" />
                    ))}
                </div>

                <div className='text'>
                    <h1>EESTI</h1>
                    <h1>STATISTIKA</h1>
                </div>

            </div>

        </>
    )
}

export default Logo