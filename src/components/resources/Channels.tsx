import channels from "../../data/channels";

export default function ChannelsList() {
    return (
        <>
            {channels.map(c => (
                <div style={{margin:"25px"}}>
                    
                <div className="card">
                    <a target="_blank" href={`https://t.me/` + c.tag}>
                        <h3>{c.title}</h3>
                    </a>
                    <h4>{c.description}</h4>
                </div>
                </div>
            ))}
        </>
    );
};