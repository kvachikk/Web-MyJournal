import React, { useEffect, useState } from "react";
import * as campus from "../services/APIServices.tsx";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const [login, setLogin] = useState("");
    const navigate = useNavigate();
    const [password, setPassword] = useState("");
    const [inputType, setInputType] = useState("password");
    const [icon, setIcon] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [authFail, setAuthFail] = useState(false);

    useEffect(() => {
        const isAuth = JSON.parse(localStorage.getItem("asc") || "false");
        if (isAuth) navigate("/");
    }, []);

    const startLogin = async (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, login: string, password: string) => {
        e.preventDefault();
        setIsLoading(true);

        const authorizedUserCredentials = await campus.login(login, password);
        setAuthFail(!authorizedUserCredentials);
        if (authorizedUserCredentials) navigate("/");

        setIsLoading(false);
    };

    const handleToggle = () => {
        setInputType((prevType) => (prevType === "password" ? "text" : "password"));
        // setIcon((prevIcon) =>
        //     prevIcon.type === VisibilityOutlinedIcon ? <VisibilityOffOutlinedIcon/> : <VisibilityOutlinedIcon/>
        // );
    };

    return (
        <div style={{ position: "absolute", top: "40%", left: "50%", transform: "translate(-50%, -50%)" }}>
            <input name="login" type="text" value={login} onChange={(e) => setLogin(e.target.value)}
                placeholder="student37" />
            <input name="password" type={inputType} placeholder="qwerty" value={password}
                onChange={(e) => setPassword(e.target.value)} />
            <button type="submit" onClick={(e) => startLogin(e, login, password)}>
                Увійти
            </button>
        </div>
    );
}

{/* <Sheet sx={{
    width: 455,
    height: 380,
    mx: "auto",
    py: 5,
    px: 3,
    display: "flex",
    flexDirection: "column",
    gap: 2,
    borderRadius: "sm",
    boxShadow: "sm"
}} variant="outlined">
    <Typography level="h1" component="h1">
        <b>Вітаєм!</b>
    </Typography>
    <Typography level="body-lg">Ви можете використати Ваш логін в <b>Campus</b></Typography>

    <FormControl>
        <FormLabel>Логін</FormLabel>
        <Input name="login" type="text" size="lg" value={login} onChange={(e) => setLogin(e.target.value)}
            placeholder="student37" />
    </FormControl>

    <FormControl style={{ display: "flex" }}>
        <FormLabel>Пароль</FormLabel>
        <Input name="password" type={inputType} size="lg" placeholder="qwerty" value={password}
            onChange={(e) => setPassword(e.target.value)} />
        <span className="input-icon" onClick={handleToggle}
            style={{ right: "25px", top: "52%", cursor: "pointer", position: "absolute" }}>{icon}</span>
    </FormControl>

    {isLoading ? (
        <Button size="lg" sx={{ mt: 2 }} disabled>
            <CircularProgress sx={{ mr: 2 }} />
            Виконується вхід
        </Button>
    ) : (
        <Button type="submit" size="lg" sx={{ mt: 2 }} onClick={(e) => startLogin(e, login, password)}>
            Увійти
        </Button>
    )}

    {authFail && (
        <FormControl error>
            <FormHelperText>
                {/* <InfoOutlined/>Неправильний логін або пароль */}
//             </FormHelperText>
//         </FormControl>
//     )}
// </Sheet> */}