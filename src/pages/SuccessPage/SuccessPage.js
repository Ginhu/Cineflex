import { Link } from "react-router-dom"
import { PageContainer, TextContainer } from "./SuccessPageStyled"

export default function SuccessPage(props) {

    return (
        <PageContainer>
            <h1>Pedido feito <br /> com sucesso!</h1>

            <TextContainer>
                <strong><p>Filme e sessão</p></strong>
                <p>{props.movieData.movie.title}</p>
                <p>{props.movieData.day.date} - {props.movieData.name}</p>
            </TextContainer>

            <TextContainer>
                <strong><p>Ingressos</p></strong>
                {props.selectedSeats.map(el=> <p key={el}>Assento {el}</p>)}
            </TextContainer>

            <TextContainer>
                <strong><p>Comprador</p></strong>
                <p>Nome: {props.buyerName}</p>
                <p>CPF: {props.cpf}</p>
            </TextContainer>
            <Link to="/">
            <button>Voltar para Home</button>
            </Link>
        </PageContainer>
    )
}


