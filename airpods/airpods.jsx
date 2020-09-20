import { css } from "uebersicht";
import { run } from "uebersicht";

export const command = "python3 airpods/bt.py";
export const refreshFrequency = 2000;
export const IMAGE_ROOT = `airpods/img`;
export const BLU_UTIL = "/usr/local/bin/blueutil";

export const className = `
    margin: 0px;
    right: 20px;
    bottom: 10px;
    background: rgba(#000, .2);    
    color: white;
    padding: 10px;
    text-align: center;
    font-size: 20pt;
    font-family: Helvetica Neue;
    width: 250px;
    lineheight: 1.6;
    white-space: nowrap;
    font-weight: 200;
`;

export const dText = css`
    margin-left: 10px;
    font-size: 18px;
    opacity: .8
    font-weight: 200
`;

export const dName = css`
    opacity: 0.8;
`;

export const dContainer = css`
    width: 70%;
`;

export const dButton = css`
    background: none;
    border: 0.25px solid;
    width: 45%;
    border-radius: 7px;
    color: white;
    margin-top: 5px;
    font-weight: 400;
    margin-left: 8px;
    padding: 5px;
    text-align: center;
    &:active {
        border-color: #a9a9a9;
        color: #a9a9a9;
    }
`;

export const dImage = css`
    height: 48px;
    width: 48px;
    margin-top: 8px;
    filter: grayscale(100%) invert(100%) contrast(500%);
    opacity: 0.7;
    float: left;
`;

export const render = ({ output, error }) => {
    try {
        if (!output || error) {
            throw "hello world";
        }
        let airpod_data = JSON.parse(output);
        if (airpod_data.length) {
            return airpod_data.map((ap, index) => {
                let { name, product, address, is_connected, left, right } = ap;
                return (
                    <div key={index} style={!is_connected ? { opacity: "60%" } : {}}>
                        <img className={dImage} src={`${IMAGE_ROOT}/${product}.png`} />
                        <div className={dName} value={address}>
                            {name}
                        </div>
                        {is_connected && (
                            <div>
                                <span className={dText}>{left}</span>
                                <span className={dText}>{right}</span>
                                <span className={dText}>{ap.case}</span>
                            </div>
                        )}
                        <div className={dContainer} style={is_connected ? { marginLeft: "20%" } : {}}>
                            <button
                                className={dButton}
                                style={is_connected ? {} : { marginLeft: "10%" }}
                                onClick={() => {
                                    run(`${BLU_UTIL} ${is_connected ? "--disconnect" : "--connect"} ${address}`);
                                }}>
                                {is_connected ? "Disconnect" : "Connect"}
                            </button>
                            <button
                                className={dButton}
                                onClick={() => {
                                    run(`${BLU_UTIL} -p 0 && sleep 1 && ${BLU_UTIL} -p 1`);
                                }}>
                                {"Reset"}
                            </button>
                        </div>
                    </div>
                );
            });
        } else {
            return <div>Error: no airpods paired with</div>;
        }
    } catch (err) {
        return <div>Error: erorr with code: {JSON.stringify(output)}</div>;
    }
};
