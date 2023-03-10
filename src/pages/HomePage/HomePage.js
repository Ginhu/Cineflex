import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { PageContainer, ListContainer, MovieContainer } from "./HomePageStyled"

export default function HomePage(props) {

    const [movieList, setMovieList] = useState([])

    useEffect(()=>{
        axios.get("https://mock-api.driven.com.br/api/v8/cineflex/movies").then(response=> setMovieList(response.data))
    },[])



    return (
        <PageContainer>
            Selecione o filme

            <ListContainer>
                {movieList.map((el)=>
                <MovieContainer key={el.id} >
                    <Link to={`/sessoes/${el.id}`}>
                        <img src={el.posterURL} alt="poster"/>
                    </Link>
                </MovieContainer>)}
            </ListContainer>

        </PageContainer>
    )
}





