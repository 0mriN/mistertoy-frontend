import { useNavigate, useParams } from "react-router-dom"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"
import { toyService } from "../services/toy.service.js"
import { useEffect, useState } from "react"

function getEmptyMsg() {
    return {
        txt: '',
    }
}

export function ToyDetails() {
    const [msg, setMsg] = useState(getEmptyMsg())
    const [toy, setToy] = useState(null)
    const params = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        const loadToy = async () => {
            try {
                const loadedToy = await toyService.get(params.toyId)
                setToy(loadedToy)
            } catch (err) {
                console.error('err:', err)
                showErrorMsg('Cannot load toy')
                navigate('/toy')
            }
        }
        loadToy()
    }, [params.toyId, navigate])

    function onBack() {
        navigate('/toy')
    }

    function handleMsgChange(ev) {
        const field = ev.target.name
        const value = ev.target.value
        setMsg((msg) => ({ ...msg, [field]: value }))
    }

    async function onSaveMsg(ev) {
        ev.preventDefault()
        const savedMsg = await toyService.addMsg(toy._id, msg.txt)
        setToy((prevToy) => ({
            ...prevToy,
            msgs: [...(prevToy.msgs || []), savedMsg],
        }))
        setMsg(getEmptyMsg())
        showSuccessMsg('Msg saved!')
    }

    async function onRemoveMsg(msgId) {
        const removedMsgId = await toyService.removeMsg(toy._id, msgId)
        setToy((prevToy) => ({
            ...prevToy,
            msgs: prevToy.msgs.filter((msg) => removedMsgId !== msg.id),
        }))
        showSuccessMsg('Msg removed!')
    }

    const { txt } = msg

    if (!toy) return <div>Loading...</div>

    return (
        <section className="toy-details">

            <h1>Toy Name: {toy.name}</h1>
            <h2>Toy Price: ${toy.price}</h2>
            <img src={`https://robohash.org/${toy._id}?set=set1`} alt="robot pic.."></img>
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Enim rem accusantium, itaque ut voluptates quo? Vitae animi maiores nisi, assumenda molestias odit provident quaerat accusamus, reprehenderit impedit, possimus est ad?</p>
            <ul>
                {toy.msgs &&
                    toy.msgs.map((msg) => (
                        <li key={msg.id}>
                            By:{msg.by.fullname} - {msg.txt}
                            <button type="button" onClick={() => onRemoveMsg(msg.id)}>X</button>
                        </li>
                    ))}
            </ul>
            <form className="login-form" onSubmit={onSaveMsg}>
                <input
                    type="text"
                    name="txt"
                    value={txt}
                    placeholder="Add msg"
                    onChange={handleMsgChange}
                    required
                    autoFocus
                />
                <button>Send</button>
            </form>
            <button onClick={onBack}>Back</button>

        </section>
    )
}