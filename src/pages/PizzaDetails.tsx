import axios from "axios";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import { IPizza } from "../components/PizzaBlock";

const PizzaDetails: React.FC = observer(() => {
  const { id } = useParams();
  const [pizza, setPizza] = useState<IPizza>();
  const navigate = useNavigate();

  useEffect(() => {
    const getPizza = async (id: string) => {
      try {
        const { data } = await axios.get(
          "https://660bdea73a0766e85dbcc139.mockapi.io/items/" + id
        );
        setPizza(data);
      } catch (error) {
        alert("Пицца не найдена");
        navigate("/");
      }
    };
    if (id) {
      getPizza(id);
    }
  }, []);

  return (
    <div className="container">
      {pizza ? (
        <div className="content__pizza-details">
          <Link to="/" className="button button--outline button--go-back">
            <svg
              width="8"
              height="14"
              viewBox="0 0 8 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7 13L1 6.93015L6.86175 1"
                stroke="#D3D3D3"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            <span>Вернуться назад</span>
          </Link>
          <img src={pizza.imageUrl} />
          <h2>{pizza.title}</h2>
          <h4>{pizza.price} ₽</h4>
        </div>
      ) : (
        <h4>Загрузка...</h4>
      )}
    </div>
  );
});

export default PizzaDetails;
