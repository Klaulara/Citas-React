const Error = ({mensaje}) => {
    return (
        <div className="bg-red-800 shadow-md rounded-lg py-3 px-5 mb-10">
            <p>{mensaje}</p>
        </div>
    )
}

export default Error