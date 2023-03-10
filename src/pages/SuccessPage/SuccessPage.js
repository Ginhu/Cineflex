import { Link } from "react-router-dom"
import { PageContainer, TextContainer } from "./SuccessPageStyled"

export default function SuccessPage(props) {

    return (
        <PageContainer>
            <h1>Pedido feito <br /> com sucesso!</h1>

            <TextContainer>
                <div data-test="movie-info">
                <strong><p>Filme e sessão</p></strong>
                <p>{props.movieData.movie.title}</p>
                <p>{props.movieData.day.date} - {props.movieData.name}</p>
                </div>
            </TextContainer>

            <TextContainer>
                <div data-test="seats-info">
                <strong><p>Ingressos</p></strong>
                {props.selectedSeats.map(el=> <p key={el}>Assento {el}</p>)}
                </div>
            </TextContainer>

            <TextContainer>
                <div data-test="client-info">
                <strong><p>Comprador</p></strong>
                <p>Nome: {props.buyerName}</p>
                <p>CPF: {props.cpf}</p>
                </div>
            </TextContainer>
            <Link to="/">
            <button data-test="go-home-btn">Voltar para Home</button>
            </Link>
        </PageContainer>
    )
}


