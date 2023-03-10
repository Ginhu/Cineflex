import { useState } from "react"
import styled from "styled-components"
import HomePage from "./pages/HomePage/HomePage"
import SeatsPage from "./pages/SeatsPage/SeatsPage"
import SessionsPage from "./pages/SessionsPage/SessionsPage"
import SuccessPage from "./pages/SuccessPage/SuccessPage"
import { BrowserRouter, Routes, Route } from "react-router-dom";

export default function App() {

    const [cpf, setCpf] = useState("")
    const [buyerName, setBuyerName] = useState("")
    const [availableSeats, setAvailableSeats] = useState([])
    const [selectedSeatsIds, setSelectedSeatsIds] = useState([])
    const [movieData, setMovieData] = useState([])
    const [selectedSeats, setSelectedSeats] = useState([])

    return (
        <BrowserRouter>
            <NavContainer>CINEFLEX</NavContainer>
            <Routes>
                <Route path="/" element={<HomePage/>}/>
                <Route path="/assentos/:idSessao" element={<SeatsPage 
                cpf={cpf} setCpf={setCpf}
                buyerName={buyerName} setBuyerName={setBuyerName} 
                setMovieData={setMovieData} availableSeats={availableSeats} setAvailableSeats={setAvailableSeats}
                selectedSeatsIds = {selectedSeatsIds} setSelectedSeatsIds={setSelectedSeatsIds}
                selectedSeats={selectedSeats} setSelectedSeats={setSelectedSeats}
                />}/>
                <Route path="/sessoes/:idFilme" element={<SessionsPage />}/>
                <Route path="/sucesso" element={<SuccessPage cpf={cpf} buyerName={buyerName} selectedSeats={selectedSeats}
                movieData={movieData}
                />} 
                />
            </Routes>
        </BrowserRouter>
    )
}


const NavContainer = styled.div`
    width: 100%;
    height: 70px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #C3CFD9;
    color: #E8833A;
    font-family: 'Roboto', sans-serif;
    font-size: 34px;
    position: fixed;
    top: 0;
    a {
        text-decoration: none;
        color: #E8833A;
    }
`
