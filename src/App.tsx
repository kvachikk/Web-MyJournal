import { Route, Routes } from "react-router-dom";
import Layout from "./components/default/Layout.tsx";
import Login from "./components/Login.tsx";
import Account from "./components/Account.tsx";
import Schedule from "./components/Schedule.tsx";
import Session from "./components/Session.tsx";
import Messages from "./components/Messages.tsx";
import Resources from "./components/resources/ResourcesList.tsx";
import Settings from "./components/Settings.tsx";
import Attestations from "./components/Attestations.tsx";
import DisciplinesList from "./components/DisciplinesList.tsx";
import DisciplineScores from "./components/DisciplineScores.tsx";
import ContactsByFaculties from "./components/resources/ContactsByFaculties.tsx";
import ChannelsList from "./components/resources/Channels.tsx";

export default function App() {
    return (
        <>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/" element={<Layout />}>
                    <Route index element={<Account />} />
                    <Route path="/schedule" element={<Schedule />} />
                    <Route path="/scores" element={<DisciplinesList />} />
                    <Route path='/scores/:disciplineId' element={<DisciplineScores />} />
                    <Route path="/attestations" element={<Attestations />} />
                    <Route path="/violence" element={<Session />} />
                    <Route path="/messages" element={<Messages />} />
                    <Route path="/settings" element={<Settings />} />

                    <Route path="/resources" element={<Resources />} />
                    <Route path="/contacts" element={<ContactsByFaculties />} />
                    <Route path="/channels" element={<ChannelsList />} />
                </Route>
            </Routes>
        </>
    );
};