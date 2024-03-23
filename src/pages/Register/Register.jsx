import { useAuthentication } from "../../hooks/useAuthentication";
import styles from "./Register.module.css";

import { useState, useEffect } from "react";

const Register = () => {
    const [displayName, setDisplayName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");

    const { createUser, error: authError, loading } = useAuthentication();

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");

        const user = {
            displayName,
            email,
            password
        };

        if (password !== confirmPassword) {
            setError("As senhas não coincidem!!");
            return;
        }

        const res = await createUser(user);

        console.log(res);
    };

    useEffect(() => {
        if (authError);
    }, [authError]);

    return (
        <div className={styles.register}>
            <h1>Cadastre-se Para Poder Postar</h1>
            <p className={styles.paragrafo}>

                <span className={styles.sub}>&lt;</span>
                Crie seu usuário e compartilhe suas Histórias!
                <span className={styles.sub}>/&gt;</span>
            </p>
            <form onSubmit={handleSubmit}>
                <label>
                    <span>Nome:</span>
                    <input
                        type="text" name="displayName"
                        required
                        placeholder="Nome do usuário"
                        value={displayName}
                        onChange={(e) => setDisplayName(e.target.value)}
                    />
                </label>
                <label>
                    <span>E-mail:</span>
                    <input
                        type="email"
                        name="email"
                        required
                        placeholder="E-mail do usuário"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </label>

                <label>
                    <span>Senha:</span>
                    <input
                        type="password"
                        name="password"
                        required
                        placeholder="Insira sua Senha:"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </label>

                <label>
                    <span>Confirme a sua Senha:</span>
                    <input
                        type="password"
                        name="confirmPassword"
                        required
                        placeholder="Repita a Senha:"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </label>
                {!loading && <button className="btn">Cadastrar</button>}
                {loading && <button className="btn" disabled>Aguarde...</button>}
                {error && <p className="error">{error}</p>}
            </form>
        </div>
    );
};

export default Register;