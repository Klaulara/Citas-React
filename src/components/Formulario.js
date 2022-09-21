import {useState, useEffect} from 'react';
import Error from './Error';

const Formulario = ({pacientes, setPacientes, paciente, setPaciente}) => {
    const [nombre, setNombre] = useState('');
    const [propietario, setPropietario] = useState('');
    const [email, setEmail] = useState('');
    const [alta, setAlta] = useState('');
    const [sintoma, setSintoma] = useState('');
    const [error, setError] = useState(false);

    useEffect(()=>{
        if (Object.keys(paciente).length > 0) {
            setNombre(paciente.nombre)
            setPropietario(paciente.propietario)
            setEmail(paciente.email)
            setAlta(paciente.alta)
            setSintoma(paciente.sintoma)
        }
    }, [paciente])

    const generarId = () => {
        const random = Math.random().toString(36).substring(2);
        const fecha = Date.now().toString(36);
        return random + fecha;
    }

    const handlesubmit = (e) => {
        e.preventDefault();

        if([nombre, propietario, email, alta, sintoma].includes('')){
            setError(true);
            return;
        } 
        setError(false);

        const objetoPacientes = {
            nombre, 
            propietario, 
            email, 
            alta, 
            sintoma
        }
        if (paciente.id) {
            objetoPacientes.id = paciente.id;
            const pacientesActualizados = pacientes.map( pacienteState => pacienteState.id === paciente.id ? objetoPacientes : pacienteState);
            setPacientes(pacientesActualizados);
            setPaciente({});
        } else {
            objetoPacientes.id = generarId()
            setPacientes([...pacientes, objetoPacientes]);
        }

        
        setNombre('')
        setPropietario('')
        setEmail('')
        setAlta('')
        setSintoma('')
    }

  return (
    <div className="md:w-1/2 lg:w-2/5">
        <h2 className="font-black text-3xl text-center">Seguimiento de Pacientes</h2>
        <p className="text-lg mt-5 text-center mb-3">
            Añade Pacientes y {''}
            <span className="text-indigo-600 font-bold">Administralos</span>
        </p>
        <form onSubmit={handlesubmit} className="bg-white shadow-md rounded-lg py-10 px-5">
            { error && <Error mensaje='Todos los campos son obligatorios'/>}
            <div className="mb-5">
                <label htmlFor="mascota" className="block text-gray-700 uppercase font-bold">
                    Nombre Mascota
                </label>
                <input 
                    id="mascota" 
                    type="text" 
                    placeholder="Nombre de la Mascota" 
                    className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md" 
                    value={nombre}
                    onChange={(e)=> setNombre(e.target.value)}
                />
            </div>
            <div className="mb-5">
                <label htmlFor="propietario" className="block text-gray-700 uppercase font-bold">
                    Nombre Propietario
                </label>
                <input 
                    id="propietario" 
                    type="text" 
                    placeholder="Nombre del propietario" 
                    className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md" 
                    value={propietario}
                    onChange={(e)=> setPropietario(e.target.value)}
                />
            </div>
            <div className="mb-5">
                <label htmlFor="email" className="block text-gray-700 uppercase font-bold">
                    Email
                </label>
                <input 
                    id="email" 
                    type="text" 
                    placeholder="Email contacto propietario" 
                    className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md" 
                    value={email}
                    onChange={(e)=> setEmail(e.target.value)}
                />
            </div>
            <div className="mb-5">
                <label htmlFor="alta" className="block text-gray-700 uppercase font-bold">
                    Alta
                </label>
                <input 
                    id="alta" 
                    type="date" 
                    placeholder="alta" 
                    className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                    value={alta}
                    onChange={(e)=> setAlta(e.target.value)} 
                />
            </div>
            <div className="mb-5">
                <label htmlFor="sintomas" className="block text-gray-700 uppercase font-bold">
                    Sintomas
                </label>
                <textarea 
                    id="sintomas" 
                    placeholder="Describe los Sintomas" 
                    className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                    value={sintoma}
                    onChange={(e)=> setSintoma(e.target.value)} 
                />
            </div>

            <input 
                type="submit"
                className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700"
                value={ paciente.id ? 'Editar Paciente' : 'Agregar Paciente'}
            />

        </form>
    </div>
  ) 
};

export default Formulario;
