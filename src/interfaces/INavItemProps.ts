import {ReactElement} from "react";

export interface INavItemProps{
    title: string;
    endpoint: string;
    icon: ReactElement;
    isSelected: boolean;
    onClick: () => void;
}