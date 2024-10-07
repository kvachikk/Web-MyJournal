import React from "react";

export interface LoginFormProps {
    authorize: (e: React.MouseEvent<HTMLButtonElement>, credentials: { login: string; password: string }) => void;
    authFail: boolean;
}
