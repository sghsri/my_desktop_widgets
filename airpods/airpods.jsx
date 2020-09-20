import { css } from "uebersicht";

export const command = "python3 airpods/bt.py";
export const refreshFrequency = 2000;
export const IMAGE_ROOT = `airpods/img`;

export const className = `
    margin: 0px;
    right: 10px;
    bottom: 10px;
    background: rgba(#000, .2);    
    color: white;
    padding: 10px;
    text-align: center;
    font-size: 18pt;
    font-family: Helvetica Neue;
    width: 250px;
    lineheight: 1.6;
    white-space: nowrap;
    font-weight: 200;
`;

export const dContainer = css`
    display: flex;
    align-items: center;
`;

export const dText = css`
    margin-left: 10px;
    font-size: 15px;
    opacity: .8
    font-weight: 200
`;

export const dName = css`
    opacity: 0.8;
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
    let airpod_data = JSON.parse(output);
    if (airpod_data.length) {
        return airpod_data.map(ap => {
            let { name, product, address, is_connected, left, right } = ap;
            return (
                is_connected && (
                    <div>
                        <br></br>
                        <img className={dImage} src={`${IMAGE_ROOT}/${product}.png`} />
                        <div className={dName} value={address}>
                            {name}
                        </div>
                        <span className={dText}>{left}</span>
                        <span className={dText}>{right}</span>
                        <span className={dText}>{ap.case}</span>
                    </div>
                )
            );
        });
    } else {
        return <div>Error: no airpods paired with</div>;
    }
};
