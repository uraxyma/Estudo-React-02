import { db } from "../firebase/config";

import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
    signOut
} from "firebase/auth";

import { useState, useEffect } from "react";

export const useAuthentication = () => {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(null);

    // Cleanup 
    // deal with memory leak
    const [cancelled, setCancelled] = useState(false);

    const auth = getAuth();

    function checkIfIsCancelled() {
        if (cancelled) {
            return;
        };
    };

    const createUser = async (data) => {
        checkIfIsCancelled();

        setLoading(true);
        setError(null);

        try {
            const { user } = await createUserWithEmailAndPassword(
                auth,
                data.email,
                data.password
            );

            await updateProfile(user, {
                displayName: data.displayName
            });

            setLoading(false);

            return user;
        } catch (error) {
            console.log(error.message);
            console.log(typeof error.message);

            let systemErrorMessage;

            if (error.message.includes("Password")) {
                systemErrorMessage = "A senha precisa conter pelo menos  6 caracteres!!";
            } else if (error.message.include("email-already")) {
                systemErrorMessage = "E-mail ja cadastrado!!";
            } else {
                systemErrorMessage = "Ocorreu um erro, por favor tente novamente mais tarde!!";
            }

            setLoading(false);
            setError(systemErrorMessage);
        }
    };

    // logout < sign out

    const logout = () => {
        checkIfIsCancelled();

        signOut(auth);
    };

    // login < sign in

    const login = async (data) => {

        checkIfIsCancelled();

        setLoading(true);
        setError(false);

        try {
            await signInWithEmailAndPassword(auth, data.email, data.password);
            setLoading(false);
        } catch (error) {

            let systemErrorMessage;
            console.log(systemErrorMessage);

            // credenciais do firebase mudaram e mesmo seguindo adocumentação continua dando erro de credenciais
            if (error.message.includes("user-not-found")) {
                systemErrorMessage = "Usuário não encontrado.";
            } else if (error.message.includes("wrong-password")) {
                systemErrorMessage = "Senha incorreta.";
            } else {
                systemErrorMessage = "Ocorreu um erro, por favor tente novamente mais tarde";
            }

            setError(systemErrorMessage);
            setLoading(false);

        }

    };

    useEffect(() => {
        return () => setCancelled(true);
    }, []);

    return {
        auth,
        createUser,
        error,
        loading,
        logout,
        login,
    };
};