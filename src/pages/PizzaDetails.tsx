import axios from "axios";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { IPizza } from "../components/PizzaBlock";

const PizzaDetails = observer(() => {
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
