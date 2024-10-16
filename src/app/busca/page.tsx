"use client";
import { useContext, useState } from "react";
import { useRouter } from "next/navigation";
import { Header } from "@/components/Header/Header";
import { Input } from "@/components/Input/Input";
import { Button } from "@/components/Button/Button";
import UserContext from "@/context/UserContext";



export default function Busca() {

    const router = useRouter();
    const [cityName, setCityName] = useState<string>("");
    const [cityList, setCityList] = useState([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const { userName } = useContext(UserContext) ?? {};

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCityName(event.target.value);
    };

    const loadCities = async () => {

        setCityList([]);
        
        if (!cityName.trim()) {
        alert("Digite o nome de uma cidade para buscar.");
        return;
        }

        setIsLoading(true);
        try {
        const response = await fetch(
            `https://brasilapi.com.br/api/cptec/v1/cidade/${cityName}`
        );
        const data = await response.json();
        setCityList(data);
        } catch (error) {
        console.log(error);
        } finally {
        setIsLoading(false);
        }
    };

    const handleClick = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault(); // Previne o comportamento padrão de recarregar a página
        loadCities();
    };

    const handleNavigate = (cityCode: number) => {
        router.push(`/?cityCode=${cityCode}`);
    };

    return (
        <>
        <Header title="Busca" userName={userName} />
        <form onSubmit={handleClick}>
            <Input
            label="Buscar cidade"
            id="search"
            name="search"
            type="text"
            value={cityName}
            onChange={handleChange}
            />
            <Button type="submit">Buscar</Button>
        </form>

        <div>
            {isLoading ? (
            <p>Carregando...</p>
            ) : (
            <ul>
                {cityList.length > 0 ? (
                cityList.map((city) => (
                    <li
                    key={city.id}
                    onClick={() => handleNavigate(city.id)}
                    style={{ cursor: "pointer", marginBottom: "8px" }}
                    >
                    {city.nome} / {city.estado}
                    </li>
                ))
                ) : (
                <p>Nenhuma cidade encontrada.</p>
                )}
            </ul>
            )}
        </div>
        </>
    );
}
