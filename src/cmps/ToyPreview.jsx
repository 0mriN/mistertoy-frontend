export function ToyPreview({ toy }) {
    return (
        <article className="toy-preview" >
            <h2>
                Toy: {toy.name}
            </h2>
            <img src={`https://robohash.org/${toy._id}?set=set1`} alt="robot pic.."></img>
            <h4>Price: {toy.price}</h4>
            <h5>In the store since: {toy.createdAt}</h5>
        </article>
    )
}
