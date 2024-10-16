"use client";
import { Header } from "@/components/Header/Header";
import UserContext from "@/context/UserContext";
import { useContext } from "react";

export default function Favoritos() {
    const { userName } = useContext(UserContext) ?? {};

    return (
        <>
            <Header title="Favoritos" userName={userName} />
        </>
    );
}
