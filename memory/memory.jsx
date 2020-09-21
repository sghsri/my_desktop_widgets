import { css } from "uebersicht";
import { run } from "uebersicht";

export const command = 'ps axo "rss,pid,ucomm" | sort -nr';
export const refreshFrequency = 5000;

export const className = `
    top: 40px;
    right: 10px;
    color: #fff;
    font-family: Helvetica Neue;
`;

export const table = css`
    border-collapse: collapse;
    table-layout: fixed;

    &:before {
        content: "memory";
        position: absolute;
        right: 0;
        top: -17px;
        font-size: 12px;
    }
`;

export const tableElement = css`
    border: 1px solid #fff;
    font-size: 24px;
    font-weight: 100;
    width: 120px;
    padding: 5px;
    text-align: center;
    max-width: 120px;
    overflow: hidden;
    text-shadow: 0 0 1px rgba(#000, 0.5);
`;

export const wrapper = css`
    padding: 4px 6px 4px 6px;
    position: relative;
`;

export const colOne = css`
    background: rgba(#000, 0.2);
`;

export const colTwo = css`
    background: rgba(#000, 0.1);
`;

export const info = css`
    padding: 0;
    margin: 0;
    font-size: 11px;
    font-weight: normal;
    max-width: 100%;
    color: #ddd;
    text-overflow: ellipsis;
`;

const cleanMemoryData = output => {
    let data_list = output
        .split("\n")
        .filter(data => data)
        .map(data => data.trim());
    let data_objects = [];
    for (let data of data_list) {
        let found = data.split(/[ ,]+/);
        let memory = parseInt(found[0] / 1024);
        let pid = parseInt(found[1]);
        let name = found.length > 3 ? `${found[2]} ${found[3]}` : found[2];

        let process = data_objects.find(process => process.name.split === name);
        if (process) {
            process.memory += memory;
        } else {
            data_objects.push({
                name,
                memory,
                pid,
            });
        }
    }
    return data_objects;
};

export const render = ({ output, error }) => {
    let processes = cleanMemoryData(output);
    processes = processes.slice(0, 3);
    return (
        <table className={table}>
            <tr>
                {processes.map((proc, index) => {
                    return (
                        <td className={tableElement}>
                            <div className={wrapper}>{proc.memory} MB</div>
                            <div className={info}>{proc.name}</div>
                        </td>
                    );
                })}
            </tr>
        </table>
    );
};
