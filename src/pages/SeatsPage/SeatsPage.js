import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import styled from "styled-components"
import {PageContainer, SeatsContainer, FormContainer, CaptionContainer, CaptionItem, FooterContainer} from "./SeatsPageStyled"

export default function SeatsPage(props) {

    const [seats, SetSeats] = useState([])
    const [seatsOptions, setSeatsOptions] = useState(["Selecionado", "Disponível", "Indisponível"])
    const [detailsMovie, setDetailsMovie] = useState([])
    const {idSessao} = useParams()
    const navigate = useNavigate()
    let arr = [] 
    let arrIds = []
    const post = {ids: [], name: "", cpf: ""}
    

    useEffect(()=>{
        axios.get(`https://mock-api.driven.com.br/api/v8/cineflex/showtimes/${idSessao}/seats`).then((response)=>{
            /* const resp = response.data.seats */
            
            const details = response.data
            SetSeats(details.seats)
            setDetailsMovie(details)
            details.seats.forEach((element)=>{
                if(element.isAvailable && !arr.includes(element.name)) {
                    arr.push(element.name)
                }
            })
            props.setAvailableSeats(arr)
        })
    },[])

    function selectSeats(seatName, seatId) {
        
        if(props.selectedSeats.includes(seatName)) {
            arr = props.selectedSeats.filter(word => !word.includes(seatName))
            arrIds = props.selectedSeatsIds.filter(word => !word.includes(seatId))
            props.setSelectedSeats(arr)
            props.setSelectedSeatsIds(arrIds)
        } else if (props.availableSeats.includes(seatName)) {
            props.setSelectedSeats([...props.selectedSeats, seatName])
            props.setSelectedSeatsIds([...props.selectedSeatsIds, `${seatId}`])
        } else {
            alert('Esse assento não está disponível')
        }
    }

    function submitForm(event) {
        event.preventDefault()
        props.setMovieData(detailsMovie)
        post.ids = props.selectedSeatsIds
        post.name = props.buyerName
        post.cpf = props.cpf
        axios.post("https://mock-api.driven.com.br/api/v8/cineflex/seats/book-many", post).then(navigate("/sucesso")).catch(err=>alert(err))
    }


    if(detailsMovie.length === 0) {
        return "Loading"
    }

    return (
        <PageContainer>
            Selecione o(s) assento(s)

            <SeatsContainer>
                {seats.map((el)=><SeatItem key={el.id} selectedSeats={props.selectedSeats} availableSeats={props.availableSeats} name={el.name} onClick={()=>selectSeats(el.name, el.id)}>{el.name}</SeatItem>)}
            </SeatsContainer>

            <CaptionContainer>
                {seatsOptions.map((el)=>
                <CaptionItem key={el}>
                    <CaptionCircle name={el}/>
                    {el}
                </CaptionItem>)}
            </CaptionContainer>
            
            <form onSubmit={submitForm}>
            <FormContainer>
                Nome do Comprador:
                <input placeholder="Digite seu nome..." 
                onChange={(e)=>props.setBuyerName(e.target.value)}
                value={props.buyerName}
                />
                

                CPF do Comprador:
                <input placeholder="Digite seu CPF..." 
                onChange={(e)=>props.setCpf(e.target.value)}
                value={props.cpf}
                />
                

                <button>Reservar Assento(s)</button>
            </FormContainer>
            </form>

            <FooterContainer>
                <div>
                    <img src={detailsMovie.movie.posterURL} alt="poster" />
                </div>
                <div>
                    <p>{detailsMovie.movie.title}</p>
                    <p>{detailsMovie.day.weekday} - {detailsMovie.name}</p>
                </div>
            </FooterContainer>

        </PageContainer>
    )
}

const CaptionCircle = styled.div`
border: 1px solid ${props=>(props.name === "Selecionado" && "#0E7D71") || (props.name === "Disponível" && "#7B8B99") || (props.name === "Indisponível" && "#F7C52B")};
background-color: ${props=>(props.name === "Selecionado" && "#1AAE9E") || (props.name === "Disponível" && "#C3CFD9") || (props.name === "Indisponível" && "#FBE192")};
height: 25px;
width: 25px;
border-radius: 25px;
display: flex;
align-items: center;
justify-content: center;
margin: 5px 3px;
`

const SeatItem = styled.div`
border: 1px solid ${props=>(!props.availableSeats.includes(props.name) && "#F7C52B") || (props.selectedSeats.includes(props.name) && "#0E7D71") || (props.availableSeats.includes(props.name) && "#808F9D")};
background-color: ${props=>(!props.availableSeats.includes(props.name) && "#FBE192") || (props.selectedSeats.includes(props.name) && "#1AAE9E") || (props.availableSeats.includes(props.name) && "#C3CFD9")};    
height: 25px;
width: 25px;
border-radius: 25px;
font-family: 'Roboto';
font-size: 11px;
display: flex;
align-items: center;
justify-content: center;
margin: 5px 3px;
`






