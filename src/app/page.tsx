"use client";
import { Header } from "@/components/Header/Header";
import UserContext from "@/context/UserContext";
import { useContext, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";



export default function Home() {
    const searchParams = useSearchParams();
    const cityCode = searchParams.get("cityCode") || "244";
    const { userName } = useContext(UserContext);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [cityData, setCityData] = useState(null);
    const [forecast, setForecast] = useState([]);

    const dateFormat = (data: string) => {
        return new Date(data).toLocaleDateString("pt-br", { timeZone: "UTC" });
    };

    const loadCity = async (cityCode: string) => {
        setIsLoading(true);
        try {
        const response = await fetch(
            `https://brasilapi.com.br/api/cptec/v1/clima/previsao/${cityCode}`
        );
        const data = await response.json();
        setCityData(data);
        } catch (error) {
        console.log(error);
        } finally {
        setIsLoading(false);
        }
    };

    const loadForecast = async (cityCode: string) => {
        setIsLoading(true);
        try {
        const response = await fetch(
            `https://brasilapi.com.br/api/cptec/v1/clima/previsao/${cityCode}/6`
        );
        const data = await response.json();
        setForecast(data.clima);
        } catch (error) {
        console.log(error);
        } finally {
        setIsLoading(false);
        }
    };

    useEffect(() => {
        loadCity(cityCode);
        loadForecast(cityCode);
    }, [cityCode]);

    return (
        <>
        <Header title="Home" userName={userName} />
        <div>
            {isLoading ? (
            <p>Carregando...</p>
            ) : (
            <div>
            
            {cityData && cityData.clima && cityData.clima.length > 0 && (
                <div>
                    <h2>
                    {cityData.cidade}/{cityData.estado}
                    </h2>
                    <p>
                    Min <span>{cityData.clima[0].min}&#176; Graus</span> 
                    / Max <span>{cityData.clima[0].max}&#176; Graus</span>
                    </p>
                    <p>Condição: {cityData.clima[0].condicao_desc}</p>
                    {forecast.length > 0 &&
                
                forecast.map((item) => (
                <div key={item.data}>
                    <span>{dateFormat(item.data)} - </span>
                    <span>| {item.condicao_desc} | </span>
                    <span>Min: {item.min}&#176; Graus /  </span>
                    <span>Max: {item.max}&#176; Graus</span>
                </div>
                ))}
                </div>
                )}
            </div>
            )}
        </div>
        </>
    );
}
