import { useState } from "react"


export function Home() {
    
    const [isOn, setIsOn] = useState(false)

    return (
        <section className="home">
            <h1>Toy's R Us!</h1>
        </section>
    )
}