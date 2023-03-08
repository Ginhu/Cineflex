import axios from "axios"
import { useEffect, useState } from "react"
import styled from "styled-components"

export default function SeatsPage(props) {

    const [seats, SetSeats] = useState([])
    const [availableSeats, setAvailableSeats] = useState([])
    let arr = [];
    const [seatsOptions, setSeatsOptions] = useState(["Selecionado", "Disponível", "Indisponível"])
    const [selectedSeats, setSelectedSeats] = useState([])
    const [detailsMovie, setDetailsMovie] = useState([])
    useEffect(()=>{
        axios.get(`https://mock-api.driven.com.br/api/v8/cineflex/showtimes/${props.idSession}/seats`).then((response)=>{
            /* const resp = response.data.seats */
            const details = response.data
            SetSeats(details.seats)
            setDetailsMovie(details)
            details.seats.forEach((element)=>{
                if(element.isAvailable && !arr.includes(element.name)) {
                    arr.push(element.name)
                }
            })
            setAvailableSeats(arr)
        })
    },[])

    function selectSeats(seatName) {
        if(selectedSeats.includes(seatName)) {
            arr = selectedSeats.filter(word => !word.includes(seatName))
            setSelectedSeats(arr)
        } else if (availableSeats.includes(seatName)) {
            setSelectedSeats([...selectedSeats, seatName])
        } else {
            alert('Esse assento não está disponível')
        }
    }

    if(detailsMovie.length === 0) {
        return "Loading"
    }

    return (
        <PageContainer>
            Selecione o(s) assento(s)

            <SeatsContainer>
                {seats.map((el)=><SeatItem key={el.id} selectedSeats={selectedSeats} availableSeats={availableSeats} name={el.name} onClick={()=>selectSeats(el.name)}>{el.name}</SeatItem>)}
            </SeatsContainer>

            <CaptionContainer>
                {seatsOptions.map((el)=>
                <CaptionItem key={el}>
                    <CaptionCircle name={el}/>
                    {el}
                </CaptionItem>)}
            </CaptionContainer>

            <FormContainer>
                Nome do Comprador:
                <input placeholder="Digite seu nome..." />

                CPF do Comprador:
                <input placeholder="Digite seu CPF..." />

                <button>Reservar Assento(s)</button>
            </FormContainer>

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

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: 'Roboto';
    font-size: 24px;
    text-align: center;
    color: #293845;
    margin-top: 30px;
    padding-bottom: 120px;
    padding-top: 70px;
`
const SeatsContainer = styled.div`
    width: 330px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
`
const FormContainer = styled.div`
    width: calc(100vw - 40px); 
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin: 20px 0;
    font-size: 18px;
    button {
        align-self: center;
    }
    input {
        width: calc(100vw - 60px);
    }
`
const CaptionContainer = styled.div`
    display: flex;
    flex-direction: row;
    width: 300px;
    justify-content: space-between;
    margin: 20px;
`
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
const CaptionItem = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 12px;
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
const FooterContainer = styled.div`
    width: 100%;
    height: 120px;
    background-color: #C3CFD9;
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 20px;
    position: fixed;
    bottom: 0;

    div:nth-child(1) {
        box-shadow: 0px 2px 4px 2px #0000001A;
        border-radius: 3px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: white;
        margin: 12px;
        img {
            width: 50px;
            height: 70px;
            padding: 8px;
        }
    }

    div:nth-child(2) {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        p {
            text-align: left;
            &:nth-child(2) {
                margin-top: 10px;
            }
        }
    }
`